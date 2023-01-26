import "./PlaylistShowPage.css";
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import {
  fetchPlaylistsAsync,
  playlistStarted,
  playSelected,
  selectActivePlaylist,
  selectCurrentPlaylistTrack,
  selectPlaylistBySlug,
  selectPlaylistsLoaded,
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
import {
  fetchAllTracksByUserAsync,
  selectHasTracksLoaded,
} from "../../tracks/store";
import { selectCurrentUser } from "../../auth/store";
import { DefaultCover } from "../../../components/DefaultCover";
import { MdPlaylistPlay } from "react-icons/md";
import { SocialLinks } from "../../../components/SocialLinks";

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

// TODO: continue playlist after play playlist from profile page instead of reloading
export function PlaylistShowPage() {
  const currentUser = useSelector(selectCurrentUser);
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

  const handlePlaySelected = useCallback(
    ({ index, selectedTrack, playlistId }) => {
      dispatch(playSelected({ index, selectedTrack, playlistId }));
    },
    [dispatch]
  );

  const handleOpenEditPlaylistModal = () => {};
  const handleToggleLikePlaylist = () => {};
  const wavesurfer = useRef(null);

  const tracksLoaded = useSelector(selectHasTracksLoaded);
  const playlistsLoaded = useSelector(selectPlaylistsLoaded);

  useEffect(() => {
    // TODO: only dispatch if playlists/tracks not loaded
    if (!tracksLoaded) {
      dispatch(fetchAllTracksByUserAsync());
    }
    if (!playlistsLoaded) {
      dispatch(fetchPlaylistsAsync());
    }
  }, [dispatch, tracksLoaded, playlistsLoaded]);

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

          <div className="playlist-cover-background">
            {playlist.tracks[activePlaylist.current ?? 0].cover ? (
              <img
                src={playlist.tracks[activePlaylist.current ?? 0].cover}
                alt={playlist.title}
                width={325}
                height={325}
              />
            ) : (
              <DefaultCover size={325} />
            )}
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
            {playlist.uploader.id === currentUser.id && (
              <button
                className="playlist-action-btn"
                aria-label="Edit playlist"
                onClick={handleOpenEditPlaylistModal}
              >
                <SlPencil />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="playlist-container">
            <div className="uploader-details">
              <Link to={`/${playlist.uploader.slug}`}>
                <img
                  className="uploader-photo"
                  src={playlist.uploader.photo}
                  alt={playlist.uploader.displayName}
                />
                <p className="uploader-name">{playlist.uploader.displayName}</p>
              </Link>
            </div>
            <div className="playlist-tracks-list">
              {playlist.tracks.map((track, index) => (
                <div
                  className={`playlist-track-row ${
                    isCurrentlyPlaying(track.id) ? "selected" : ""
                  }`}
                  key={track.id}
                  onClick={() => {
                    if (index === 0) {
                      handleStartPlaylist(playlist);
                    } else {
                      handlePlaySelected({
                        index,
                        selectedTrack: track,
                        playlistId: playlist.id,
                      });
                    }
                  }}
                >
                  {track.cover ? (
                    <img
                      className="track-image"
                      src={track.cover}
                      alt={track.title}
                    />
                  ) : (
                    <DefaultCover size={30} />
                  )}
                  <p className="track-order">{index + 1}</p>
                  <Link
                    className="track-uploader"
                    to={`/${track.uploader.slug}`}
                    aria-label="View uploader"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {track.uploader.displayName}
                  </Link>
                  <span style={{ marginRight: 4, marginLeft: 4 }}>-</span>
                  <Link
                    className="track-title"
                    to={track.permalink}
                    aria-label="View track"
                    onClick={(e) => e.stopPropagation()}
                  >
                    [{track.artist}] {track.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ASIDE */}
        <aside>
          <header className="aside-header">
            <h2 className="aside-heading">
              <MdPlaylistPlay /> Playlists from this user
            </h2>
            {/* TODO: LINK to user playlists show page! */}
            <Link to={"/"}>View all</Link>
          </header>
          <article className="aside-playlist-container">
            <div className="aside-playlist-item">
              <img
                src="https://soundkloud-dev.s3.amazonaws.com/4g9fu9lhd52zyb1ok21lu98jo656?response-content-disposition=inline%3B%20filename%3D%22Adramelch%20-%20Irae%20Melanox%20%25281988%2529%20RM%20Front.jpg%22%3B%20filename%2A%3DUTF-8%27%27Adramelch%2520-%2520Irae%2520Melanox%2520%25281988%2529%2520RM%2520Front.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATE7BVEO4SERJEV4V%2F20230126%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230126T161554Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=dc6f7e970732d68bbfa912245b9438a53b01e454bcb98be7900944cb420e923a"
                alt=""
                className="aside-playlist-item-cover"
              />
              <div className="aside-playlist-item-details">
                <p className="item-details-user">APEX1</p>
                <p className="item-details-title">playlist title</p>
              </div>
            </div>
            <div className="aside-playlist-item">
              <img
                src="https://soundkloud-dev.s3.amazonaws.com/4g9fu9lhd52zyb1ok21lu98jo656?response-content-disposition=inline%3B%20filename%3D%22Adramelch%20-%20Irae%20Melanox%20%25281988%2529%20RM%20Front.jpg%22%3B%20filename%2A%3DUTF-8%27%27Adramelch%2520-%2520Irae%2520Melanox%2520%25281988%2529%2520RM%2520Front.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATE7BVEO4SERJEV4V%2F20230126%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230126T161554Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=dc6f7e970732d68bbfa912245b9438a53b01e454bcb98be7900944cb420e923a"
                alt=""
                className="aside-playlist-item-cover"
              />
              <div className="aside-playlist-item-details">
                <Link className="item-details-user" to={"/"}>
                  APEX1
                </Link>
                <Link className="item-details-title" to={"/"}>
                  playlist title
                </Link>
              </div>
            </div>
          </article>
          <article className="social-links">
            <SocialLinks />
          </article>
        </aside>
      </section>
    </div>
  );
}
