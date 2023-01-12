import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { updateTotalDuration } from "../../player/store";

export function Wavesurfer({ status, track }) {
  // console.log("wave", track);

  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const currentTotalDuration = useSelector(
    (state) => state.player.current.totalDuration
  );

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#eee",
        progressColor: "#f50",
        cursorColor: "transparent",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 100,
        interact: false,
      });
    }
  }, [track?.url]);

  // TODO: amzn s3 dev bucket urls not working
  useEffect(() => {
    if (track?.url && wavesurfer.current) {
      wavesurfer.current.setMute(true);
      wavesurfer.current.load(
        "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Rise+Of+The+Predator.mp3"
      );

      wavesurfer.current.on("ready", () => {
        dispatch(updateTotalDuration(wavesurfer.current.getDuration()));
      });
    }
  }, [dispatch, track?.url]);

  return (
    <div
      style={{
        color: "white",
        position: "absolute",
        bottom: 24,
        maxWidth: "813px",
        width: "100%",
        height: "100px",
        backgroundColor: "transparent",
        zIndex: 1,
      }}
    >
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}
