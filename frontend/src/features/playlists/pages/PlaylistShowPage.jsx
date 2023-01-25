import "./PlaylistShowPage.css";
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import {
  fetchPlaylistsAsync,
  playlistStarted,
  selectActivePlaylist,
  selectCurrentPlaylistTrack,
  selectPlaylistBySlug,
} from "../store";
import { FullSpinner } from "../../../components/FullSpinner";
import { Wavesurfer } from "../../tracks/components/Wavesurfer";
import { BiLockAlt } from "react-icons/bi";
import { SlPencil } from "react-icons/sl";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { useCallback } from "react";
import { ButtonSpinner } from "../../../components/ButtonSpinner";
import {
  PLAYER_STATUS,
  selectPlayerStatus,
  trackPaused,
  trackPlaying,
  WAVE_PLAYER,
} from "../../player/store";
import { fetchAllTracksByUserAsync } from "../../tracks/store";

function ControlButton({ loaded, status, onPlay, onPause }) {
  if (!loaded || status === PLAYER_STATUS.IDLE) {
    return (
      <div style={{ paddingRight: 18 }}>
        <ButtonSpinner />
      </div>
    );
  }

  return (
    <div className="control-button">
      {(status === PLAYER_STATUS.PAUSED || status === PLAYER_STATUS.LOADED) && (
        <PlayButton onPlay={onPlay} />
      )}
      {status === PLAYER_STATUS.PLAYING && <PauseButton onPause={onPause} />}
    </div>
  );
}

function PauseButton({ onPause }) {
  return (
    <button
      title="Pause"
      aria-label="Pause"
      className="control-btn-lg pause"
      onClick={onPause}
    >
      <IoMdPause />
    </button>
  );
}
function PlayButton({ onPlay }) {
  return (
    <button
      title="Play"
      aria-label="Play"
      className="control-btn-lg play"
      onClick={onPlay}
    >
      <IoMdPlay />
    </button>
  );
}

export function PlaylistShowPage() {
  const dispatch = useDispatch();
  const { playlistSlug } = useParams();
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback((state) => setLoaded(state), []);
  const waveStatus = useSelector((state) =>
    selectPlayerStatus(state, WAVE_PLAYER)
  );
  const playlist = useSelector((state) =>
    selectPlaylistBySlug(state, playlistSlug)
  );

  const activePlaylist = useSelector(selectActivePlaylist, shallowEqual);
  const currentPlaylistTrack = useSelector(
    selectCurrentPlaylistTrack,
    shallowEqual
  );

  const isCurrentlyPlaying = (trackId) => currentPlaylistTrack?.id === trackId;

  const handleStartPlaylist = useCallback(
    (playlist) => {
      if (!activePlaylist.id) {
        dispatch(playlistStarted(playlist));
      } else {
        dispatch(trackPlaying(currentPlaylistTrack));
      }
    },
    [dispatch, activePlaylist.id, currentPlaylistTrack]
  );

  const handlePausePlaylist = useCallback(() => {
    dispatch(trackPaused());
  }, [dispatch]);

  const handleOpenEditPlaylistModal = () => {};
  const handleToggleLikePlaylist = () => {};
  const wavesurfer = useRef(null);

  useEffect(() => {
    // TODO: only dispatch if playlists/tracks not loaded
    dispatch(fetchPlaylistsAsync());
    dispatch(fetchAllTracksByUserAsync());
  }, [dispatch]);

  // TODO: -- error?
  if (!playlist) {
    return <FullSpinner />;
  }

  return (
    <div className="show-layout">
      <section className="show-banner-section">
        <header className="banner-header">
          <ControlButton
            loaded={loaded}
            status={waveStatus}
            onPlay={() => handleStartPlaylist(playlist)}
            onPause={handlePausePlaylist}
          />
          <div className="banner-heading">
            <div className="banner-title">
              <h2 className="title">{playlist?.slug}</h2>
              <h3 className="subtitle">
                <Link to={`/${playlist.uploader.slug}`}>
                  {playlist.uploader.displayName}
                </Link>
              </h3>
            </div>
            <div className="banner-details">
              <p className="created-at">
                {formatDistanceToNow(new Date(playlist.updatedAt), {
                  addSuffix: true,
                })}
              </p>
              {playlist.privacy === "private" && (
                <p className="private-badge">
                  <span className="private-icon">
                    <BiLockAlt />
                  </span>
                  <span>private</span>
                </p>
              )}
            </div>
          </div>
          {/* TODO: set default background if no image */}
          <div className="playlist-cover-background">
            <img
              src={playlist.tracks[activePlaylist.current ?? 0].cover}
              alt={playlist.title}
              width={325}
              height={325}
            />
          </div>
        </header>
        <div className="waveform-container">
          <Wavesurfer
            ref={wavesurfer}
            onLoaded={handleLoaded}
            track={playlist.tracks[activePlaylist.current ?? 0]}
          />
        </div>
      </section>

      <section className="show-playlist-section">
        <div className="show-playlist-tracks">
          <div className="show-playlist-actions">
            <button
              aria-label="Like playlist"
              className="playlist-action-btn"
              onClick={handleToggleLikePlaylist}
            >
              <AiOutlineHeart />
              <span>Like</span>
            </button>
            <button
              className="playlist-action-btn"
              aria-label="Edit playlist"
              onClick={handleOpenEditPlaylistModal}
            >
              <SlPencil />
              <span>Edit</span>
            </button>
          </div>

          <div className="playlist-container">
            <div className="uploader-details">
              <img
                className="uploader-photo"
                src={playlist.uploader.photo}
                alt={playlist.uploader.displayName}
              />
              <Link className="uploader-name" to={`/${playlist.uploader.slug}`}>
                {playlist.uploader.displayName}
              </Link>
            </div>
            <div className="playlist-tracks-list">
              {playlist.tracks.map((track, index) => (
                <div
                  className={`playlist-track-row ${
                    isCurrentlyPlaying(track.id) ? "selected" : ""
                  }`}
                  key={track.id}
                >
                  <img
                    className="track-image"
                    src={track.cover}
                    alt={track.title}
                  />
                  <p className="track-order">{index + 1}</p>
                  <Link
                    className="track-uploader"
                    to={`/${track.uploader.slug}`}
                  >
                    {track.uploader.displayName}
                  </Link>
                  <span style={{ marginRight: 4, marginLeft: 4 }}>-</span>
                  <p className="track-title">{track.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside>ASIDE</aside>
      </section>
    </div>
  );
}
