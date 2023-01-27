import { formatDistanceToNow } from "date-fns/esm";
import { CommentAvatar } from "../CommentAvatar";
import "./CommentItem.css";

export function CommentItem({ comment }) {
  return (
    <li className="comment-feed-list-item">
      <CommentAvatar avatar={comment.user.photo} rounded={true} />
      <div className="comment-item">
        <div className="comment-user">
          <h5>
            {comment.user.displayName} <span className="at">at</span>{" "}
            <span className="posted-at-time">3:30pm</span>
          </h5>
          <p className="posted-at-date">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <p>{comment.body}</p>
      </div>
    </li>
  );
}
