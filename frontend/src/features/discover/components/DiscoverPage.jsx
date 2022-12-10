import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTracks,
  selectAllTracks,
  selectHasTracksLoaded,
  selectIsTracksLoading,
  selectTracksError,
} from "../../tracks/store";
import styles from "./DiscoverPage.module.css";
import { CarouselSlider } from "./CarouselSlider";

export function DiscoverPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsTracksLoading);
  const loaded = useSelector(selectHasTracksLoaded);
  const error = useSelector(selectTracksError);
  const tracks = useSelector(selectAllTracks);

  const test = [...tracks];

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
          <CarouselSlider
            title="More of what you like"
            slides={tracks.slice(0, 16)}
          />
          <CarouselSlider title="Recently Played" slides={test.slice(0, 16)} />
          <CarouselSlider title="Next Wav Miami" slides={test.slice(0, 16)} />

          <div></div>
          {/* TODO: Daily Drops?? */}

          <CarouselSlider title="Fresh Pressed" slides={test.slice(0, 16)} />
          <CarouselSlider title="Charts: Top 50" slides={test.slice(0, 16)} />
          <CarouselSlider
            title="Charts: New & hot"
            slides={test.slice(0, 16)}
          />
          <CarouselSlider title="Rock & Metal" slides={test.slice(0, 16)} />
          <CarouselSlider title="New Music Now" slides={test.slice(0, 16)} />
          <CarouselSlider title="EDM" slides={test.slice(0, 16)} />
          <CarouselSlider title="Emo Rap & More" slides={test.slice(0, 16)} />
          <CarouselSlider title="Chill Tunes" slides={test.slice(0, 16)} />
        </div>
        <div className={styles.columnAside}>
          <p>ASIDE</p>
        </div>
      </main>
    </div>
  );
}
