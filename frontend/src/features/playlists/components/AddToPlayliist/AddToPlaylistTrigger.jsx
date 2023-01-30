import { MdPlaylistAdd } from "react-icons/md";
import { ItemActionButton } from "../../../../components/ItemActionGoup/ItemActionButton";

export function AddToPlaylistTrigger({
  onToggle,
  size,
  icon = <MdPlaylistAdd />,
  label = "Add to playlist",
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
