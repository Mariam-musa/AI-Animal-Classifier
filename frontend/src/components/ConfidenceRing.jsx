import "./ConfidenceRing.css";

/**
 * Circular progress ring showing the model's confidence for the winning class.
 * @param {number} value - confidence between 0 and 1
 */
export default function ConfidenceRing({ value }) {
  const size = 128;
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value));
  const offset = circumference * (1 - pct);

  return (
    <div className="confidence-ring" role="img" aria-label={`Confidence ${(pct * 100).toFixed(2)}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <circle
          className="confidence-ring__value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="confidence-ring__center">
        <span className="confidence-ring__number">{(pct * 100).toFixed(2)}</span>
        <span className="confidence-ring__percent">%</span>
      </div>
    </div>
  );
}
