import "./PlaylistShowPage.css";
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { SlPencil } from "react-icons/sl";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { useCallback } from "react";
import {
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
import { ControlButton } from "../../../components/ControlButton";
import { PrivateBadge } from "../../../components/PrivateBadge";
import {
  ShowLayout,
  ShowAside,
  Main,
  Banner,
  BannerImage,
} from "../../../components/Layouts/ShowLayout";
import { UploaderAvatar } from "../../../components/UploaderAvatar";

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
        dispatch(trackPlaying(currentPlaylistTrack.id));
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
    <ShowLayout>
      <Banner>
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
              <PrivateBadge privacy={playlist.privacy} />
            </div>
          </div>
          <BannerImage
            imageUrl={playlist.tracks[activePlaylist.current ?? 0].cover}
          />
        </header>
        <div className="waveform-container">
          <Wavesurfer
            ref={wavesurfer}
            onLoaded={handleLoaded}
            track={playlist.tracks[activePlaylist.current ?? 0]}
          />
        </div>
      </Banner>

      <Main>
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
            <UploaderAvatar
              uploader={{
                photo: playlist.uploader.photo,
                slug: playlist.uploader.slug,
                displayName: playlist.uploader.displayName,
              }}
            />
            <div className="playlist-tracks-list">
              {playlist.tracks.map((track, index) => (
                <div
                  className={`playlist-track-row ${
                    isCurrentlyPlaying(track.id) ? "selected" : ""
                  }`}
                  key={track.id}
                  onClick={() => {
                    // TODO: FIXME:!!!!
                    handlePlaySelected({
                      index,
                      selectedTrack: track,
                      playlistId: playlist.id,
                    });
                    // if (index === 0) {
                    //   handleStartPlaylist(playlist);
                    // } else {
                    //   handlePlaySelected({
                    //     index,
                    //     selectedTrack: track,
                    //     playlistId: playlist.id,
                    //   });
                    // }
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
        <ShowAside />
      </Main>
    </ShowLayout>
  );
}
