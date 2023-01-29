import { useCallback, useState } from "react";
import { EditPlaylistTrigger } from "./EditPlaylistTrigger";
import { EditPlaylistModal } from "./EditPlaylistModal";

export function EditPlaylist({ triggerSize, playlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <EditPlaylistTrigger onToggle={handleToggle} size={triggerSize} />
      {isOpen ? (
        <EditPlaylistModal playlist={playlist} onClose={handleToggle} />
      ) : null}
    </>
  );
}
