import { IoMdPause, IoMdPlay } from "react-icons/io";
import { PLAYER_STATUS } from "../features/player/store";
import { ButtonSpinner } from "./ButtonSpinner";

export function ControlButton({ loaded, status, onPlay, onPause }) {
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
