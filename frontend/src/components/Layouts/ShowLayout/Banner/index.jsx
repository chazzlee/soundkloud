import { DefaultCover } from "../../../DefaultCover";

export function Banner({ children, height = 380 }) {
  return (
    <section className="banner-section" style={{ height }}>
      {children}
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
