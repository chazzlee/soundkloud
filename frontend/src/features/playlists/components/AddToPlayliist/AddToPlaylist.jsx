import { useCallback, useState } from "react";
import { AddToPlaylistModal } from "./AddToPlaylistModal";
import { AddToPlaylistTrigger } from "./AddToPlaylistTrigger";

export function AddToPlaylist({ triggerSize, track }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <AddToPlaylistTrigger onToggle={handleToggle} size={triggerSize} />
      {isOpen ? (
        <AddToPlaylistModal track={track} onClose={handleToggle} />
      ) : null}
    </>
  );
}
