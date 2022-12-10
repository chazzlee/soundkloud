import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
  Image,
} from "pure-react-carousel";
import styles from "./DiscoverPage.module.css";
import { useState } from "react";

const VISIBLE_SLIDES = 4;

export function CarouselSlider({ title, slides }) {
  const totalRows = slides.length / VISIBLE_SLIDES;
  const firstRowIndex = 0;
  const lastRowIndex = totalRows - 1;

  const [slidesIndex, setSlidesIndex] = useState(firstRowIndex);

  return (
    <div
      className={styles.carouselContainer}
      style={{ borderBottom: "1px solid var(--bg-light)" }}
    >
      <h2 className={styles.carouselHeading}>{title}</h2>
      <CarouselProvider
        naturalSlideWidth={180}
        naturalSlideHeight={230}
        totalSlides={slides.length}
        dragEnabled={false}
        visibleSlides={4.25}
        step={4}
        className={styles.relative}
      >
        {slidesIndex > firstRowIndex && (
          <ButtonBack
            className={styles.carouselControl}
            style={{ left: -12 }}
            onClick={() => setSlidesIndex((prev) => prev - 1)}
          >
            <RxCaretLeft className={styles.arrowIcon} />
          </ButtonBack>
        )}
        <Slider>
          {slides.map((slide, index) => (
            <Slide key={slide.id} index={index}>
              <div style={{ position: "relative" }}>
                <Image
                  src="https://www.metalkingdom.net/album-cover-artwork/2018/02/3/3062-Nile-Annihilation-of-the-Wicked.jpg"
                  style={{
                    objectFit: "cover",
                    width: "90%",
                    height: "90%",
                  }}
                />
                <div
                  onClick={() => console.log("play")}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "45%",
                    transform: "translate(-50%, -45%)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  PLAY
                </div>
              </div>
              <div style={{ marginTop: "6px" }}>
                <p className={styles.title}>{slide.title}</p>
                <p className={styles.subcaption}>{"Related tracks"}</p>
              </div>
            </Slide>
          ))}
        </Slider>
        {slidesIndex < lastRowIndex && (
          <ButtonNext
            className={styles.carouselControl}
            style={{ right: -12 }}
            onClick={() => setSlidesIndex((prev) => prev + 1)}
          >
            <RxCaretRight className={styles.arrowIcon} />
          </ButtonNext>
        )}
      </CarouselProvider>
    </div>
  );
}
