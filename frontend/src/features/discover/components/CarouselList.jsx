import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import styles from "./CarouselList.module.css";
import "./CarouselList.css";

export function CarouselList({ dataList, subcaption }) {
  return (
    <CarouselProvider
      naturalSlideWidth={170}
      naturalSlideHeight={240}
      totalSlides={dataList.length}
      visibleSlides={4}
      step={4}
      dragEnabled={false}
      isIntrinsicHeight={true}
    >
      <Slider>
        {dataList.map((item, index) => (
          <Slide
            key={item.id}
            index={index}
            style={{ paddingRight: "20px !important" }}
          >
            <img
              height={173}
              width={173}
              src="https://via.placeholder.com/175"
              alt="FIXME:"
            />
            <div>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.subcaption}>{subcaption}</p>
            </div>
          </Slide>
        ))}
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
}

{
  // <div key={item.id}>
  //           <div>
  //             <p>{item.title}</p>
  //             <p>{subcaption}</p>
  //           </div>
  //         </div>
  /* <img src="https://via.placeholder.com/175" alt="FIXME:" /> */
}
