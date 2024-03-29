import { useCallback, useState } from "react";
import { EditTrigger } from "../EditTrigger";
import { EditPlaylistModal } from "./EditPlaylistModal";

export function EditPlaylist({ triggerSize, playlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <EditTrigger onToggle={handleToggle} size={triggerSize} />
      {isOpen ? (
        <EditPlaylistModal playlist={playlist} onClose={handleToggle} />
      ) : null}
    </>
  );
}
