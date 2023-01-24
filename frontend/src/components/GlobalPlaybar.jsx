import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  GLOBAL_PLAYER,
  WAVE_PLAYER,
  PLAYER_STATUS,
  selectCurrentlyPlaying,
  selectPlayerStatus,
  trackPaused,
  trackPlaying,
  trackSeeked,
  progressUpdating,
  selectPlayerSource,
  updateDuration,
  selectPlayerSourceId,
} from "../features/player/store";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import {
  playlistFinished,
  playPreviousTrack,
  playNextTrack,
  selectActivePlaylist,
  selectActivePlaylistTracks,
  selectCurrentPlaylistTrackUrl,
  selectPlaylistById,
} from "../features/playlists/store";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import useOnClickOutside from "use-onclickoutside";

function calculateProgress(current, total) {
  return current / total ?? 0;
}

export function GlobalPlaybar() {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const activePlaylist = useSelector(selectActivePlaylist, shallowEqual);
  const currentPlaylistTrackUrl = useSelector(selectCurrentPlaylistTrackUrl);

  const handlePlayNext = useCallback(() => {
    if (activePlaylist.next !== null) {
      dispatch(playNextTrack());
    }
  }, [dispatch, activePlaylist.next]);

  const handlePlayPrevious = useCallback(() => {
    if (activePlaylist.prev !== null) {
      dispatch(playPreviousTrack());
    }
  }, [dispatch, activePlaylist.prev]);

  const handlePlaylistFinished = useCallback(() => {
    dispatch(playlistFinished());
  }, [dispatch]);

  const waveStatus = useSelector((state) =>
    selectPlayerStatus(state, WAVE_PLAYER)
  );

  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );

  const globalSourceUrl = useSelector((state) =>
    selectPlayerSource(state, GLOBAL_PLAYER)
  );

  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  const waveSourceId = useSelector((state) =>
    selectPlayerSourceId(state, WAVE_PLAYER)
  );

  const handlePlay = useCallback(() => {
    dispatch(trackPlaying());
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch(trackPaused());
  }, [dispatch]);

  const handleSeek = useCallback(
    (currentTime) => {
      dispatch(trackSeeked(currentTime));
    },
    [dispatch]
  );

  const handleUpdateDurationOnLoad = useCallback(
    (duration) => {
      if (Number.isNaN(duration)) return;

      dispatch(updateDuration(duration));
    },
    [dispatch]
  );

  const handleUpdateProgress = useCallback(
    (currentTime, duration) => {
      if (Number.isNaN(currentTime) || Number.isNaN(duration)) return;

      dispatch(progressUpdating(calculateProgress(currentTime, duration)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      waveStatus === PLAYER_STATUS.PLAYING ||
      (globalStatus === PLAYER_STATUS.PLAYING &&
        (globalSourceUrl || currentPlaylistTrackUrl))
    ) {
      playerRef.current?.audio.current.play();
    } else if (waveStatus === PLAYER_STATUS.PAUSED) {
      playerRef.current?.audio.current.pause();
    }
  }, [
    dispatch,
    waveStatus,
    globalStatus,
    globalSourceUrl,
    currentPlaylistTrackUrl,
  ]);

  //FIXME:
  // if (!globalSourceId || globalStatus === PLAYER_STATUS.IDLE) {
  //   return null;
  // }

  return (
    <H5AudioPlayer
      className="global-playbar"
      ref={playerRef}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
      showDownloadProgress={false}
      customProgressBarSection={[
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.DURATION,
        RHAP_UI.VOLUME,
        <CurrentlyPlaying playlistId={activePlaylist.id} />,
      ]}
      customAdditionalControls={[]}
      customIcons={{
        play: (
          <IoMdPlay
            size={"50%"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ),
        pause: (
          <IoMdPause
            size={"50%"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ),
      }}
      layout="horizontal-reverse"
      showSkipControls={true}
      // showSkipControls={!!activePlaylist.id}
      showJumpControls={false}
      src={currentPlaylistTrackUrl ? currentPlaylistTrackUrl : globalSourceUrl}
      autoPlay={false}
      autoPlayAfterSrcChange={
        globalStatus === PLAYER_STATUS.PLAYING &&
        (currentPlaylistTrackUrl || globalSourceUrl)
      }
      onPlay={handlePlay}
      onPause={handlePause}
      onClickNext={handlePlayNext}
      onClickPrevious={handlePlayPrevious}
      onLoadedMetaData={(e) => handleUpdateDurationOnLoad(e.target.duration)}
      onSeeked={(e) => handleSeek(e.target.currentTime)}
      onListen={(e) => {
        if (!activePlaylist.id) {
          handleUpdateProgress(e.target.currentTime, e.target.duration);
        }
      }}
      onEnded={() => {
        if (activePlaylist.id) {
          if (activePlaylist.next !== null) {
            handlePlayNext();
          } else {
            handlePlaylistFinished();
          }
        }
      }}
    />
  );
}

// TODO:
function CurrentlyPlaying({ playlistId }) {
  const activePlaylist = useSelector(
    (state) => selectPlaylistById(state, playlistId),
    shallowEqual
  );

  const currentTrack = useSelector(selectCurrentlyPlaying);
  const [nextUpOpen, setNextUpOpen] = useState(false);

  const handleToggle = useCallback(() => setNextUpOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setNextUpOpen(false), []);

  const nextUpRef = useRef(null);

  //FIXME:
  // useOnClickOutside(nextUpRef, handleClose);

  return (
    <div style={{ position: "relative" }}>
      <div className="currently-playing">
        <div className="cover-image">
          <img src={currentTrack?.cover} alt={currentTrack?.title} />
        </div>
        <Link className="track-details" to={currentTrack?.permalink}>
          <p className="artist">{currentTrack?.artist}</p>
          <p className="title">{currentTrack?.title}</p>
        </Link>
        <div>
          <button type="button" onClick={handleToggle}>
            <MdOutlinePlaylistPlay />
          </button>
        </div>
      </div>
      {/* <Link to={currentTrack?.permalink}>
      </Link> */}
      {nextUpOpen ? (
        <div
          style={{
            position: "absolute",
            zIndex: 12,
            background: "white",
            bottom: "40px",
            left: 0,
            border: "1px solid black",
            height: 600,
            width: 400,
          }}
          ref={nextUpRef}
        >
          <h3>Next up</h3>
          <ul>
            {activePlaylist?.tracks.map((track) => (
              <li
                key={track.id}
                style={{
                  fontWeight: currentTrack.id === track.id ? "bold" : "normal",
                }}
              >
                {track.artist} - {track.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
