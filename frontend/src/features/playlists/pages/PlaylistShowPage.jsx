import "./PlaylistShowPage.css";
import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPlay } from "react-icons/io";
import { fetchPlaylistsAsync, selectPlaylistBySlug } from "../store";
import { FullSpinner } from "../../../components/FullSpinner";
import { Wavesurfer } from "../../tracks/components/Wavesurfer";

function PlayButton() {
  return (
    <button title="Play" aria-label="Play" className="play-btn-lg">
      <IoMdPlay />
    </button>
  );
}

export function PlaylistShowPage() {
  const dispatch = useDispatch();
  const { playlistSlug } = useParams();
  const playlist = useSelector((state) =>
    selectPlaylistBySlug(state, playlistSlug)
  );

  const wavesurfer = useRef(null);

  useEffect(() => {
    // TODO: only dispatch if playlists not loaded
    dispatch(fetchPlaylistsAsync());
  }, [dispatch]);

  useEffect(() => {}, []);

  // TODO: -- error?
  if (!playlist) {
    return <FullSpinner />;
  }

  return (
    <div className="show-layout">
      <section className="show-banner-section">
        <header className="banner-header">
          <PlayButton />
          <div className="banner-heading">
            <div className="banner-title">
              <h2 className="title">{playlist?.slug}</h2>
              <h3 className="subtitle">
                <Link to={`/${playlist.uploader.slug}`}>
                  {playlist.uploader.displayName}
                </Link>
              </h3>
            </div>
            <div className="banner-details">
              <p className="created-at">43 days ago</p>
              <p className="private-badge">Private</p>
            </div>
          </div>
          {/* TODO: set default background if no image */}
          <div className="playlist-cover-background">
            <img
              src={playlist.tracks[0].cover}
              alt={playlist.title}
              width={325}
              height={325}
            />
          </div>
        </header>
        <div className="waveform-container">
          <Wavesurfer
            ref={wavesurfer}
            onLoaded={() => {}}
            track={playlist.tracks[0]}
          />
        </div>
      </section>

      <section className="show-playlist-section">
        <div className="show-playlist-tracks">
          <div className="show-playlist-actions">
            <button>Like</button>
            <button>Edit</button>
          </div>

          <div className="playlist-container">
            <div className="uploader-details">
              <img
                className="uploader-photo"
                src={playlist.uploader.photo}
                alt={playlist.uploader.displayName}
              />
              <Link className="uploader-name" to={`/${playlist.uploader.slug}`}>
                {playlist.uploader.displayName}
              </Link>
            </div>
            <div className="playlist-tracks-list">
              {playlist.tracks.map((track, index) => (
                <div className="playlist-track-row" key={track.id}>
                  <img
                    className="track-image"
                    src={track.cover}
                    alt={track.title}
                  />
                  <p className="track-order">{index + 1}</p>
                  <Link
                    className="track-uploader"
                    to={`/${track.uploader.slug}`}
                  >
                    {track.uploader.displayName}
                  </Link>
                  <span style={{ marginRight: 4, marginLeft: 4 }}>-</span>
                  <p className="track-title">{track.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside>ASIDE</aside>
      </section>
    </div>
  );
}
