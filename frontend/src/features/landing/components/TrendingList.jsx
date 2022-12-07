import { trendingPlaylists } from "../data";
import { TrendingListItem } from "./TrendingListItem";
import styles from "./LandingPage.module.css";

export function TrendingList() {
  return (
    <div className={styles.trendingList}>
      {trendingPlaylists.map((playlist) => (
        <TrendingListItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
