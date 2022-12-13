import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiscoverPage.module.css";
import { CarouselSlider } from "./CarouselSlider";
import {
  fetchDiscoverAsync,
  selectDiscoverLoaded,
  selectDiscoverListByType,
  selectDiscoverListByGenre,
  selectDiscoverLoading,
} from "../store";
import { Spinner } from "../../../components/Spinner";

export function DiscoverPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectDiscoverLoading);
  const loaded = useSelector(selectDiscoverLoaded);
  const mostPlayed = useSelector(selectDiscoverListByType("mostPlayed"));
  const recentlyPlayed = useSelector(
    selectDiscoverListByType("recentlyPlayed")
  );
  const popTracks = useSelector(selectDiscoverListByGenre("pop"));
  const rnbTracks = useSelector(selectDiscoverListByGenre("rnb"));
  const technoTracks = useSelector(selectDiscoverListByGenre("techno"));
  const classicalTracks = useSelector(selectDiscoverListByGenre("classical"));
  const ambientTracks = useSelector(selectDiscoverListByGenre("ambient"));
  const deepHouseTracks = useSelector(selectDiscoverListByGenre("deepHouse"));
  const dubstepTracks = useSelector(selectDiscoverListByGenre("dubstep"));
  const tranceTracks = useSelector(selectDiscoverListByGenre("trance"));
  const trapTracks = useSelector(selectDiscoverListByGenre("trap"));
  const pianoTracks = useSelector(selectDiscoverListByGenre("piano"));
  const danceEdmTracks = useSelector(selectDiscoverListByGenre("danceEdm"));
  const drumNBassTracks = useSelector(selectDiscoverListByGenre("drumNBass"));
  const metalTracks = useSelector(selectDiscoverListByGenre("metal"));

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchDiscoverAsync());
    }
  }, [dispatch, loaded]);

  // TODO:
  // if (error) {
  //   return (
  //     <div>
  //       <h3>ERROR!</h3>
  //     </div>
  //   );
  // }

  //TODO: show spinner...
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "scroll",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className="full-page">
      <main
        className={`page-container ${styles.innerContainer}`}
        style={{ paddingTop: 0, paddingBottom: "80px" }}
      >
        <div className={styles.columnMain}>
          <CarouselSlider title="More of what you like" slides={mostPlayed} />
          <CarouselSlider title="Recently Played" slides={recentlyPlayed} />

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
