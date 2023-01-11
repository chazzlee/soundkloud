export function FixedBottomAudioContainer({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 2,
        padding: 0,
        border: "1px solid #cecece",
      }}
    >
      {children}
    </div>
  );
}
