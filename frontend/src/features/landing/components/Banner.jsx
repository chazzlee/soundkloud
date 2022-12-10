import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import styles from "./LandingPage.module.css";

export function Banner({ carousels }) {
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
