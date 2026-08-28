import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__mark" aria-hidden="true">🐾</span>
          <span className="header__name">AI Animal Classifier</span>
        </div>
        <nav className="header__nav" aria-label="Primary">
          <a href="#classifier">Classifier</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}
