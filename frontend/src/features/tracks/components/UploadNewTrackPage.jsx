import { UploadDropzone } from "./UploadDropzone";

export function UploadNewTrackPage() {
  return (
    <div className="full-page" style={{ height: "100vh", overflowY: "hidden" }}>
      <main
        className="page-container"
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UploadDropzone />
      </main>
    </div>
  );
}
