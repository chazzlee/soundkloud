import styles from "../pages/DiscoverPage.module.css";
import { ImSoundcloud, ImUsers } from "react-icons/im";
import { GrRefresh } from "react-icons/gr";
import { artistsToFollow, newTracks } from "../data";

export function DiscoverAside() {
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
              <p style={{ fontSize: "12px" }}>{artist.name}</p>
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
            Artists you should follow
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
        {artistsToFollow.map((artist) => (
          <div className={styles.artistCardHorizontal} key={artist.id}>
            <div
              className={styles.artistAvatar}
              style={{
                background: `center / cover no-repeat url(${artist.avatar})`,
              }}
            />
            <div className={styles.cardContent}>
              <p className={styles.artistName}>{artist.name}</p>
              <div className={styles.cardFooter}>
                {/* TODO: */}
                <div className={styles.insights}>
                  <p style={{ marginRight: "4px" }}>Likes: {artist.likes}</p>
                  <p>Follows: {artist.follows}</p>
                </div>
                {/* <p className={styles.followBtn}>follow</p> */}
              </div>
            </div>
          </div>
        ))}
        <div style={{ paddingTop: "20px" }}>
          <a
            href="https://github.com/chazzlee/soundkloud"
            style={{
              padding: "6px 14px",
              background: "#333",
              color: "white",
              borderRadius: "3px",
              fontSize: "14px",
              marginRight: "4px",
            }}
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/chazz-lee-016908260/"
            style={{
              padding: "6px 14px",
              background: "#0073b1",
              color: "white",
              borderRadius: "3px",
              fontSize: "14px",
            }}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
