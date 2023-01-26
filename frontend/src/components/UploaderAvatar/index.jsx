import { Link } from "react-router-dom";
import "./UploaderAvatar.css";

export function UploaderAvatar({ uploader }) {
  return (
    <div className="uploader-details">
      <Link to={`/${uploader.slug}`}>
        {uploader.photo ? (
          <img
            className="uploader-photo"
            src={uploader.photo}
            alt={uploader.displayName}
          />
        ) : (
          <div className="uploader-photo" />
        )}
        <p className="uploader-name">{uploader.displayName}</p>
      </Link>
    </div>
  );
}
