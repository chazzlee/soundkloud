import { Link } from "react-router-dom";
import "./BadgeLink.css";

export function BadgeLink({ to, label }) {
  return (
    <Link to={to} className="badge-link">
      <p className="badge-link-text">
        <span className="sharp">#</span>
        {label}
      </p>
    </Link>
  );
}
