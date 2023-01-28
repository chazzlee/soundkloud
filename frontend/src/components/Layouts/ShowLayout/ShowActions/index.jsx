import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";
import { MdPlaylistAdd } from "react-icons/md";
import { EditTrackModal } from "../../../../features/profiles/components/EditTrackModal";
import { PlaylistModal } from "../../../../features/tracks/components/PlaylistModal";
import { destroyTrackAsync } from "../../../../features/tracks/store";
import "./ShowActions.css";

// TODO: need to complete
export function ShowActions({ item, type, isCurrentUserUploader = false }) {
  console.log(item);
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  const handleToggleEditModal = useCallback(
    () => setEditModalOpen((prev) => !prev),
    []
  );
  const handleTogglePlaylistModal = useCallback(
    () => setPlaylistModalOpen((prev) => !prev),
    []
  );

  // TODO: only for track...need to delete from playlist
  const handleRemoveItem = useCallback(
    (itemId) => {
      if (type === "track") {
        dispatch(destroyTrackAsync(itemId));
      }
    },
    [dispatch, type]
  );

  return (
    <>
      <div className="show-actions">
        <ActionButton
          icon={<AiOutlineHeart />}
          label="Like"
          onClick={() => console.log("LIKE: TODO MUST IMPLEMENT")}
        />
        {type === "track" && (
          <ActionButton
            icon={<MdPlaylistAdd />}
            label="Add to playlist"
            onClick={handleTogglePlaylistModal}
          />
        )}
        {isCurrentUserUploader ? (
          <>
            <ActionButton
              icon={<SlPencil />}
              label="Edit"
              onClick={handleToggleEditModal}
            />
            <ActionButton
              icon={<IoTrashBinOutline />}
              label="Remove"
              onClick={() => handleRemoveItem(item.id)}
            />
          </>
        ) : null}
      </div>
      {/* TODO: redesign/onSuccess -- fixFIXME: */}
      {/* TODO: need to make modal for updating playlist */}
      {editModalOpen && type === "track" ? (
        <EditTrackModal
          track={item}
          onClose={handleToggleEditModal}
          onSuccess={handleToggleEditModal}
        />
      ) : null}
      {playlistModalOpen ? (
        <PlaylistModal track={item} onClose={handleTogglePlaylistModal} />
      ) : null}
    </>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="show-action-btn"
      onClick={onClick}
    >
      {icon} <span>{label}</span>
    </button>
  );
}
