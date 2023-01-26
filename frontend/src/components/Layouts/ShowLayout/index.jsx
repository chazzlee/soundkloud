import "./ShowLayout.css";
export { Banner, BannerImage } from "./Banner";
export { ShowAside } from "./ShowAside";

export function ShowLayout({ children }) {
  return <main className="show-layout">{children}</main>;
}

export function Main({ children }) {
  return <section className="show-main-section">{children}</section>;
}
