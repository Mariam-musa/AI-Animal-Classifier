import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Computer vision · Transfer learning</p>
          <h1 className="hero__headline">
            See the animal.
            <br />
            Let AI identify it.
          </h1>
          <p className="hero__subtitle">
            Upload an image and our computer vision model will analyze it and
            identify whether it is a cat or a dog.
          </p>
          <div className="hero__stats" role="list">
            <div className="hero__stat" role="listitem">
              <span className="hero__stat-value">MobileNetV2</span>
              <span className="hero__stat-label">Base architecture</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat" role="listitem">
              <span className="hero__stat-value">224×224</span>
              <span className="hero__stat-label">Input resolution</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat" role="listitem">
              <span className="hero__stat-value">2 classes</span>
              <span className="hero__stat-label">Cat · Dog</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="viewfinder">
            <span className="viewfinder__corner viewfinder__corner--tl" />
            <span className="viewfinder__corner viewfinder__corner--tr" />
            <span className="viewfinder__corner viewfinder__corner--bl" />
            <span className="viewfinder__corner viewfinder__corner--br" />
            <div className="viewfinder__grid" />
            <div className="viewfinder__scanline" />
            <span className="viewfinder__tag viewfinder__tag--dog">
              dog <b>0.9995</b>
            </span>
            <span className="viewfinder__tag viewfinder__tag--cat">
              cat <b>0.0005</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
