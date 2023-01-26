import { MdPlaylistPlay } from "react-icons/md";
import { Link } from "react-router-dom";
import { SocialLinks } from "../../../SocialLinks";
import "./ShowAside.css";

export function ShowAside() {
  return (
    <aside>
      <header className="aside-header">
        <h2 className="aside-heading">
          <MdPlaylistPlay /> Playlists from this user
        </h2>
        {/* TODO: LINK to user playlists show page! */}
        <Link to={"/"}>View all</Link>
      </header>
      <article className="aside-container">
        <div className="aside-item">
          <img src="" alt="track-cover" className="aside-item-cover" />
          <div className="aside-item-details">
            <p className="item-details-user">APEX1</p>
            <p className="item-details-title">playlist title</p>
          </div>
        </div>
        <div className="aside-item">
          <img src="" alt="track-cover" className="aside-item-cover" />
          <div className="aside-item-details">
            <Link className="item-details-user" to={"/"}>
              APEX1
            </Link>
            <Link className="item-details-title" to={"/"}>
              playlist title
            </Link>
          </div>
        </div>
      </article>
      <article className="social-links">
        <SocialLinks />
      </article>
    </aside>
  );
}
