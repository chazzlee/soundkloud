export function FixedBottomAudioContainer({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 14,
        padding: 0,
        borderTop: "1px solid #cecece",
      }}
    >
      {children}
    </div>
  );
}
