import { useCallback } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { DefaultCover } from "../../../../../components/DefaultCover";
import {
  addToPlaylistAsync,
  removeFromPlaylistAsync,
  selectIsTrackInPlaylist,
} from "../../../store";
import "./ListItems.css";

export function Playlist({ track, playlist }) {
  const dispatch = useDispatch();

  const isTrackInPlaylist = useSelector((state) =>
    selectIsTrackInPlaylist(state, {
      playlistId: playlist.id,
      trackId: track.id,
    })
  );

  const handleAddToPlaylist = useCallback(() => {
    dispatch(addToPlaylistAsync(playlist.id, track));
  }, [dispatch, playlist.id, track]);

  const handleRemoveFromPlaylist = useCallback(() => {
    dispatch(removeFromPlaylistAsync(playlist.id, track.id));
  }, [dispatch, playlist.id, track.id]);

  return (
    <div className="playlist-row-container">
      {playlist.cover ? (
        <img
          className="playlist-cover"
          src={playlist.cover}
          alt={playlist.title}
        />
      ) : (
        <div className="playlist-cover">
          <DefaultCover size={50} />
        </div>
      )}
      <div className="playlist-row-inner-container">
        <div className="playlist-row-details">
          <h4>{playlist.title}</h4>
          <div className="playlist-row-plays">
            <BsSoundwave /> <span>{playlist.plays}</span>
          </div>
        </div>
        <div className="playlist-row-action">
          {playlist.privacy === "private" && <AiFillLock />}
          {isTrackInPlaylist ? (
            <button
              className="add-to-playlist-btn added"
              onClick={handleRemoveFromPlaylist}
            >
              Added
            </button>
          ) : (
            <button
              className="add-to-playlist-btn"
              onClick={handleAddToPlaylist}
            >
              Add to playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
