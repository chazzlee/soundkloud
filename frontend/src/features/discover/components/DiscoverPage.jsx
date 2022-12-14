import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiscoverPage.module.css";
import { CarouselSlider } from "./CarouselSlider";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchDiscoverAsync,
  selectDiscoverLoaded,
  selectDiscoverListByType,
  selectDiscoverListByGenre,
  selectDiscoverLoading,
} from "../store";
import { Spinner } from "../../../components/Spinner";
import { ImSoundcloud, ImUsers } from "react-icons/im";
import { GrRefresh } from "react-icons/gr";

export function DiscoverPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
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
      <main className={`page-container ${styles.innerContainer}`}>
        <div className={styles.columnMain}>
          {currentUser && (
            <h1
              style={{
                marginTop: "48px",
                fontWeight: "500",
                width: "100%",
                borderBottom: "1px solid #f2f2f2",
              }}
            >
              Discover Tracks and Playlists
            </h1>
          )}
          <CarouselSlider
            title={currentUser ? "More of what you like" : "Charts: Top 50"}
            slides={mostPlayed}
            subTitle={
              currentUser
                ? ""
                : "The most played tracks on SoundKloud this week"
            }
          />
          <CarouselSlider
            title={currentUser ? "Recently Played" : "Charts: New & hot"}
            slides={recentlyPlayed}
            subTitle={
              currentUser
                ? ""
                : "The most played tracks on SoundKloud this week"
            }
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
              <div className={styles.avatar}>
                <div className={styles.artistAvatar} />
                <p>Slayer</p>
              </div>
              <div className={styles.avatar}>
                <div className={styles.artistAvatar} />
                <p>Slayer</p>
              </div>
              <div className={styles.avatar}>
                <div className={styles.artistAvatar} />
                <p>Slayer</p>
              </div>
              <div className={styles.avatar}>
                <div className={styles.artistAvatar} />
                <p>Slayer</p>
              </div>
              <div className={styles.avatar}>
                <div className={styles.artistAvatar} />
                <p>Slayer</p>
              </div>
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
              <div>
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
            <div className={styles.artistCardHorizontal}>
              <div className={styles.artistAvatar} />
              <div className={styles.cardContent}>
                <p className={styles.artistName}>Silence</p>
                <div className={styles.cardFooter}>
                  {/* TODO: */}
                  <div className={styles.insights}>
                    <p>I 34324</p>
                    <p>I 4324</p>
                  </div>
                  <p className={styles.followBtn}>follow</p>
                </div>
              </div>
            </div>
            <div className={styles.artistCardHorizontal}></div>
            <div className={styles.artistCardHorizontal}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
