import { useCallback, useRef, useState } from "react";
import "./ClassifierCard.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ClassifierCard({
  file,
  previewUrl,
  status, // "idle" | "ready" | "loading" | "done" | "error"
  errorMessage,
  onFileSelected,
  onAnalyze,
  onReset,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (fileList) => {
      const candidate = fileList?.[0];
      if (!candidate) return;
      if (!ACCEPTED_TYPES.includes(candidate.type)) {
        onFileSelected(null, "Please upload a JPG or PNG image.");
        return;
      }
      onFileSelected(candidate, null);
    },
    [onFileSelected]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const isBusy = status === "loading";

  return (
    <div className="classifier-card">
      <div className="classifier-card__header">
        <h3>Upload image</h3>
        <p>A clear photo of a single cat or dog works best.</p>
      </div>

      {!file && (
        <div
          className={`dropzone ${isDragging ? "dropzone--active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="dropzone__icon" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16V4M12 4L7 9M12 4l5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="dropzone__title">Drop your image here</p>
          <p className="dropzone__subtitle">or browse from your device</p>
          <span className="dropzone__formats">Supported formats: JPG, JPEG, PNG</span>
        </div>
      )}

      {errorMessage && !file && <p className="classifier-card__error">{errorMessage}</p>}

      {file && (
        <div className="preview">
          <div className={`preview__frame ${isBusy ? "preview__frame--scanning" : ""}`}>
            <img src={previewUrl} alt="Uploaded preview for classification" />
            <span className="preview__corner preview__corner--tl" />
            <span className="preview__corner preview__corner--tr" />
            <span className="preview__corner preview__corner--bl" />
            <span className="preview__corner preview__corner--br" />
            {isBusy && <span className="preview__scanline" />}
          </div>

          <div className="preview__meta">
            <div className="preview__meta-text">
              <p className="preview__filename" title={file.name}>{file.name}</p>
              <p className="preview__filedetail">
                {file.type.split("/")[1]?.toUpperCase()} · {formatBytes(file.size)}
              </p>
            </div>
            <button
              type="button"
              className="preview__replace"
              onClick={onReset}
              disabled={isBusy}
            >
              Replace image
            </button>
          </div>

          <button
            type="button"
            className="analyze-button"
            onClick={onAnalyze}
            disabled={isBusy || status === "done"}
          >
            {isBusy ? (
              <>
                <span className="analyze-button__spinner" aria-hidden="true" />
                Analyzing...
              </>
            ) : status === "done" ? (
              "Analysis complete"
            ) : (
              "Analyze Image"
            )}
          </button>

          {status === "error" && (
            <p className="classifier-card__error">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
