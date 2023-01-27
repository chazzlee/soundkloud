import { DefaultCover } from "../../../DefaultCover";
import "./Banner.css";

export function Banner({ children, header, height = 380 }) {
  return (
    <section className="banner-section" style={{ height }}>
      <header className="banner-header">{header}</header>
      <div className="waveform-container">{children}</div>
    </section>
  );
}

export function BannerImage({ imageUrl, size = 325, alt = "Banner Cover" }) {
  return (
    <div className="cover-background">
      {imageUrl ? (
        <img src={imageUrl} alt={alt} width={size} height={size} />
      ) : (
        <DefaultCover size={size} />
      )}
    </div>
  );
}
