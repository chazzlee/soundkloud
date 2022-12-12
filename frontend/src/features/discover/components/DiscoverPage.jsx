import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTracks,
  selectHasTracksLoaded,
  selectIsTracksLoading,
  selectMostPlayedTracks,
  selectRecentlyPlayedTracks,
  selectTracksByGenre,
  selectTracksError,
} from "../../tracks/store";
import styles from "./DiscoverPage.module.css";
import { CarouselSlider } from "./CarouselSlider";

export function DiscoverPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsTracksLoading);
  const loaded = useSelector(selectHasTracksLoaded);
  const error = useSelector(selectTracksError);

  const mostPlayedTracks = useSelector(selectMostPlayedTracks);
  const recentlyPlayedTracks = useSelector(selectRecentlyPlayedTracks);
  const popTracks = useSelector(selectTracksByGenre("pop"));
  const metalTracks = useSelector(selectTracksByGenre("metal"));
  const rnbTracks = useSelector(selectTracksByGenre("rnb"));
  const technoTracks = useSelector(selectTracksByGenre("techno"));
  const classicalTracks = useSelector(selectTracksByGenre("classical"));
  const ambientTracks = useSelector(selectTracksByGenre("ambient"));
  const deepHouseTracks = useSelector(selectTracksByGenre("deepHouse"));
  const dubstepTracks = useSelector(selectTracksByGenre("dubstep"));
  const tranceTracks = useSelector(selectTracksByGenre("trance"));
  const trapTracks = useSelector(selectTracksByGenre("trap"));
  const pianoTracks = useSelector(selectTracksByGenre("piano"));
  const danceEdmTracks = useSelector(selectTracksByGenre("danceEdm"));
  const drumNBassTracks = useSelector(selectTracksByGenre("drumNBass"));

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
    return <div>loading...</div>;
  }

  return (
    <div className="full-page">
      <main
        className={`page-container ${styles.innerContainer}`}
        style={{ paddingTop: 0, paddingBottom: "80px" }}
      >
        <div className={styles.columnMain}>
          <CarouselSlider
            title="More of what you like"
            slides={mostPlayedTracks}
          />
          <CarouselSlider
            title="Recently Played"
            slides={recentlyPlayedTracks}
          />

          <div></div>
          {/* TODO: Daily Drops?? */}

          <CarouselSlider title="Pop" slides={popTracks} />
          <CarouselSlider title="Ambient" slides={ambientTracks} />
          <CarouselSlider title="Deep House" slides={deepHouseTracks} />
          <CarouselSlider title="R & B" slides={rnbTracks} />
          <CarouselSlider title="Heavy Metal" slides={metalTracks} />
          <CarouselSlider title="Classical" slides={classicalTracks} />
          <CarouselSlider title="EDM & Dance" slides={danceEdmTracks} />
          <CarouselSlider title="Drum & Bass" slides={drumNBassTracks} />
          <CarouselSlider title="Techno" slides={technoTracks} />
          <CarouselSlider title="Trance" slides={tranceTracks} />
          <CarouselSlider title="Dubstep" slides={dubstepTracks} />
          <CarouselSlider title="Trap" slides={trapTracks} />
          <CarouselSlider title="Piano" slides={pianoTracks} />
        </div>
        <div className={styles.columnAside}>
          <p>ASIDE</p>
        </div>
      </main>
    </div>
  );
}
