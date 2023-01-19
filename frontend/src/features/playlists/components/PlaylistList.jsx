import styles from "../../profiles/pages/UserProfilePage.module.css";

export function PlaylistList({ playlists }) {
  return (
    <div>
      <h3 className={styles.uploadedTitle}>Playlists</h3>
      <div className={styles.trackCards}>
        {playlists?.map((playlist) => (
          <div key={playlist.id}>
            <h3>{playlist.title}</h3>
            <ul>
              {playlist.tracks.map((track) => (
                <li key={track.id}>{track.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
