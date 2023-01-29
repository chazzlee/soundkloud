import { useCallback, useState } from "react";
import { EditTrigger } from "../EditTrigger";
import { EditTrackModal } from "./EditTrackModal";

export function EditTrack({ triggerSize, track }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <EditTrigger onToggle={handleToggle} size={triggerSize} />
      {isOpen ? <EditTrackModal track={track} onClose={handleToggle} /> : null}
    </>
  );
}
