import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectCurrentlyPlaying } from "../../store";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdHeart } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import {
  playlistCleared,
  playSelected,
  selectPlaylistById,
} from "../../../playlists/store";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { DefaultCover } from "../../../../components/DefaultCover";

export function NowPlaying({ playlistId }) {
  const [nextUpOpen, setNextUpOpen] = useState(false);
  const handleToggle = useCallback(() => setNextUpOpen((prev) => !prev), []);

  const activePlaylist = useSelector(
    (state) => selectPlaylistById(state, playlistId),
    shallowEqual
  );

  const currentTrack = useSelector(selectCurrentlyPlaying);

  return (
    <div className="currently-playing-container">
      <div className="currently-playing">
        <Link className="currently-playing-link" to={currentTrack?.permalink}>
          <div className="cover-image">
            {currentTrack?.cover ? (
              <img
                src={currentTrack?.cover}
                alt={currentTrack?.title}
                height={30}
                width={30}
              />
            ) : (
              <DefaultCover size={30} />
            )}
          </div>
          <div className="track-details">
            <p className="artist truncate">{currentTrack?.artist}</p>
            <p className="title truncate">{currentTrack?.title}</p>
          </div>
        </Link>
        <div className="currently-playing-actions">
          <button type="button" onClick={() => {}}>
            <IoMdHeart />
          </button>
          <button type="button" onClick={() => {}}>
            <FaUserAlt />
          </button>
          <button type="button" onClick={handleToggle}>
            <MdOutlinePlaylistPlay
              color={nextUpOpen ? "var(--primary-orange)" : "#333"}
            />
          </button>
        </div>
      </div>
      {nextUpOpen ? (
        <NextUpModal
          currentTrack={currentTrack}
          activePlaylist={activePlaylist}
          onClose={handleToggle}
        />
      ) : null}
    </div>
  );
}

function NextUpModal({ activePlaylist, currentTrack, onClose }) {
  const dispatch = useDispatch();

  const handleClearPlaylist = useCallback(() => {
    dispatch(playlistCleared());
  }, [dispatch]);

  const isCurrentlyPlaying = (trackId) => currentTrack.id === trackId;

  const handlePlaySelected = useCallback(
    ({ index, selectedTrack, playlistId }) => {
      dispatch(playSelected({ index, selectedTrack, playlistId }));
    },
    [dispatch]
  );

  return (
    <div className="next-up-container">
      <header className="next-up-header">
        <h3 className="next-up-heading">Next up</h3>
        <div className="next-up-modal-actions">
          {activePlaylist && (
            <Link
              className="view-playlist-btn"
              to={`/${activePlaylist?.uploader?.slug}/sets/${activePlaylist?.slug}`}
              aria-label="Viwe current playlist"
            >
              View playlist
            </Link>
          )}
          <button
            className="clear-btn"
            onClick={handleClearPlaylist}
            aria-label="Clear playlist"
          >
            Clear
          </button>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close current playlist modal"
          >
            <IoMdClose />
          </button>
        </div>
      </header>
      <div className="next-up-tracks-list">
        {activePlaylist?.tracks.map((track, index) => (
          <div
            key={track.id}
            className={`next-up-track-row ${
              isCurrentlyPlaying(track.id) ? "selected" : ""
            }`}
            onClick={() =>
              handlePlaySelected({
                index,
                selectedTrack: track,
                playlistId: activePlaylist.id,
              })
            }
          >
            {/* TODO: LINK */}
            <div className="next-up-track-link">
              {track.cover ? (
                <img
                  src={track.cover}
                  alt={track.title}
                  className="next-up-row-cover"
                />
              ) : (
                <DefaultCover size={32} />
              )}
              <div className="next-up-item-details">
                <Link
                  className="uploader-name"
                  to={`/${track.uploader.slug}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {track.uploader.displayName}
                </Link>
                <Link
                  className="track-title"
                  to={track.permalink}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{track.artist}</span> - <span>{track.title}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
