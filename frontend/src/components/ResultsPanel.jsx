import ConfidenceRing from "./ConfidenceRing";
import "./ResultsPanel.css";

const LABEL_META = {
  dog: { emoji: "🐶", name: "Dog" },
  cat: { emoji: "🐱", name: "Cat" },
};

function confidenceTier(value) {
  if (value >= 0.9) return { text: "High confidence", tone: "success" };
  if (value >= 0.7) return { text: "Moderate confidence", tone: "warning" };
  return { text: "Low confidence", tone: "danger" };
}

function EmptyState() {
  return (
    <div className="results-panel results-panel--empty">
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <p className="empty-state__title">Results will appear here</p>
        <p className="empty-state__subtitle">
          Upload an image and run the analysis to see the predicted class,
          confidence score, and a short description of the animal.
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="results-panel">
      <div className="skeleton skeleton--row">
        <div className="skeleton__ring" />
        <div className="skeleton__lines">
          <div className="skeleton__line skeleton__line--w60" />
          <div className="skeleton__line skeleton__line--w40" />
        </div>
      </div>
      <div className="skeleton__block" />
    </div>
  );
}

export default function ResultsPanel({ status, result, errorMessage }) {
  if (status === "error") {
    return (
      <div className="results-panel">
        <div className="result-error">
          <p className="result-error__title">Analysis failed</p>
          <p className="result-error__detail">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (status === "loading") return <LoadingState />;

  if (status !== "done" || !result) return <EmptyState />;

  const meta = LABEL_META[result.label] ?? { emoji: "❓", name: result.label };
  const tier = confidenceTier(result.confidence);

  return (
    <div className="results-panel results-panel--done">
      <div className="prediction-block">
        <div className="prediction-block__info">
          <span className="prediction-block__eyebrow">Prediction</span>
          <p className="prediction-block__value">
            <span aria-hidden="true">{meta.emoji}</span> {meta.name}
          </p>
          <span className={`confidence-tag confidence-tag--${tier.tone}`}>
            {tier.text}
          </span>
        </div>
        <ConfidenceRing value={result.confidence} />
      </div>

      <div className="about-card">
        <h3>About this animal</h3>
        <p className="about-card__body">{result.description}</p>
      </div>
    </div>
  );
}
