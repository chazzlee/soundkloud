import { useCallback, useState } from "react";
import { Modal } from "../../../../context/Modal";
import { AddToPlaylistHeader } from "./AddToPlaylistHeader";
import { AddToPlaylistTab } from "./Tabs/AddToPlaylistTab";
import { CreatePlaylistTab } from "./Tabs/CreatePlaylistTab";
import { GoToPlaylistTab } from "./Tabs/GoToPlaylistTab";
import "./AddToPlaylist.css";

export const TABS = Object.freeze({
  ADD: "add",
  CREATE: "create",
  SUCCESS: "success",
});

export function AddToPlaylistModal({ track, onClose }) {
  const [tab, setTab] = useState(TABS.ADD);
  const handleTabChange = useCallback((tab) => {
    setTab(tab);
  }, []);

  const [permalink, setPermalink] = useState("");

  const handleSuccess = useCallback((link) => {
    setTab(TABS.SUCCESS);
    setPermalink(link);
  }, []);

  const [trackToAdd, setTrackToAdd] = useState(track);
  const handleRemoveTrackFromPlaylist = useCallback(
    () => setTrackToAdd(null),
    []
  );

  return (
    <Modal onClose={onClose}>
      <div className="add-to-playlist-container">
        <AddToPlaylistHeader tab={tab} onTabChange={handleTabChange} />
        <section className="add-to-playlist-section">
          {tab === TABS.ADD && <AddToPlaylistTab track={trackToAdd} />}
          {tab === TABS.CREATE && (
            <CreatePlaylistTab
              track={trackToAdd}
              onSuccess={handleSuccess}
              onRemove={handleRemoveTrackFromPlaylist}
            />
          )}
          {tab === TABS.SUCCESS && (
            <GoToPlaylistTab track={trackToAdd} permalink={permalink} />
          )}
        </section>
      </div>
    </Modal>
  );
}
