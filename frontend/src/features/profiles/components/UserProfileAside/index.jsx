import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Aside } from "../../../../components/Aside";
import { selectPlaylists } from "../../../playlists/store";
import { selectUserTracksBySlug } from "../../../tracks/store";
import "./UserProfileAside.css";

export function UserProfileAside() {
  const { slug } = useParams();
  const tracksCount = useSelector((state) =>
    selectUserTracksBySlug(state, slug)
  ).length;

  // TODO: only user playlists
  const playlistsCount = useSelector(selectPlaylists).length;

  return (
    <Aside>
      <header className="profile-aside-header">
        <InsightBox title="Followers" stat={34} />
        <InsightBox title="Tracks" stat={tracksCount} />
        <InsightBox title="Playlists" stat={playlistsCount} />
      </header>
    </Aside>
  );
}

function InsightBox({ title, stat }) {
  return (
    <div className="insight-box">
      <h3 className="insight-heading">{title}</h3>
      <p className="insight-stat">{stat}</p>
    </div>
  );
}
