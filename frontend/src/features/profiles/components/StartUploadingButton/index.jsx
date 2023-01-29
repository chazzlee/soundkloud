import { Link } from "react-router-dom";
import "./StartUploadingButton.css";

export function StartUploadingButton({ hasUploads }) {
  return !hasUploads ? (
    <div className="user-profile-tab-heading">
      <Link to={"/upload"} className="start-uploading-btn-lg ">
        Start uploading
      </Link>
    </div>
  ) : null;
}
