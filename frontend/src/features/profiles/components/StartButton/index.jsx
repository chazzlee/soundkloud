import { Link } from "react-router-dom";
import "./StartButton.css";

// TODO:
export function StartButton({ hasUploads, label = "Start uploading" }) {
  return !hasUploads ? (
    <div className="user-profile-tab-heading">
      <Link to={"/upload"} className="start-btn-lg">
        {label}
      </Link>
    </div>
  ) : null;
}
