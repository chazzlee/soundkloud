import styles from "./PlayCard.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPlay } from "react-icons/io";
import { Image } from "pure-react-carousel";
import {
  selectNowPlayingSource,
  selectPlayingStatus,
  startNowPlaying,
  switchTrack,
} from "../../tracks/store";

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
const sampleDefaultSource1 =
  "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Demonic+Incarnate.mp3";
const sampleDefaultSource2 =
  "https://soundkloud-seeds.s3.amazonaws.com/tracks/01.+Wolf.mp3";

export function PlayCard({ item, subcaption = "Related tracks" }) {
  const [showPlay, setShowPlay] = useState(false);
  const cover = useRef(sampleCovers[getRandomInteger(sampleCovers.length - 1)]);
  const dispatch = useDispatch();
  const nowPlaying = useSelector(selectNowPlayingSource);
  const playingStatus = useSelector(selectPlayingStatus);

  const handlePlay = (event) => {
    event.preventDefault();
    if (nowPlaying) {
      dispatch(switchTrack(item.upload ?? sampleDefaultSource1));
    } else {
      dispatch(startNowPlaying(item.upload ?? sampleDefaultSource2));
    }
  };

  return (
    <>
      <div
        className={styles.container}
        onMouseEnter={() => setShowPlay(true)}
        onMouseLeave={() => setShowPlay(false)}
      >
        <Image
          src={item.cover || cover.current}
          className={styles.coverImage}
          style={{ filter: showPlay ? "brightness(90%)" : "none" }}
        />
        {showPlay ? (
          <div className={styles.playOverlay}>
            <button
              onClick={handlePlay}
              title="Play"
              className={styles.circularPlayBtn}
            >
              <IoMdPlay className={styles.playIcon} />
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          {item.artist} - {item.title}
        </p>
        <p className={styles.subcaption}>{subcaption}</p>
      </div>
    </>
  );
}
