import { FaCommentAlt } from "react-icons/fa";
import { pluralize } from "../../../../utils/pluralize";
import { CommentItem } from "../CommentItem";
import "./CommentFeed.css";

export function CommentFeed({ comments = [] }) {
  return (
    <div className="comment-feed-container">
      <header className="comment-feed-header">
        <FaCommentAlt />
        <span className="comment-count">
          {comments.length} {pluralize(comments.length, "comment")}
        </span>
      </header>
      <ul className="comment-feed-list">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
