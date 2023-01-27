import { Link } from "react-router-dom";
import "./BadgeLink.css";

export function BadgeLink({ to, label }) {
  return (
    <Link to={to}>
      <p className="badge-link">
        <span className="sharp">#</span>
        {label}
      </p>
    </Link>
  );
}
