import { SlPencil } from "react-icons/sl";
import { ItemActionButton } from "../../../../components/ItemActionGoup/ItemActionButton";

export function EditTrigger({
  onToggle,
  size,
  label = "Edit",
  icon = <SlPencil />,
}) {
  return (
    <ItemActionButton
      icon={icon}
      label={label}
      onClick={onToggle}
      size={size}
    />
  );
}
