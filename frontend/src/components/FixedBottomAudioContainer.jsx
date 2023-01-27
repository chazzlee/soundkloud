export function FixedBottomAudioContainer({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 16,
        padding: 0,
        borderTop: "1px solid #cecece",
        backgroundColor: "var(--bg-light)",
      }}
    >
      {children}
    </div>
  );
}
