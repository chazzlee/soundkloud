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
// import { GrRefresh } from "react-icons/gr";
import { fetchAllTracksByUserAsync } from "../../tracks/store";
import { sampleArtistsToFollow } from "../data";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
const artistsToFollow = shuffle(sampleArtistsToFollow).slice(0, 8);
const newTracks = shuffle(sampleArtistsToFollow).slice(0, 4);

export function DiscoverPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const discoverLoading = useSelector(selectDiscoverLoading);
  const discoverLoaded = useSelector(selectDiscoverLoaded);
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
  const userTracks = useSelector((state) =>
    Object.values(state.tracks.entities)
  );

  useEffect(() => {
    if (!discoverLoaded) {
      dispatch(fetchDiscoverAsync());
    }
  }, [dispatch, discoverLoaded]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllTracksByUserAsync(currentUser.id));
    }
  }, [dispatch, currentUser]);

  // TODO:
  // if (error) {
  //   return (
  //     <div>
  //       <h3>ERROR!</h3>
  //     </div>
  //   );
  // }

  //TODO: show spinner...
  if (discoverLoading) {
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
          {!currentUser && (
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
          {currentUser && (
            <CarouselSlider
              title={"Your uploaded tracks"}
              slides={userTracks}
            />
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
              {/* <div>
                <GrRefresh
                  style={{
                    marginRight: "4px",
                    verticalAlign: "middle",
                    color: "#999",
                  }}
                />
                Refresh list
              </div> */}
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
                      <p style={{ marginRight: "4px" }}>
                        Likes: {artist.likes}
                      </p>
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
                href="https://linkedin.com"
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
      </main>
    </div>
  );
}
