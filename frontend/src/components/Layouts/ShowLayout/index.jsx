import "./ShowLayout.css";
export { Banner, BannerImage } from "./Banner";
export { ShowAside } from "./ShowAside";
export { ShowActions } from "./ShowActions";
export { GridContainer } from "./GridContainer";

export function ShowLayout({ children }) {
  return <main className="show-layout">{children}</main>;
}

export function ShowMain({ children, aside = null }) {
  return (
    <section className="show-main-section">
      <div className="main-inner">{children}</div>
      {aside}
    </section>
  );
}
