import { useRef } from "react";
import { getRandomRGB } from "../../../../utils/getRandomRGB";
import { DefaultCover } from "../../../DefaultCover";
import { bannerTitleFontSize } from "../../../../utils/bannerTitleFontSize";
import "./Banner.css";

export function Banner({ children, header, height = 380 }) {
  const rgbBackground = useRef(getRandomRGB());

  return (
    <section
      className="banner-section"
      style={{
        height,
        background: `linear-gradient(135deg, ${rgbBackground.current} 0%, rgb(11, 10, 10) 100%)`,
      }}
    >
      <header className="banner-header">{header}</header>
      <div className="waveform-container">{children}</div>
    </section>
  );
}

export function BannerTitleHeading({ title }) {
  return (
    <h2
      className="title"
      style={{
        fontSize: bannerTitleFontSize(title.length),
      }}
    >
      {title}
    </h2>
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
