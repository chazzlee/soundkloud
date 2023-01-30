import { IoCloseOutline } from "react-icons/io5";
import { DefaultCover } from "../../../../../components/DefaultCover";

const COVER_SIZE = 20;
export function Track({ track = null, onRemove }) {
  return (
    <div className="create-playlist-track-row">
      {track && (
        <>
          {track.cover ? (
            <img
              src={track.cover}
              alt={track.title}
              height={COVER_SIZE}
              width={COVER_SIZE}
            />
          ) : (
            <DefaultCover size={COVER_SIZE} />
          )}
          <div className="playlist-track-row-inner">
            <p className="playlist-track-row-details">
              {track.artist} - {track.title}
            </p>

            <button className="remove-track-btn" onClick={onRemove}>
              <IoCloseOutline />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
