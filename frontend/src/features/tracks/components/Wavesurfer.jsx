import { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  PLAYER_STATUS,
  WAVE_PLAYER,
  GLOBAL_PLAYER,
  selectPlayerProgress,
  selectPlayerSourceId,
  selectPlayerStatus,
  trackLoaded,
  trackCleared,
} from "../../player/store";

export const Wavesurfer = forwardRef(({ track, onLoaded }, ref) => {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);

  const globalProgress = useSelector((state) =>
    selectPlayerProgress(state, GLOBAL_PLAYER)
  );

  const waveStatus = useSelector((state) =>
    selectPlayerStatus(state, WAVE_PLAYER)
  );

  const waveSourceId = useSelector((state) =>
    selectPlayerSourceId(state, WAVE_PLAYER)
  );
  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  const isSameAsGlobalTrack = waveSourceId === globalSourceId;

  useEffect(() => {
    // console.clear();
    const waveOptions = {
      waveColor: "#eee",
      progressColor: "#f50",
      cursorColor: "transparent",
      barWidth: 1,
      barRadius: 2,
      responsive: true,
      normalize: true,
      height: 100,
      interact: false,
      container: waveformRef.current,
    };
    ref.current = WaveSurfer.create(waveOptions);
    ref.current.setMute(true);
    ref.current.load(track.upload);

    ref.current.on("ready", () => {
      onLoaded(true);

      dispatch(
        trackLoaded({
          id: track.id,
          url: track.upload,
          duration: ref.current.getDuration(),
        })
      );
    });

    ref.current.on("finish", () => {
      console.log("WAVE FINISHED");
      ref.current.seekTo(1);
    });

    return () => {
      console.log("destroying");
      ref.current.cancelAjax();
      ref.current.unAll();
      ref.current.destroy();
      ref.current = null;
      dispatch(trackCleared());
    };
  }, [dispatch, ref, track.id, track.upload, onLoaded]);

  useEffect(() => {
    if (isSameAsGlobalTrack) {
      ref.current.seekTo(globalProgress);
    }
  }, [isSameAsGlobalTrack, ref, globalProgress]);

  useEffect(() => {
    // Trigered from global playbar
    if (waveStatus === PLAYER_STATUS.PLAYING) {
      ref.current.play();
    } else if (waveStatus === PLAYER_STATUS.PAUSED) {
      ref.current.pause();
    }
  }, [ref, waveStatus]);

  if (!track) {
    return null;
  }
  return <div id="waveform" ref={waveformRef} />;
});
