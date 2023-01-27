import { formatDistanceToNow } from "date-fns";
import "./TimeAgo.css";

export function TimeAgo({ date }) {
  return (
    <p className="created-at">
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })}
    </p>
  );
}
