import "./PlaylistShowPage.css";
import { useEffect, useCallback, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylistsAsync,
  playlistStarted,
  selectActivePlaylist,
  selectCurrentPlaylistTrack,
  selectPlaylistBySlug,
  selectPlaylistsLoaded,
} from "../store";
import { FullSpinner } from "../../../components/FullSpinner";
import { Wavesurfer } from "../../tracks/components/Wavesurfer";
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
import { ControlButton } from "../../../components/ControlButton";
import { PrivateBadge } from "../../../components/PrivateBadge";
import {
  ShowLayout,
  ShowAside,
  ShowMain,
  Banner,
  BannerImage,
  GridContainer,
} from "../../../components/Layouts/ShowLayout";
import { UploaderAvatar } from "../../../components/UploaderAvatar";
import { TimeAgo } from "../../../components/TimeAgo";
import { ShowActions } from "../../../components/Layouts/ShowLayout/ShowActions";
import { PlaylistTracksList } from "../components/PlaylistTracksList";

// TODO: continue playlist after play playlist from profile page instead of reloading
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
      <Banner
        header={
          <>
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
                <TimeAgo date={playlist.updatedAt} />
                <PrivateBadge privacy={playlist.privacy} />
              </div>
            </div>
            <BannerImage
              imageUrl={playlist.tracks[activePlaylist.current ?? 0].cover}
            />
          </>
        }
      >
        <Wavesurfer
          ref={wavesurfer}
          onLoaded={handleLoaded}
          track={playlist.tracks[activePlaylist.current ?? 0]}
        />
      </Banner>

      <ShowMain aside={<ShowAside />}>
        <ShowActions />

        <GridContainer>
          <UploaderAvatar
            photo={playlist.uploader.photo}
            slug={playlist.uploader.slug}
            displayName={playlist.uploader.displayName}
          />
          <PlaylistTracksList
            playlistId={playlist.id}
            playlistTracks={playlist.tracks}
          />
        </GridContainer>
      </ShowMain>
    </ShowLayout>
  );
}
