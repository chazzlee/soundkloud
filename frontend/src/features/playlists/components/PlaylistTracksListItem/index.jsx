import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TrackCover } from "../../../../components/TrackCover";
import { playSelected, selectCurrentPlaylistTrack } from "../../store";
import "./PlaylistTracksListItem.css";

//TODO: refactor with ProfileItemCard
export function PlaylistTracksListItem({ playlistId, order, track }) {
  const dispatch = useDispatch();

  const handlePlaySelected = useCallback(
    ({ index, selectedTrack, playlistId }) => {
      dispatch(playSelected({ index, selectedTrack, playlistId }));
    },
    [dispatch]
  );

  const currentPlaylistTrack = useSelector(
    selectCurrentPlaylistTrack,
    shallowEqual
  );

  const isSelected = (trackId) => currentPlaylistTrack?.id === trackId;

  return (
    <div
      className={`playlist-track-row ${isSelected(track.id) ? "selected" : ""}`}
      onClick={() => {
        // TODO: FIXME:!!!!
        handlePlaySelected({
          index: order - 1,
          selectedTrack: track,
          playlistId: playlistId,
        });
        // if (index === 0) {
        //   handleStartPlaylist(playlist);
        // } else {
        //   handlePlaySelected({
        //     index,
        //     selectedTrack: track,
        //     playlistId: playlist.id,
        //   });
        // }
      }}
    >
      <TrackCover coverUrl={track.cover} alt={track.title} size={30} />
      <p className="track-order">{order}</p>
      <Link
        className="track-uploader"
        to={`/${track.uploader.slug}`}
        aria-label="View uploader"
        onClick={(e) => e.stopPropagation()}
      >
        {track.uploader.displayName}
      </Link>
      <span style={{ margin: "0 4px", color: "#333" }}>-</span>
      <Link
        className="track-title"
        to={track.permalink}
        aria-label="View track"
        onClick={(e) => e.stopPropagation()}
      >
        [{track.artist}] {track.title}
      </Link>
    </div>
  );
}
