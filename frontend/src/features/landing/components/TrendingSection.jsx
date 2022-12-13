import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { TrendingList } from "./TrendingList";

export function TrendingSection() {
  return (
    <section className={styles.trendingContainer}>
      <h3 className={styles.trendingTitle}>
        Hear what’s trending for free in the SoundCloud community
      </h3>
      <div className={styles.center}>
        <TrendingList />
        <div className={styles.exploreContainer}>
          <Link className={styles.exploreBtn} to="/discover">
            Explore trending playlists
          </Link>
        </div>
      </div>
    </section>
  );
}
