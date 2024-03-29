import { BiLockAlt } from "react-icons/bi";
import "./PrivateBadge.css";

export function PrivateBadge({ privacy, small = false }) {
  // TODO: width

  return privacy === "private" ? (
    <p className={`private-badge ${small ? "small" : ""}`}>
      <span className="private-icon">
        <BiLockAlt />
      </span>
      <span>private</span>
    </p>
  ) : null;
}
