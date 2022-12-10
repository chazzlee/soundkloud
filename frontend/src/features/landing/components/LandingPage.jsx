import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "../../auth/components/AuthModal";
import styles from "./LandingPage.module.css";
import "./LandingPage.css";
import { IoSearch } from "react-icons/io5";
import { carousels } from "../data";
import { Footer } from "./Footer";
import { TrendingSection } from "./TrendingSection";
import { Banner } from "./Banner";

//TODO: combine modals/break out into components/banner slider transitions/login modal dropin transition
export function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <>
      {/* <Title>Stream and listen to music online for free with SoundCloud</Title> FIXME: doesn't work! */}
      <div className="landing-page">
        <main className="page-container">
          <header className={styles.header}>
            <h1 className={styles.navLogo}>SOUNDKLOUD</h1>
            <div className={styles.authButtonGroup}>
              <button
                className={styles.signIn}
                onClick={() => setAuthModalOpen(true)}
              >
                Sign in
              </button>
              <button
                className={styles.createAccount}
                onClick={() => setAuthModalOpen(true)}
              >
                Create account
              </button>
              <a href="#artists" className={styles.artistsLink}>
                For Artists
              </a>
            </div>
          </header>

          <Banner carousels={carousels} />

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  style={{
                    position: "absolute",
                    fontSize: "22px",
                    top: 10,
                    right: 10,
                    color: "darkgray",
                    cursor: "pointer",
                  }}
                  onClick={() => console.log("searching...", search)}
                >
                  <IoSearch />
                </span>
              </div>
              <span className={styles.or}>or</span>
              <button className={styles.uploadBtn}>Upload your own</button>
            </div>
          </section>

          <TrendingSection />

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
            <button
              className={styles.createAccountBtn}
              onClick={() => setAuthModalOpen(true)}
            >
              Create account
            </button>
            <div className={styles.accountButtonGroup}>
              <p className={styles.accountContent}>Already have an account?</p>
              <button
                className="sign-in-transparent-btn"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign in
              </button>
            </div>
          </section>

          <Footer />
        </main>
      </div>
      {authModalOpen ? (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {
            setAuthModalOpen(false);
            navigate("/discover");
          }}
        />
      ) : null}
    </>
  );
}
