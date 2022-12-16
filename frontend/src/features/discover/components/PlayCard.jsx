import { Image } from "pure-react-carousel";
import { useRef } from "react";
import { useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { useDispatch } from "react-redux";
import { startNowPlaying } from "../../tracks/store";
import styles from "./DiscoverPage.module.css";

const getRandomInteger = (max = 255) => {
  return Math.floor(Math.random() * (max + 1));
};
const sampleCovers = [
  "https://soundkloud-seeds.s3.amazonaws.com/Blind+Guardian+-+2010+-+At+The+Edge+Of+Time.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/anata-dismay.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Artillery+Terror+Squad--f.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/at-the-gate-redsky.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Control+Denied+-+The+Fragile+Art+of+Existence.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Bolt_Thrower_-_Realm_Of_Chaos-front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Soulside_Journey-Cover.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Cryptopsy_-_whisper_supremacy.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/hate_eternal_king_of_all_kings_2002_retail_cd-front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/slayer_-_haunting_the_chapel_a.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Behemoth+-+Evangelion.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Cryptopsy-Blasphemy+Made+Flesh.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Celtic+Frost+-+Morbid+Tales+(Front).jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Conception+-+Flow+(Front).jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Dark+Moor+-+The+Gates+Of+Oblivion.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Slayer+1985+-+Hell+Awaits+-+Front+.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/sauron.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/terminal.JPG",
  "https://soundkloud-seeds.s3.amazonaws.com/Bloodbath+The+Fathomless+Mastery.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Adramelch+-+Irae+Melanox+(1988)+RM+Front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/(2002)+When+Dream+and+Day+Unite+%5BRemastered%5D.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/00-atrox-orgasm-2003-(front)-butt.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/anata-dismay.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/cvr.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Death_-_Human_-_Front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/thelema6.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Death_-_Symbolic_-_Front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Death_-_Individual_Thought_Patterns_-_Front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/dimmuborgir-abah.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/skydancer.jpg",
];
export function PlayCard({ item, subcaption = "Related tracks" }) {
  const [showPlay, setShowPlay] = useState(false);
  const cover = useRef(sampleCovers[getRandomInteger(sampleCovers.length - 1)]);
  const dispatch = useDispatch();

  return (
    <>
      <div
        style={{ position: "relative", width: "100%" }}
        onMouseEnter={() => setShowPlay(true)}
        onMouseLeave={() => setShowPlay(false)}
      >
        <Image
          src={item.cover || cover.current}
          style={{
            objectFit: "cover",
            width: "174px",
            height: "174px",
            filter: showPlay ? "brightness(90%)" : "none",
            transition: "filter ease-in 60ms",
          }}
        />
        {showPlay ? (
          <div className={styles.playOverlay}>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  startNowPlaying(
                    item.upload ??
                      "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Rise+Of+The+Predator.mp3"
                  )
                );
              }}
              title="Play"
              className={styles.circularPlayBtn}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IoMdPlay
                style={{
                  fontSize: "28px",
                  marginLeft: "3.5px",
                  color: "white",
                }}
              />
            </button>
          </div>
        ) : null}
      </div>
      <div style={{ marginTop: "6px" }}>
        <p className={styles.title}>
          {item.artist} - {item.title}
        </p>
        <p className={styles.subcaption}>{subcaption}</p>
      </div>
    </>
  );
}
