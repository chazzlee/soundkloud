import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import styles from "./DiscoverPage.module.css";
import { useState } from "react";
import { PlayCard } from "./PlayCard";

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
              <PlayCard item={slide} />
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