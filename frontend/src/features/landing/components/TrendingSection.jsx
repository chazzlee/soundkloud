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
          <button className={styles.exploreBtn}>
            Explore trending playlists
          </button>
        </div>
      </div>
    </section>
  );
}
