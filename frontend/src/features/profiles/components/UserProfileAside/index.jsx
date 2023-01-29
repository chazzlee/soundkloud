import { Aside } from "../../../../components/Aside";
import "./UserProfileAside.css";

export function UserProfileAside() {
  return (
    <Aside
      style={{
        marginTop: 48.69,
        borderTop: "1px solid #f2f2f2",
        paddingTop: 12,
      }}
    >
      <header className="profile-aside-header">
        <InsightBox title="Followers" stat={34} />
        <InsightBox title="Following" stat={20} />
        <InsightBox title="Tracks" stat={9} />
      </header>
    </Aside>
  );
}

function InsightBox({ title, stat }) {
  return (
    <div className="insight-box">
      <h3 className="insight-heading">{title}</h3>
      <p className="insight-stat">{stat}</p>
    </div>
  );
}
