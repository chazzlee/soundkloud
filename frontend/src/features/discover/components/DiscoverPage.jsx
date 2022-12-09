import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTracks,
  selectAllTracks,
  selectHasTracksLoaded,
  selectIsTracksLoading,
  selectTracksError,
} from "../../tracks/store";
import { CarouselList } from "./CarouselList";
import styles from "./DiscoverPage.module.css";

export function DiscoverPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsTracksLoading);
  const loaded = useSelector(selectHasTracksLoaded);
  const error = useSelector(selectTracksError);
  const tracks = useSelector(selectAllTracks).slice(0, 4);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchAllTracks());
    }
  }, [dispatch, loaded]);

  if (error) {
    return (
      <div>
        <h3>ERROR!</h3>
      </div>
    );
  }

  if (loading) {
    return <h1>Loading....!</h1>;
  }

  return (
    <div className="full-page">
      <main className={`page-container ${styles.innerContainer}`}>
        <div className={styles.columnMain}>
          <div className={styles.carouselContainer}>
            <h2 className={styles.carouselHeading}>More of what you like</h2>
            <CarouselList dataList={tracks} subcaption="Related tracks" />
          </div>

          <div className={styles.carouselContainer}>
            <h2 className={styles.carouselHeading}>More of what you like</h2>
            <CarouselList dataList={tracks} subcaption="Related tracks" />
          </div>
          <div className={styles.carouselContainer}>
            <h2 className={styles.carouselHeading}>More of what you like</h2>
            <CarouselList dataList={tracks} subcaption="Related tracks" />
          </div>
        </div>
        <div className={styles.columnAside}>
          <p>ASIDE</p>
        </div>
      </main>
    </div>
  );
}
