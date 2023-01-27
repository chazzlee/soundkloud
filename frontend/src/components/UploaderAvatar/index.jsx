import { Link } from "react-router-dom";
import "./UploaderAvatar.css";

export function UploaderAvatar({ slug, photo, displayName }) {
  return (
    <div className="uploader-details">
      <Link to={`/${slug}`}>
        {photo ? (
          <img className="uploader-photo" src={photo} alt={displayName} />
        ) : (
          <div className="uploader-photo" />
        )}
        <p className="uploader-name">{displayName}</p>
      </Link>
    </div>
  );
}
