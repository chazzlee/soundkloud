import { useCallback, useState } from "react";
import { ImProfile } from "react-icons/im";
import { EditTrigger } from "../EditTrigger";
import { EditProfileModal } from "./EditProfileModal";

export function EditProfile({ triggerSize, profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <EditTrigger
        icon={<ImProfile />}
        label="Edit profile"
        onToggle={handleToggle}
        size={triggerSize}
      />
      {isOpen ? (
        <EditProfileModal profile={profile} onClose={handleToggle} />
      ) : null}
    </>
  );
}
