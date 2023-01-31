import { formatDistanceToNow } from "date-fns/esm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyReplyAsync, updateReplyAsync } from "../../../tracks/store";
import { selectCurrentUser } from "../../../auth/store";
import { CommentAvatar } from "../CommentAvatar";
import "./CommentItem.css";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { register, reset, handleSubmit } = useForm({
    defaultValues: { body: comment.body },
  });
  const isOwner = currentUser?.id === comment.user.id;
  const [isEditing, setIsEditing] = useState(false);
  const handleEditMode = useCallback(() => {
    reset({ body: comment.body });
    setIsEditing((prev) => !prev);
  }, [reset, comment.body]);

  const handleDeleteReply = useCallback(
    (commentId) => {
      dispatch(destroyReplyAsync(commentId));
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    (data) => {
      const updatedComment = { ...comment, body: data.body };
      dispatch(updateReplyAsync(updatedComment));
      setIsEditing(false);
      reset({ body: comment.body });
    },
    [dispatch, comment, reset]
  );

  return (
    <li className="comment-feed-list-item">
      <CommentAvatar avatar={comment.user.photo} rounded={true} />
      <div className="comment-item">
        <div className="comment-user">
          <h5>
            {comment.user.displayName} <span className="at">at</span>{" "}
            <span className="posted-at-time">3:30</span>
          </h5>

          <div>
            <p className="posted-at-date">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
            {isOwner && (
              <div className="comment-actions">
                {isEditing ? (
                  <>
                    <button
                      className="comment-action-btn mr-2"
                      type="button"
                      onClick={handleEditMode}
                    >
                      Cancel
                    </button>
                    <button
                      className="comment-action-btn save"
                      type="submit"
                      form="comment-form"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="comment-action-btn mr-2"
                      type="button"
                      onClick={handleEditMode}
                    >
                      Edit
                    </button>
                    <button
                      className="comment-action-btn delete"
                      type="button"
                      onClick={() => handleDeleteReply(comment.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <form
            className="comment-body-form"
            id="comment-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <textarea
              name="body"
              id="body"
              className="comment-body-textarea"
              autoFocus
              {...register("body")}
            />
          </form>
        ) : (
          <p>{comment.body}</p>
        )}
      </div>
    </li>
  );
}
