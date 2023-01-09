import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiscoverPage.module.css";
import { CarouselSlider } from "../components/CarouselSlider";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchDiscoverAsync,
  selectDiscoverLoaded,
  selectDiscoverListByType,
  selectDiscoverLoading,
  selectDiscoverGroupedByGenres,
} from "../store";
import { ImSoundcloud, ImUsers } from "react-icons/im";
import { GrRefresh } from "react-icons/gr";
import { fetchAllTracksByUserAsync } from "../../tracks/store";
import { sampleArtistsToFollow } from "../data";
import { fetchAllGenresAsync, selectGenresLoaded } from "../../genres/store";
import { FullSpinner } from "../../../components/FullSpinner";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
const artistsToFollow = shuffle(sampleArtistsToFollow).slice(0, 8);
const newTracks = shuffle(sampleArtistsToFollow).slice(0, 4);

export function DiscoverPage() {
  const currentUser = useSelector(selectCurrentUser);
  const discoverLoading = useSelector(selectDiscoverLoading);
  const discoverLoaded = useSelector(selectDiscoverLoaded);
  const discoverGroupedByGenres = useSelector(selectDiscoverGroupedByGenres);
  const genresLoaded = useSelector(selectGenresLoaded);
  const mostPlayed = useSelector((state) =>
    selectDiscoverListByType(state, "mostPlayed")
  );
  const recentlyPlayed = useSelector((state) =>
    selectDiscoverListByType(state, "recentlyPlayed")
  );
  const userTracks = useSelector((state) =>
    Object.values(state.tracks.entities)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genresLoaded) {
      dispatch(fetchAllGenresAsync());
    }
    if (!discoverLoaded) {
      dispatch(fetchDiscoverAsync());
    }
  }, [dispatch, genresLoaded, discoverLoaded]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllTracksByUserAsync(currentUser.id));
    }
  }, [dispatch, currentUser]);

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
