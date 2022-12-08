import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTracks,
  selectAllTracks,
  selectHasTracksLoaded,
  selectIsTracksLoading,
  selectTracksError,
} from "../../tracks/store";
import { Carousel } from "./Carousel";

export function DiscoverPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsTracksLoading);
  const loaded = useSelector(selectHasTracksLoaded);
  const error = useSelector(selectTracksError);
  const tracks = useSelector(selectAllTracks).slice(0, 4);

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
    <div>
      <div>
        <h1>More of what you like</h1>
        {/* TODO: only 20 tracks/playlists needed */}
        <div>
          <Carousel dataList={tracks} subcaption="Related tracks" />
        </div>
      </div>

      <div>
        <h1>Recently Played</h1>
        {/* TODO: only 20 tracks/playlists needed */}
        <div>
          <Carousel dataList={tracks} subcaption="Related tracks" />
        </div>
      </div>
      <div>
        <h1>Next Wav Miami</h1>
        {/* TODO: only 20 tracks/playlists needed */}
        <div>
          <Carousel dataList={tracks} subcaption="Related tracks" />
        </div>
      </div>

      <div>
        <h1>Fresh Pressed</h1>
        {/* TODO: only 20 tracks/playlists needed */}
        <div>
          <Carousel dataList={tracks} subcaption="Related tracks" />
        </div>
      </div>
    </div>
  );
}
