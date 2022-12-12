import { UploadDropzone } from "./UploadDropzone";

export function UploadNewTrackPage() {
  return (
    <div className="full-page">
      <main
        className="page-container"
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <UploadDropzone />
      </main>
    </div>
  );
}
