import styles from "./CarouselSlider.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import { PlayCard } from "./PlayCard";

const VISIBLE_SLIDES = 4;

export function CarouselSlider({ slides, title, subTitle = "" }) {
  const totalRows = slides.length / VISIBLE_SLIDES;
  const firstRowIndex = 0;
  const lastRowIndex = totalRows - 1;

  const [slidesIndex, setSlidesIndex] = useState(firstRowIndex);

  return (
    <div className={styles.carouselContainer}>
      <h2
        className={`${styles.carouselHeading} ${
          subTitle ? styles.mbSm : styles.mbLg
        }`}
      >
        {title}
      </h2>

      {subTitle && <p className={styles.subcaption}>{subTitle}</p>}

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
            className={`${styles.carouselControl} ${styles.back}`}
            onClick={() => setSlidesIndex((prev) => prev - 1)}
          >
            <RxCaretLeft className={styles.arrowIcon} />
          </ButtonBack>
        )}
        <Slider>
          {slides.map((slide, index) => (
            <Slide key={slide.id} index={index}>
              <Link to={`${slide.permalink}`}>
                <PlayCard item={slide} />
              </Link>
            </Slide>
          ))}
        </Slider>
        {slidesIndex < lastRowIndex && (
          <ButtonNext
            className={`${styles.carouselControl} ${styles.next}`}
            onClick={() => setSlidesIndex((prev) => prev + 1)}
          >
            <RxCaretRight className={styles.arrowIcon} />
          </ButtonNext>
        )}
      </CarouselProvider>
    </div>
  );
}
