import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { IoLinkOutline, IoTrashBinOutline } from "react-icons/io5";
import { RiPlayListAddFill, RiShareForwardBoxLine } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";
import { TfiMoreAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { selectCurrentUser } from "../../auth/store";
import { destroyTrackAsync } from "../store";
import { PlaylistModal } from "./PlaylistModal";
import styles from "./TrackActions.module.css";

export function TrackActions({ track, onEditModalOpen }) {
  const currentUser = useSelector(selectCurrentUser);
  const isUploader = track && track?.uploader.id === currentUser?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const handleLike = () => {
    //TODO: simulation
    setLiked((prev) => !prev);
  };

  const handleRemove = (trackId) => {
    dispatch(destroyTrackAsync(trackId));
    navigate("/discover");
  };

  return (
    <>
      <div className={styles.actionsRow}>
        <div className={styles.actions}>
          {isUploader ? (
            <>
              {/* <button>Share</button> */}
              {/* <button>
              <div>
                <IoLinkOutline style={{ verticalAlign: "middle" }} />
              </div>
              <div>Copy Link</div>
            </button> */}
              <button onClick={onEditModalOpen}>
                <div>
                  <SlPencil style={{ verticalAlign: "middle" }} />
                </div>
                <div>Edit</div>
              </button>
              <button onClick={() => handleRemove(track.id)}>
                <div>
                  <IoTrashBinOutline style={{ verticalAlign: "top" }} />
                </div>
                <div>Remove</div>
              </button>
              <button onClick={() => setShowAddToPlaylist(true)}>
                <div>
                  <RiPlayListAddFill style={{ verticalAlign: "top" }} />
                </div>
                <div>Add to playlist</div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLike}
                className={`${liked ? styles.liked : ""}`}
              >
                <div>
                  <AiOutlineHeart style={{ verticalAlign: "middle" }} />
                </div>
                <div>Like</div>
              </button>
              <button onClick={() => setShowAddToPlaylist(true)}>
                <div>
                  <RiPlayListAddFill style={{ verticalAlign: "top" }} />
                </div>
                <div>Add to playlist</div>
              </button>
              {/* <button>
              <div>
                <BiRepost
                  style={{
                    verticalAlign: "middle",
                    fontSize: "1.1rem",
                  }}
                />
              </div>
              <div>Repost</div>
            </button> */}
              {/* <button>
              <div>
                <RiShareForwardBoxLine
                  style={{ verticalAlign: "middle", fontSize: ".9rem" }}
                />
              </div>
              <div>Share</div>
            </button> */}
              {/* <button>
              <div>
                <IoLinkOutline style={{ verticalAlign: "middle" }} />
              </div>
              <div>Copy Link</div>
            </button> */}
              {/* <button>
              <div>
                <TfiMoreAlt style={{ verticalAlign: "middle" }} />
              </div>
              <div>More</div>
            </button> */}
            </>
          )}
        </div>
        <div className={styles.insights}>
          <div style={{ marginRight: "8px" }}>
            <FaPlay
              fontSize={10}
              style={{ marginRight: "4px", verticalAlign: "sub" }}
            />
            <div>43</div>
          </div>
          <div>
            <AiFillHeart style={{ marginRight: "4px", verticalAlign: "sub" }} />
            <div>4390</div>
          </div>
        </div>
      </div>
      {showAddToPlaylist ? (
        <PlaylistModal
          track={track}
          onClose={() => setShowAddToPlaylist(false)}
        />
      ) : null}
    </>
  );
}
