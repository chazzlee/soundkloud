import { useState } from "react";
import { useDispatch } from "react-redux";
import { replyToTrackAsync } from "../../../tracks/store";
import { CommentAvatar } from "../CommentAvatar";
import "./CommentForm.css";

export function CommentForm({ avatar, trackId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reply = { body: comment };

    dispatch(replyToTrackAsync(trackId, reply));
    setComment("");
  };

  return (
    <div className="comment-form-container">
      <CommentAvatar avatar={avatar} />
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          className="comment-input"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  );
}
