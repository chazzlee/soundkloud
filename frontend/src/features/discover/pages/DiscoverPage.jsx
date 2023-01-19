import styles from "./DiscoverPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchDiscoverPageAsync,
  selectDiscoverListByType,
  selectDiscoverLoading,
  selectDiscoverGroupedByGenres,
} from "../store";
import { selectUserTracks } from "../../tracks/store";
import { CarouselSlider } from "../components/CarouselSlider";
import { FullSpinner } from "../../../components/FullSpinner";
import { waveTrackCleared } from "../../player/store";
import { DiscoverAside } from "../components/DiscoverAside";

export function DiscoverPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const discoverLoading = useSelector(selectDiscoverLoading);
  const discoverGroupedByGenres = useSelector(selectDiscoverGroupedByGenres);

  const mostPlayed = useSelector((state) =>
    selectDiscoverListByType(state, "mostPlayed")
  );
  const recentlyPlayed = useSelector((state) =>
    selectDiscoverListByType(state, "recentlyPlayed")
  );
  const userTracks = useSelector(selectUserTracks);

  useEffect(() => {
    dispatch(fetchDiscoverPageAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(waveTrackCleared());
  // }, [dispatch]);

  if (discoverLoading) {
    return <FullSpinner />;
  }

  return (
    <div className="full-page">
      <main className={`page-container ${styles.innerContainer}`}>
        <div className={styles.columnMain}>
          {!currentUser && (
            <h1 className={styles.discoverTitle}>
              Discover Tracks and Playlists
            </h1>
          )}

          {currentUser ? (
            <CarouselSlider
              title={"Your uploaded tracks"}
              slides={userTracks}
            />
          ) : null}

          <CarouselSlider
            title={
              currentUser && mostPlayed.length
                ? "More of what you like"
                : "Charts: Top 50"
            }
            slides={mostPlayed}
            subTitle={
              currentUser
                ? ""
                : "The most played tracks on SoundKloud this week"
            }
          />

          <CarouselSlider
            title={
              currentUser && recentlyPlayed.length
                ? "Recently Played"
                : "Charts: New & hot"
            }
            slides={recentlyPlayed}
            subTitle={
              currentUser
                ? ""
                : "The most played tracks on SoundKloud this week"
            }
          />

          {/* Tracks by Genre */}
          {discoverGroupedByGenres.map((group) => (
            <CarouselSlider
              key={group.genreName}
              title={group.genreLabel}
              slides={group.tracks}
            />
          ))}
        </div>

        {/* Aside */}
        <DiscoverAside />
      </main>
    </div>
  );
}
