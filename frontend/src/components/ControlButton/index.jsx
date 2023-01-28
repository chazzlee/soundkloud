import { IoMdPause, IoMdPlay } from "react-icons/io";
import { PLAYER_STATUS } from "../../features/player/store";
import { ButtonSpinner } from "../ButtonSpinner";
import "./ControlButton.css";

export function ControlButton({
  loaded,
  status,
  onPlay,
  onPause,
  size = "lg",
}) {
  if (!loaded || status === PLAYER_STATUS.IDLE) {
    return (
      <div style={{ paddingRight: size === "lg" ? 18 : 10 }}>
        <ButtonSpinner />
      </div>
    );
  }

  return (
    <div className="control-button">
      {(status === PLAYER_STATUS.PAUSED || status === PLAYER_STATUS.LOADED) && (
        <PlayButton onPlay={onPlay} size={size} />
      )}
      {status === PLAYER_STATUS.PLAYING && (
        <PauseButton onPause={onPause} size={size} />
      )}
    </div>
  );
}

function PauseButton({ onPause, size }) {
  return (
    <button
      title="Pause"
      aria-label="Pause"
      className={`control-btn-${size} pause`}
      onClick={onPause}
    >
      <IoMdPause />
    </button>
  );
}
function PlayButton({ onPlay, size }) {
  return (
    <button
      title="Play"
      aria-label="Play"
      className={`control-btn-${size} play`}
      onClick={onPlay}
    >
      <IoMdPlay />
    </button>
  );
}
