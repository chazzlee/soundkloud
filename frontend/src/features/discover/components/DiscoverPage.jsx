import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
  Image,
} from "pure-react-carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTracks,
  selectAllTracks,
  selectHasTracksLoaded,
  selectIsTracksLoading,
  selectTracksError,
} from "../../tracks/store";
import { CarouselList } from "./CarouselList";
import styles from "./DiscoverPage.module.css";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useState } from "react";

const VISIBLE_SLIDES = 4;

export function DiscoverPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsTracksLoading);
  const loaded = useSelector(selectHasTracksLoaded);
  const error = useSelector(selectTracksError);
  const tracks = useSelector(selectAllTracks);

  const sampleSlides = tracks.slice(0, 16);
  const totalRows = sampleSlides.length / VISIBLE_SLIDES;
  const firstRowIndex = 0;
  const lastRowIndex = totalRows - 1;

  const [slidesIndex, setSlidesIndex] = useState(firstRowIndex);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchAllTracks());
    }
  }, [dispatch, loaded]);

  if (error) {
    return (
      <div>
        <h3>ERROR!</h3>
      </div>
    );
  }

  if (loading) {
    return <h1>Loading....!</h1>;
  }

  return (
    <div className="full-page">
      <main className={`page-container ${styles.innerContainer}`}>
        <div className={styles.columnMain}>
          <div
            className={styles.carouselContainer}
            style={{ borderBottom: "1px solid var(--bg-light)" }}
          >
            <h2 className={styles.carouselHeading}>More of what you like</h2>
            <CarouselProvider
              naturalSlideWidth={180}
              naturalSlideHeight={240}
              totalSlides={sampleSlides.length}
              dragEnabled={false}
              visibleSlides={4.2}
              step={4}
            >
              {slidesIndex > firstRowIndex && (
                <ButtonBack
                  className={styles.carouselControl}
                  style={{ left: 12 }}
                  onClick={() => setSlidesIndex((prev) => prev - 1)}
                >
                  <RxCaretLeft className={styles.arrowIcon} />
                </ButtonBack>
              )}
              <Slider>
                {sampleSlides.map((slide, index) => (
                  <Slide key={slide.id} index={index}>
                    <div>
                      <Image
                        src="https://www.metalkingdom.net/album-cover-artwork/2018/02/3/3062-Nile-Annihilation-of-the-Wicked.jpg"
                        style={{
                          objectFit: "cover",
                          width: "90%",
                          height: "90%",
                        }}
                      />
                    </div>
                    <div>
                      <p className={styles.title}>{slide.title}</p>
                      <p className={styles.subcaption}>{"Related tracks"}</p>
                    </div>
                  </Slide>
                ))}
              </Slider>
              {slidesIndex < lastRowIndex && (
                <ButtonNext
                  className={styles.carouselControl}
                  style={{ right: 375 }}
                  onClick={() => setSlidesIndex((prev) => prev + 1)}
                >
                  <RxCaretRight className={styles.arrowIcon} />
                </ButtonNext>
              )}
            </CarouselProvider>
          </div>
        </div>
        <div className={styles.columnAside}>
          <p>ASIDE</p>
        </div>
      </main>
    </div>
  );
}
