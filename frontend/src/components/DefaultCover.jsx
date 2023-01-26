export function DefaultCover({ size }) {
  return (
    <div
      className="default-cover"
      style={{
        backgroundColor: "#141414",
        backgroundImage:
          "linear-gradient(315deg, #141414 31%, #582605 73%, #ff5600 100%)",
        width: size,
        height: size,
      }}
    />
  );
}
