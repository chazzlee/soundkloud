import { Link } from "react-router-dom";
import { DefaultCover } from "../../../DefaultCover";
import { SocialLinks } from "../../../SocialLinks";
import "./ShowAside.css";

export function ShowAside({
  headingIcon,
  heading,
  asideItems = [],
  viewUrl = "/",
}) {
  return (
    <aside className="aside-root-container">
      <header className="aside-header">
        <h2 className="aside-heading">
          {headingIcon} {heading}
        </h2>
        {/* TODO: LINK to user playlists show page! */}
        <Link to={viewUrl}>View all</Link>
      </header>
      <article className="aside-container">
        {asideItems.map((item) => (
          <AsideRowItem
            key={item.id}
            user={item.user}
            title={item.title}
            permalink={item.permalink}
            coverUrl={item.coverUrl}
          />
        ))}
      </article>
      <article className="social-links">
        <SocialLinks />
      </article>
    </aside>
  );
}

function AsideRowItem({ coverUrl, user, title, permalink }) {
  return (
    <div className="aside-item">
      <Link to={permalink}>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="track-cover"
            className="aside-item-cover"
            height={50}
            width={50}
          />
        ) : (
          <DefaultCover size={50} />
        )}
      </Link>
      <div className="aside-item-details">
        <Link className="item-details-user truncate" to={`/${user.slug}`}>
          {user.displayName}
        </Link>
        <Link className="item-details-title truncate" to={permalink}>
          {title}
        </Link>
      </div>
    </div>
  );
}
