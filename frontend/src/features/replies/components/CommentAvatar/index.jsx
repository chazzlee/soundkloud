import "./CommentAvatar.css";

export function CommentAvatar({ avatar, rounded = false }) {
  return avatar ? (
    <img
      className="avatar"
      src={avatar}
      alt="Profile Avatar"
      style={{ borderRadius: rounded ? "50%" : "none" }}
    />
  ) : (
    <div
      className="avatar"
      style={{ borderRadius: rounded ? "50%" : "none" }}
    />
  );
}
