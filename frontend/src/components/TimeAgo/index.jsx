import { formatDistanceToNow } from "date-fns";
import "./TimeAgo.css";

export function TimeAgo({ date }) {
  return (
    <p className="created-at">
      <time>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
        })}
      </time>
    </p>
  );
}
