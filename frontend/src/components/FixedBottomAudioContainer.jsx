export function FixedBottomAudioContainer({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 12,
        padding: 0,
        border: "1px solid #cecece",
        // visibility: "hidden"
      }}
    >
      {children}
    </div>
  );
}
