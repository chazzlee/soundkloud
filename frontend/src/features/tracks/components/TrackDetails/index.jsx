import "./TrackDetails.css";

export function TrackDetails({ description = "" }) {
  // TODO:
  return (
    <div className="track-details-container">
      <p className="track-description">{description}</p>
      <div className="track-dt-group">
        <dt className="track-details-label">Released by:</dt>
        <dd className="track-details-content">Napalm Records</dd>
      </div>
      <div className="track-dt-group">
        <dt className="track-details-label">Release date:</dt>
        <dd className="track-details-content">21 October 2022</dd>
      </div>
      <div className="track-dt-group">
        <dt className="track-details-label"></dt>
        <dd className="track-details-content"></dd>
      </div>
    </div>
  );
}
