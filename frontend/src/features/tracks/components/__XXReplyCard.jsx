import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import { destroyReplyAsync, updateReplyAsync } from "../store";
import styles from "../pages/TrackShowPage.module.css";

export function __XXReplyCard({ reply }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(reply.body);

  return (
    <div key={reply.id} className={styles.commentCard}>
      <div style={{ marginRight: "10px" }}>
        <img
          src={
            reply.user.photo ??
            "https://soundkloud-seeds.s3.amazonaws.com/default-profile.jpg"
          }
          alt="Profile Avatar"
          height="40px"
          width="40px"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <div className={styles.commenter}>
          <p>
            {reply.user.displayName} <span>at </span>
            <span>
              {new Date(reply.createdAt).toLocaleTimeString("en-US", {
                timeStyle: "short",
              })}
            </span>
          </p>
          <div>
            {formatDistanceToNow(new Date(reply.createdAt), {
              addSuffix: true,
            })}
            {reply.user.id === currentUser.id && (
              <div style={{ display: "inline-block" }}>
                <span
                  style={{
                    fontSize: 12,
                    border: "1px solid #e5e5e5",
                    padding: "3px 10px",
                    cursor: "pointer",
                    color: "#666",
                    marginLeft: 8,
                    marginRight: 4,
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </span>
                <span
                  style={{
                    fontSize: 12,
                    border: "1px solid #e5e5e5",
                    padding: "3px 10px",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => dispatch(destroyReplyAsync(reply.id))}
                >
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <div style={{ marginTop: 4 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!body) {
                  setBody(reply.body);
                  setIsEditing(false);
                  return;
                }
                const updatedReply = {
                  ...reply,
                  body,
                };
                dispatch(updateReplyAsync(updatedReply));
                setIsEditing(false);
              }}
            >
              <textarea
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={styles.commentContent}
                style={{
                  padding: "8px 4px",
                  borderColor: "#e5e5e5",
                }}
              />
              <div>
                <button
                  style={{
                    fontSize: 12,
                    border: "1px solid #e5e5e5",
                    padding: "3px 10px",
                    cursor: "pointer",
                    color: "#666",
                    background: "white",
                    marginRight: 4,
                  }}
                  type="button"
                  onClick={() => {
                    setBody(reply.body);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    fontSize: 12,
                    border: "1px solid #e5e5e5",
                    padding: "3px 10px",
                    cursor: "pointer",
                    color: "#666",
                    background: "white",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className={styles.commentContent}>{reply.body}</p>
        )}
      </div>
    </div>
  );
}
