import styles from "./PlayCard.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { Image } from "pure-react-carousel";
import {
  GLOBAL_PLAYER,
  PLAYER_STATUS,
  selectPlayerSourceId,
  selectPlayerStatus,
  trackLoaded,
  trackPaused,
  trackPlaying,
} from "../../player/store";

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

// TODO: PLAY from playcard
// FIXME: styles ---pause button ICON
export function PlayCard({ item, subcaption = "Related tracks" }) {
  const [showControl, setShowControl] = useState(false);
  const cover = useRef(sampleCovers[getRandomInteger(sampleCovers.length - 1)]);
  const dispatch = useDispatch();
  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );
  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );

  const isPlaying =
    globalStatus === PLAYER_STATUS.PLAYING && item.id === globalSourceId;

  const isNotPlaying = [
    PLAYER_STATUS.IDLE,
    PLAYER_STATUS.LOADED,
    PLAYER_STATUS.PAUSED,
  ].includes(globalStatus);

  const isNotSame = globalSourceId !== item.id;

  const handlePlay = (event) => {
    event.preventDefault();
    if (item.id === globalSourceId) {
      dispatch(trackPlaying(item.id));
    } else {
      dispatch(trackLoaded({ id: item.id, url: item.upload, duration: null }));
    }
  };

  const handlePause = (event) => {
    event.preventDefault();
    dispatch(trackPaused());
  };

  return (
    <>
      <div
        className={styles.container}
        onMouseEnter={() => setShowControl(true)}
        onMouseLeave={() => setShowControl(false)}
      >
        <Image
          src={item.cover || cover.current}
          className={styles.coverImage}
          style={{ filter: showControl ? "brightness(90%)" : "none" }}
        />
        {showControl ? (
          <div className={styles.playOverlay}>
            {(isNotPlaying || isNotSame) && (
              <button
                onClick={handlePlay}
                title="Play"
                className={styles.circularPlayBtn}
              >
                <IoMdPlay className={styles.playIcon} />
              </button>
            )}
            {isPlaying && (
              <button
                onClick={handlePause}
                title="Pause"
                className={styles.circularPlayBtn}
              >
                <IoMdPause className={styles.pauseIcon} />
              </button>
            )}
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
