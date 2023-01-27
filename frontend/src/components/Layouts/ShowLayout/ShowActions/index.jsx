import { AiOutlineHeart } from "react-icons/ai";
import { SlPencil } from "react-icons/sl";
import "./ShowActions.css";

// TODO: need to complete
export function ShowActions() {
  return (
    <div className="show-actions">
      <button
        aria-label="Like playlist"
        className="show-action-btn"
        // onClick={handleToggleLikePlaylist}
      >
        <AiOutlineHeart />
        <span>Like</span>
      </button>
      {/* {playlist.uploader.id === currentUser.id && (
        <button
          className="playlist-action-btn"
          aria-label="Edit playlist"
          onClick={handleOpenEditPlaylistModal}
        >
          <SlPencil />
          <span>Edit</span>
        </button>
      )} */}
      <button
        className="show-action-btn"
        aria-label="Edit playlist"
        // onClick={handleOpenEditPlaylistModal}
      >
        <SlPencil />
        <span>Edit</span>
      </button>
    </div>
  );
}
