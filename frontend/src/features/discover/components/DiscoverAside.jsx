import { useSelector } from "react-redux";
import styles from "../pages/DiscoverPage.module.css";
import { ImSoundcloud, ImUsers } from "react-icons/im";
import { GrRefresh } from "react-icons/gr";
import { newTracks } from "../data";
import { SocialLinks } from "../../../components/SocialLinks";
import { selectAllProfiles } from "../../profiles/store";
import { Link } from "react-router-dom";

const randomLikeCount = Math.floor(Math.random() * 1000);
const randomFollowCount = Math.floor(Math.random() * 1000);

export function DiscoverAside() {
  const users = useSelector(selectAllProfiles);

  return (
    <div className={styles.relative}>
      <div className={styles.columnAside}>
        <h3 className={styles.asideHeading}>
          <ImSoundcloud
            style={{
              verticalAlign: "middle",
              fontSize: "1rem",
              marginRight: "4px",
            }}
          />
          New tracks
        </h3>
        <div className={styles.avatarRow}>
          {newTracks.map((artist) => (
            <div className={styles.avatar} key={artist.id}>
              <div
                className={styles.artistAvatar}
                style={{
                  background: `center / cover no-repeat url(${artist.avatar})`,
                }}
              />
              <p style={{ fontSize: "12px", color: "#333" }}>{artist.name}</p>
            </div>
          ))}
        </div>
        <h3
          className={styles.asideHeading}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <ImUsers
              style={{
                verticalAlign: "middle",
                fontSize: "1rem",
                marginRight: "4px",
              }}
            />
            Users you should follow
          </div>
          <div style={{ visibility: "hidden" }}>
            <GrRefresh
              style={{
                marginRight: "4px",
                verticalAlign: "middle",
                color: "#999",
              }}
            />
            Refresh list
          </div>
        </h3>
        {users.slice(0, 8).map((user) => (
          <Link
            className={styles.artistCardHorizontal}
            key={user.id}
            to={`/${user.slug}`}
          >
            <div
              className={styles.artistAvatar}
              style={{
                flexShrink: 0,
                background: user.photo
                  ? `center / cover no-repeat url(${user.photo})`
                  : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
              }}
            />
            <div className={styles.cardContent}>
              <p className={styles.artistName} style={{ color: "#333" }}>
                {user.displayName}
              </p>
              <div className={styles.cardFooter}>
                {/* TODO: */}
                <div className={styles.insights}>
                  <p style={{ marginRight: "4px" }}>Likes: {randomLikeCount}</p>
                  <p>Follows: {randomFollowCount}</p>
                </div>
                {/* <p className={styles.followBtn}>follow</p> */}
              </div>
            </div>
          </Link>
        ))}
        <div style={{ paddingTop: "20px" }}>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
