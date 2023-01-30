import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";

import { MdPlaylistAdd } from "react-icons/md";

import { PlaylistModal } from "../../features/tracks/components/PlaylistModal";
import { destroyTrackAsync } from "../../features/tracks/store";
import { ItemActionButton } from "./ItemActionButton";
import { destroyPlaylistAsync } from "../../features/playlists/store";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/store";
import { EditPlaylist } from "../../features/profiles/components/EditPlaylist";
import "./ItemActionGroup.css";
import { EditTrack } from "../../features/profiles/components/EditTrack";

// TODO: need to complete
export function ItemActionGroup({ item, type, size = "lg" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isCurrentUserUploader = currentUser?.id === item.uploader.id;

  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  const handleTogglePlaylistModal = useCallback(
    () => setPlaylistModalOpen((prev) => !prev),
    []
  );

  const handleRemoveItem = useCallback(
    (itemId) => {
      if (type === "track") {
        dispatch(destroyTrackAsync(itemId));
      } else {
        dispatch(destroyPlaylistAsync(itemId));
      }
      navigate(`/${currentUser.slug}`);
    },
    [dispatch, type, navigate, currentUser.slug]
  );

  return (
    <>
      <div className="item-actions">
        <ItemActionButton
          icon={<AiOutlineHeart />}
          label="Like"
          onClick={() => console.log("LIKE: TODO MUST IMPLEMENT")}
          size={size}
        />
        {type === "track" && (
          <ItemActionButton
            icon={<MdPlaylistAdd />}
            label="Add to playlist"
            onClick={handleTogglePlaylistModal}
            size={size}
          />
        )}
        {isCurrentUserUploader ? (
          <>
            {type === "playlist" && (
              <EditPlaylist triggerSize={size} playlist={item} />
            )}

            {type === "track" && <EditTrack triggerSize={size} track={item} />}

            <ItemActionButton
              icon={<IoTrashBinOutline />}
              label={`Delete ${type}`}
              onClick={() => handleRemoveItem(item.id)}
              size={size}
            />
          </>
        ) : null}
      </div>
      {/* TODO: make track modal generic -- edit both tracks and playlists */}
      {/* Create new playlist...add to playlist */}
      {playlistModalOpen ? (
        <PlaylistModal track={item} onClose={handleTogglePlaylistModal} />
      ) : null}
    </>
  );
}
