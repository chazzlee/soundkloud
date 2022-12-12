import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { fetchAllGenres, selectGenres } from "../../genres/store";

export function UploadDropzone() {
  const [dropped, setDropped] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setDropped(true);
    console.log(acceptedFiles);
  }, []);

  const dispatch = useDispatch();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const genres = useSelector(selectGenres);

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  if (dropped) {
    return (
      <div
        style={{
          height: "650px",
          width: "800px",
          border: "1px solid #e5e5e5",
          borderRadius: "3px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 2px 12px -5px rgb(0 0 0 / 10%)",
          position: "relative",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div>
            <label htmlFor="permalink">Permalink</label>
            <input type="text" id="permalink" name="permalink" disabled />
          </div>
          <div>
            <label htmlFor="genre">Genre</label>
            <select name="genre" id="genre">
              <option value=""></option>
            </select>
          </div>
          <div>
            <label htmlFor="tags">Additional tags</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="10" />
          </div>
          <div>
            <label htmlFor="caption">Caption</label>
            <textarea name="caption" id="caption" />
          </div>
          <div>
            <label htmlFor="privacy">Privacy:</label>
            <div>
              <input type="radio" />
              <p>Public</p>
              <p>Anyone will be able to listen to this track</p>
            </div>
            <div>
              <input type="radio" />
              <p>Private</p>
            </div>
          </div>
          <div>
            <p>* Required fields</p>
            <div>
              <button>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "350px",
        width: "800px",
        border: "1px solid #e5e5e5",
        borderRadius: "3px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0 2px 12px -5px rgb(0 0 0 / 10%)",
        position: "relative",
      }}
    >
      <div
        {...getRootProps()}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input {...getInputProps()} />
        <p style={{ fontSize: "20px", color: "#333", lineHeight: "2.6" }}>
          Drag and drop your tracks & albums here
        </p>
        <button
          style={{
            backgroundColor: "var(--primary-orange)",
            color: "#fff",
            fontSize: "1rem",
            padding: "10px 60px",
            border: "1px solid var(--primary-orange)",
            borderRadius: "3px",
          }}
        >
          or choose files to upload
        </button>
      </div>
      <div style={{ marginTop: "16px", marginBottom: "6px" }}>
        <input type="checkbox" />{" "}
        <span
          style={{
            fontSize: "12px",
            verticalAlign: "middle",
            lineHeight: 1.6,
          }}
        >
          Make a playlist when multiple files are selected
        </span>
      </div>
      <div style={{ fontSize: "12px" }}>
        Privacy: <input type="radio" /> Public <input type="radio" /> Private
      </div>
      <div style={{ position: "absolute", bottom: 30 }}>
        <p
          style={{
            fontSize: "12px",
            color: "#333",

            textAlign: "center",
          }}
        >
          Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
        </p>
      </div>
    </div>
  );
}
