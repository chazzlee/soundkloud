import { SlPencil } from "react-icons/sl";
import { ItemActionButton } from "../../../../components/ItemActionGoup/ItemActionButton";

export function EditTrigger({ onToggle, size }) {
  return (
    <ItemActionButton
      icon={<SlPencil />}
      label="Edit"
      onClick={onToggle}
      size={size}
    />
  );
}
