import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../../auth/components/LoginModal";
import { RegisterModal } from "../../auth/components/RegisterModal";
import styles from "./LandingPage.module.css";
import "./LandingPage.css";
import { IoSearch } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";

const carousels = [
  {
    id: 1,
    title: "Discover more with SoundCloud Go+",
    subTitle:
      "SoundCloud Go+ lets you listen offline, ad-free, with over 150 million tracks — and growing.",
    imageUrl:
      "https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_c-318d7eed.jpg",
  },
  {
    id: 2,
    title: "What's next in music is first on SoundCloud",
    subTitle:
      "Upload your first track and begin your journey. SoundCloud gives you space to create, find your fans, and connect with other artists.",
    imageUrl:
      "https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg",
  },
];

const trendingPlaylists = [
  {
    id: 1,
    title: "Lil Uzi Vert - Just Wanna Rock",
    user: "Lil Uzi Vert",
    imageUrl: "https://i1.sndcdn.com/artworks-y1zEjHBDrc2X-0-t500x500.jpg",
  },
  {
    id: 2,
    title: "Drake, 21 Savage - Rich Flex",
    user: "octobersveryown",
    imageUrl: "https://i1.sndcdn.com/artworks-CQla57R6PT2X-0-t500x500.jpg",
  },
  {
    id: 3,
    title: "OG DAYV, Future - Limoncello",
    user: "Future",
    imageUrl: "https://i1.sndcdn.com/artworks-qoNTw55xt95J-0-t500x500.jpg",
  },
  {
    id: 4,
    title: "Hylan Starr & Wale- If Pretty Was A Person",
    user: "Hylan Starr",
    imageUrl:
      "https://i1.sndcdn.com/artworks-wzj0nrprt6V3ggm3-H3MPTw-t500x500.jpg",
  },
  {
    id: 5,
    title: "Out thë way",
    user: "Yeat",
    imageUrl: "https://i1.sndcdn.com/artworks-NEhRyKEYF3zv-0-t500x500.jpg",
  },
  {
    id: 6,
    title: "Don't Step",
    user: "Lil Kizzle",
    imageUrl: "https://i1.sndcdn.com/artworks-zFxHIaPp9Udl-0-t500x500.jpg",
  },
  {
    id: 7,
    title: "Patience",
    user: "Nevi",
    imageUrl: "https://i1.sndcdn.com/artworks-3nJSJClPP4QJ-0-t500x500.jpg",
  },
  {
    id: 8,
    title: "Nut Quick",
    user: "GloRilla",
    imageUrl: "https://i1.sndcdn.com/artworks-mxhGTjZVy5VJ-0-t500x500.jpg",
  },
  {
    id: 9,
    title: "Behani & Ne-Yo - Real Man",
    user: "Behani",
    imageUrl:
      "https://i1.sndcdn.com/artworks-zFcobsxrAOQBpRVU-gcxR4w-t500x500.jpg",
  },
  {
    id: 10,
    title: "One Night Stand",
    user: "Lonnie",
    imageUrl:
      "https://i1.sndcdn.com/artworks-vclDRmT3vLc1oTlo-jCC1kg-t500x500.jpg",
  },
  {
    id: 11,
    title: "In My Head",
    user: "Juice WRLD",
    imageUrl:
      "https://i1.sndcdn.com/artworks-Gx9raQ9oAzV8FNO0-zLkK8g-t500x500.jpg",
  },
  {
    id: 12,
    title: "Bad Habit",
    user: "Steve Lacy",
    imageUrl: "https://i1.sndcdn.com/artworks-90RGjVBt1Sja-0-t500x500.jpg",
  },
];

//TODO: combine modals/add search icon/clean up styles/images
export function LandingPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const [carousel, setCarousel] = useState(carousels[0]);
  const nodeRef = useRef();
  const [inProp, setInProp] = useState(false);

  return (
    <>
      <div className={styles.landingPage}>
        <main className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.navLogo}>SOUNDCLOUD</h1>
            <div className={styles.authButtonGroup}>
              <button
                className={styles.signIn}
                onClick={() => setLoginModalOpen(true)}
              >
                Sign in
              </button>
              <button
                className={styles.createAccount}
                onClick={() => setRegisterModalOpen(true)}
              >
                Create account
              </button>
              <a href="#artists" className={styles.artistsLink}>
                For Artists
              </a>
            </div>
          </header>

          <CSSTransition
            nodeRef={nodeRef}
            in={inProp}
            timeout={200}
            classNames="slide"
          >
            <section
              ref={nodeRef}
              className={styles.heroContainer}
              style={{
                backgroundImage: `url(${carousel.imageUrl})`,
              }}
            >
              <div className={styles.heroContent}>
                <h2 className={styles.heroTitle}>{carousel.title}</h2>
                <p className={styles.heroSubtitle}>{carousel.subTitle}</p>
              </div>

              <div className={styles.ctaButtonGroup}>
                {carousel.id === 1 ? (
                  <>
                    <button className={styles.ctaLeft}>Learn more</button>
                    <button className={styles.ctaRight}>
                      Try it free for 30 days
                    </button>
                  </>
                ) : (
                  <button className={styles.ctaMiddle}>
                    Start uploading today
                  </button>
                )}
              </div>

              <div className={styles.heroFooter}>
                <div
                  className={styles.toggleHeroBtn}
                  style={{
                    backgroundColor: carousel.id === 1 ? "#fff" : "transparent",
                  }}
                  onClick={() => {
                    setInProp((prev) => !prev);
                    setCarousel(carousels[0]);
                  }}
                />
                <div
                  className={styles.toggleHeroBtn}
                  style={{
                    backgroundColor: carousel.id === 2 ? "#fff" : "transparent",
                  }}
                  onClick={() => {
                    setInProp((prev) => !prev);
                    setCarousel(carousels[1]);
                  }}
                />
              </div>
            </section>
          </CSSTransition>

          <section className={styles.searchContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.inputBox}>
                <input
                  type="search"
                  name="search"
                  className="search-input"
                  id="search"
                  placeholder="Search for artists, bands, tracks, podcasts"
                  autoComplete="off"
                />
                <span
                  style={{
                    position: "absolute",
                    fontSize: "22px",
                    top: 10,
                    right: 10,
                    color: "darkgray",
                  }}
                >
                  <IoSearch />
                </span>
              </div>
              <span className={styles.or}>or</span>
              <button className={styles.uploadBtn}>Upload your own</button>
            </div>
          </section>

          <section className={styles.trendingContainer}>
            <h3 className={styles.trendingTitle}>
              Hear what’s trending for free in the SoundCloud community
            </h3>
            <div className={styles.center}>
              <div className={styles.trendingList}>
                {trendingPlaylists.map((playlist) => (
                  <div key={playlist.id}>
                    <img
                      alt={playlist.title}
                      aria-label={playlist.title}
                      src={playlist.imageUrl}
                      height={180}
                      width={180}
                      className={styles.trendingListItemImage}
                    />
                    <p className={styles.trendingListItemTitle}>
                      {playlist.title.length >= 21
                        ? `${playlist.title.substring(0, 21)}...`
                        : playlist.title}
                    </p>
                    <p className={styles.trendingListItemSubtitle}>
                      {playlist.user}
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.exploreContainer}>
                <button className={styles.exploreBtn}>
                  Explore trending playlists
                </button>
              </div>
            </div>
          </section>

          <section className={styles.appStoreContainer}>
            <div className={styles.appStoreImageContainer}>
              <img
                src="https://a-v2.sndcdn.com/assets/images/never_stop_listening@1x-9c5264ff.jpg"
                alt="device-banner"
                height={"100%"}
                width={"100%"}
              />
            </div>
            <div className={styles.appStoreContentContainer}>
              <h3 className={styles.appStoreTitle}>Never stop listening</h3>
              <div className={styles.fancyBorder}></div>
              <p className={styles.appStoreSubtitle}>
                SoundCloud is available on Web, iOS, Android, Sonos, Chromecast,
                and Xbox One.
              </p>
              <div>
                <a href="#apple-app-store" className={styles.appleStoreMargin}>
                  <img
                    src="https://a-v2.sndcdn.com/assets/images/appstore_badge@en-9e7292e6.png"
                    alt="Apple App Store"
                  />
                </a>
                <a href="#google-play-store">
                  <img
                    src="https://a-v2.sndcdn.com/assets/images/google_play_badge@en-51d52194.png"
                    alt="Google Play Store"
                  />
                </a>
              </div>
            </div>
          </section>

          <section className={styles.creatorContainer}>
            <div className={styles.creatorLeft}>
              <h3 className={styles.creatorTitle}>Calling all creators</h3>
              <p className={styles.creatorSubtitle}>
                Get on SoundCloud to connect with fans, share your sounds, and
                grow your audience. What are you waiting for?
              </p>
            </div>
            <button className="find-out-cta">Find out more</button>
          </section>

          <section className={styles.thanksContainer}>
            <h3 className={styles.thanksTitle}>
              Thanks for listening. Now join in.
            </h3>
            <p className={styles.thanksSubtitle}>
              Save tracks, follow artists and build playlists. All for free.
            </p>
            <button className={styles.createAccountBtn}>Create account</button>
            <div className={styles.accountButtonGroup}>
              <p className={styles.accountContent}>Already have an account?</p>
              <button className="sign-in-transparent-btn">Sign in</button>
            </div>
          </section>

          <footer className={styles.footer}>
            <div>
              <a href="#directory">Directory</a>
              <a href="#about-us">About us</a>
              <a href="#artist-resources">Artist Resources</a>
              <a href="#blog">Blog</a>
              <a href="#jobs">Jobs</a>
              <a href="#developers">Developers</a>
              <a href="#help">Help</a>
              <a href="#legal">Legal</a>
              <a href="#privacy">Privacy</a>
              <a href="#cookie-policy">Cookie Policy</a>
              <a href="#cookie-manager">Cookie Manager</a>
              <a href="#imprint">Imprint</a>
              <a href="#charts  ">Charts</a>
            </div>
            <button className={styles.languageBtn}>
              Language: <span style={{ color: "#333" }}>English (US)</span>
            </button>
          </footer>
        </main>
      </div>
      {loginModalOpen ? (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          onSuccess={() => {
            setLoginModalOpen(false);
            navigate("/discover");
          }}
        />
      ) : null}
    </>
  );
}

// <div>
//   <h1>Landing page</h1>
//   <button onClick={() => setLoginModalOpen(true)}>Sign in</button>
//   <button onClick={() => setRegisterModalOpen(true)}>Create account</button>
//   {loginModalOpen ? (
//     <LoginModal
//       onClose={() => setLoginModalOpen(false)}
//       onSuccess={() => {
//         setLoginModalOpen(false);
//         navigate("/discover");
//       }}
//     />
//   ) : null}
//   {registerModalOpen ? (
//     <RegisterModal
//       onClose={() => setRegisterModalOpen(false)}
//       onSuccess={() => {
//         setRegisterModalOpen(false);
//         navigate("/discover");
//       }}
//     />
//   ) : null}
// </div>
