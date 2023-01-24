import { useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectCurrentlyPlaying } from "../../store";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { selectPlaylistById } from "../../../playlists/store";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import useOnClickOutside from "use-onclickoutside";

export function NowPlaying({ playlistId }) {
  const activePlaylist = useSelector(
    (state) => selectPlaylistById(state, playlistId),
    shallowEqual
  );

  const currentTrack = useSelector(selectCurrentlyPlaying);
  const [nextUpOpen, setNextUpOpen] = useState(false);

  const handleToggle = useCallback(() => setNextUpOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setNextUpOpen(false), []);

  const nextUpRef = useRef(null);

  //FIXME:
  // useOnClickOutside(nextUpRef, handleClose);

  return (
    <div className="currently-playing-container">
      <div className="currently-playing">
        <div className="cover-image">
          <img
            src={currentTrack?.cover}
            alt={currentTrack?.title}
            height={30}
            width={30}
          />
        </div>
        <Link className="track-details" to={currentTrack?.permalink}>
          <p className="artist">{currentTrack?.artist}</p>
          <p className="title">{currentTrack?.title}</p>
        </Link>
        <div className="currently-playing-actions">
          <button type="button" onClick={handleToggle}>
            <MdOutlinePlaylistPlay />
          </button>
          <button type="button" onClick={handleToggle}>
            <MdOutlinePlaylistPlay />
          </button>
          <button type="button" onClick={handleToggle}>
            <MdOutlinePlaylistPlay />
          </button>
        </div>
      </div>
      {nextUpOpen ? (
        <div className="next-up" ref={nextUpRef}>
          <h3>Next up</h3>
          <ul>
            {activePlaylist?.tracks.map((track) => (
              <li
                key={track.id}
                style={{
                  fontWeight: currentTrack.id === track.id ? "bold" : "normal",
                }}
              >
                {track.artist} - {track.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
