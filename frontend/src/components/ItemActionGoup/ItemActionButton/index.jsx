import "./ItemActionButton.css";

export function ItemActionButton({ icon, label, onClick, size }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="item-action-btn"
      onClick={onClick}
      style={{ fontSize: size === "lg" ? 14 : 11 }}
    >
      {icon} <span>{label}</span>
    </button>
  );
}
