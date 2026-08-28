import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ClassifierCard from "./components/ClassifierCard";
import ResultsPanel from "./components/ResultsPanel";
import { classifyImage } from "./lib/classify";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | ready | loading | done | error
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFileSelected = useCallback((newFile, error) => {
    if (error) {
      setErrorMessage(error);
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(newFile);
    objectUrlRef.current = url;

    setFile(newFile);
    setPreviewUrl(url);
    setStatus("ready");
    setResult(null);
    setErrorMessage(null);
  }, []);

  const handleReset = useCallback(() => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setResult(null);
    setErrorMessage(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setStatus("loading");
    setErrorMessage(null);
    try {
      const data = await classifyImage(file);
      setResult(data);
      setStatus("done");
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong during analysis.");
      setStatus("error");
    }
  }, [file]);

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="classifier" className="classifier-section">
          <div className="classifier-section__grid">
            <ClassifierCard
              file={file}
              previewUrl={previewUrl}
              status={status}
              errorMessage={errorMessage}
              onFileSelected={handleFileSelected}
              onAnalyze={handleAnalyze}
              onReset={handleReset}
            />
            <ResultsPanel status={status} result={result} errorMessage={errorMessage} />
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-section__inner">
            <span className="about-section__eyebrow">How it works</span>
            <h2>A lightweight transfer-learning pipeline</h2>
            <div className="pipeline">
              {[
                ["Preprocess", "Images are converted to RGB, resized to 224×224, and normalized."],
                ["MobileNetV2", "A pretrained backbone extracts visual features via transfer learning."],
                ["Classify", "A trained head predicts cat or dog with a confidence score."],
                ["Describe", "Gemini generates a short, readable description of the result."],
              ].map(([title, desc], i) => (
                <div className="pipeline__step" key={title}>
                  <span className="pipeline__index">{String(i + 1).padStart(2, "0")}</span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span>🐾 AI Animal Classifier</span>
          <span>Built with React, Vite &amp; MobileNetV2</span>
        </div>
      </footer>
    </>
  );
}

export default App;
