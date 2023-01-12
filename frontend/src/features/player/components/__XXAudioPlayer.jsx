import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PLAYER_STATUS, trackLoaded } from "../store";

export function XXAudioPlayer({ Player }) {
  const dispatch = useDispatch();
  const playerStatus = useSelector((state) => state.player.status);
  const loadedTrack = useSelector((state) => {
    if (state.player.status !== PLAYER_STATUS.PLAYING) {
      return {
        id: state.player.current.sourceId,
        url: state.player.current.sourceUrl,
        totalDuration: state.player.current.totalDuration,
      };
    }
    return {
      id: state.player.next.sourceId,
      url: state.player.next.sourceUrl,
      totalDuration: state.player.next.totalDuration,
    };
  }, shallowEqual);

  return <Player status={playerStatus} track={loadedTrack} />;
}
