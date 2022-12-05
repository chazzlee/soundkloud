import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../../auth/components/LoginModal";
import { RegisterModal } from "../../auth/components/RegisterModal";
import styles from "./LandingPage.module.css";
import "./LandingPage.css";

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

//TODO: combine modals/add search icon/clean up styles/images
export function LandingPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const [carousel, setCarousel] = useState(carousels[0]);

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
          <section
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
              <button className={styles.ctaLeft}>Learn more</button>
              <button className={styles.ctaRight}>
                Try it free for 30 days
              </button>
            </div>

            <div className={styles.heroFooter}>
              <div
                className={styles.toggleHeroBtn}
                style={{
                  backgroundColor: carousel.id === 1 ? "#fff" : "transparent",
                }}
                onClick={() => setCarousel(carousels[0])}
              />
              <div
                className={styles.toggleHeroBtn}
                style={{
                  backgroundColor: carousel.id === 2 ? "#fff" : "transparent",
                }}
                onClick={() => setCarousel(carousels[1])}
              />
            </div>
          </section>

          <section className={styles.searchContainer}>
            <div className={styles.inputBox}>
              <input
                type="search"
                name="search"
                className="search-input"
                id="search"
                placeholder="Search for artists, bands, tracks, podcasts"
                autoComplete="off"
              />
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
                {new Array(12)
                  .fill({ src: "https://via.placeholder.com/180" })
                  .map((img, i) => (
                    <div key={i.toString()}>
                      <img
                        alt="FIXME"
                        src={img.src}
                        height={180}
                        width={180}
                        className={styles.trendingListItemImage}
                      />
                      <p className={styles.trendingListItemTitle}>
                        Artist Name - Song Title
                      </p>
                      <p className={styles.trendingListItemSubtitle}>
                        Display Name
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
              <img src="" alt="FIXME" height={"100%"} width={"100%"} />
            </div>
            <div className={styles.appStoreContentContainer}>
              <h3 className={styles.appStoreTitle}>Never stop listening</h3>
              <div></div>
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
              <a href="">Directory</a>
              <a href="">About us</a>
              <a href="">Artist Resources</a>
              <a href="">Blog</a>
              <a href="">Jobs</a>
              <a href="">Developers</a>
              <a href="">Help</a>
              <a href="">Legal</a>
              <a href="">Privacy</a>
              <a href="">Cookie Policy</a>
              <a href="">Cookie Manager</a>
              <a href="">Imprint</a>
              <a href="">Charts</a>
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
