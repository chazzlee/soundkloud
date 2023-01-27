import { DefaultCover } from "../DefaultCover";
import "./TrackCover.css";

export function TrackCover({ coverUrl, size = 30, alt = "" }) {
  return coverUrl ? (
    <img
      className="track-cover-image"
      src={coverUrl}
      alt={alt}
      height={size}
      width={size}
    />
  ) : (
    <DefaultCover size={size} />
  );
}
