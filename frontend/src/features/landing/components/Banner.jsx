import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import styles from "./LandingPage.module.css";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

export function Banner({ carousels, onClick }) {
  return (
    <CarouselProvider
      naturalSlideWidth={1240}
      naturalSlideHeight={450}
      isIntrinsicHeight={true}
      totalSlides={2}
      isPlaying={true}
      interval={3000}
      dragEnabled={false}
      infinite={true}
    >
      <Slider>
        {carousels.map((carousel, index) => (
          <Slide index={index} key={carousel.id}>
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
                {carousel.id === 1 ? (
                  <>
                    <a
                      className={styles.ctaLeft}
                      style={{ textAlign: "center" }}
                      href="https://github.com/chazzlee/soundkloud"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <AiOutlineGithub style={{ verticalAlign: "top" }} />{" "}
                      Github
                    </a>
                    <a
                      className={styles.ctaRight}
                      style={{ textAlign: "center" }}
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <AiOutlineLinkedin style={{ verticalAlign: "top" }} />{" "}
                      LinkedIn
                    </a>
                  </>
                ) : (
                  <button className={styles.ctaMiddle} onClick={onClick}>
                    Start uploading today
                  </button>
                )}
              </div>

              <div className={styles.heroFooter}>
                <ButtonBack
                  className={styles.toggleHeroBtn}
                  style={{
                    backgroundColor: carousel.id === 1 ? "#fff" : "transparent",
                  }}
                />
                <ButtonNext
                  className={styles.toggleHeroBtn}
                  style={{
                    backgroundColor: carousel.id === 2 ? "#fff" : "transparent",
                  }}
                />
              </div>
            </section>
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}
