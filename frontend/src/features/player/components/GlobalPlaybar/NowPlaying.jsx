import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectCurrentlyPlaying } from "../../store";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdHeart } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { playlistCleared, selectPlaylistById } from "../../../playlists/store";
import { MdOutlinePlaylistPlay } from "react-icons/md";

export function NowPlaying({ playlistId }) {
  const activePlaylist = useSelector(
    (state) => selectPlaylistById(state, playlistId),
    shallowEqual
  );

  const currentTrack = useSelector(selectCurrentlyPlaying);
  const [nextUpOpen, setNextUpOpen] = useState(false);

  const handleToggle = useCallback(() => setNextUpOpen((prev) => !prev), []);

  return (
    <div className="currently-playing-container">
      <div className="currently-playing">
        <Link className="currently-playing-link" to={currentTrack?.permalink}>
          <div className="cover-image">
            <img
              src={currentTrack?.cover}
              alt={currentTrack?.title}
              height={30}
              width={30}
            />
          </div>
          <div className="track-details">
            <p className="artist">{currentTrack?.artist}</p>
            <p className="title">{currentTrack?.title}</p>
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

  return (
    <div className="next-up-container">
      <header className="next-up-header">
        <h3 className="next-up-heading">Next up</h3>
        <div className="next-up-modal-actions">
          <button className="clear-btn" onClick={handleClearPlaylist}>
            Clear
          </button>
          <button className="close-btn" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
      </header>
      <div className="next-up-tracks-list">
        {activePlaylist?.tracks.map((track) => (
          <div
            key={track.id}
            className={`next-up-track-row ${
              currentTrack.id === track.id ? "selected" : ""
            }`}
          >
            {/* TODO: LINK */}
            <Link className="next-up-track-link" to={`/`}>
              <img
                src={track.cover}
                alt="Track Cover"
                className="next-up-row-cover"
              />
              <div>
                <p className="uploader-name">{track.uploader.displayName}</p>
                <p className="track-title">
                  <span>{track.artist}</span> - <span>{track.title}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
