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
} from "../../player/store";

export const Wavesurfer = forwardRef(
  ({ track, onLoaded, waveHeight = 100 }, ref) => {
    const dispatch = useDispatch();
    const waveformRef = useRef(null);

    const globalProgress = useSelector((state) =>
      selectPlayerProgress(state, GLOBAL_PLAYER)
    );

    const globalStatus = useSelector((state) =>
      selectPlayerStatus(state, GLOBAL_PLAYER)
    );

    const waveSourceId = useSelector((state) =>
      selectPlayerSourceId(state, WAVE_PLAYER)
    );
    const globalSourceId = useSelector((state) =>
      selectPlayerSourceId(state, GLOBAL_PLAYER)
    );

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
        height: waveHeight, //TODO:
        interact: false,
        container: waveformRef.current,
      };
      ref.current = WaveSurfer.create(waveOptions);
      ref.current.setMute(true);
      ref.current.load(track.upload);

      ref.current.on("ready", () => {
        dispatch(
          trackLoaded({
            id: track.id,
            url: track.upload,
            duration: ref.current.getDuration(),
          })
        );
        onLoaded(true);
      });

      ref.current.on("finish", () => {
        console.log("FINISHED");
      });

      return () => {
        console.log("destroying");
        ref.current.cancelAjax();
        ref.current.destroy();
        ref.current = null;
      };
    }, [dispatch, ref, track.id, track.upload, waveHeight, onLoaded]);

    useEffect(() => {
      switch (globalStatus) {
        case PLAYER_STATUS.PLAYING: {
          ref.current.play();
          break;
        }
        case PLAYER_STATUS.PAUSED: {
          ref.current.pause();
          break;
        }
        default:
          return;
      }
    }, [globalStatus, ref, dispatch]);

    useEffect(() => {
      if (globalSourceId === waveSourceId) {
        ref.current.seekTo(globalProgress);
        ref.current.play();
      }
    }, [globalProgress, globalSourceId, waveSourceId, ref]);

    return <div id="waveform" ref={waveformRef} />;
  }
);
