export function DefaultCover({ size }) {
  return (
    <div
      className="default-cover"
      style={{
        backgroundColor: "#711003",
        backgroundImage:
          "linear-gradient(43deg, #711003 0%, #c74f0f 46%, #f0c25e 100%)",
        width: size,
        height: size,
      }}
    />
  );
}
