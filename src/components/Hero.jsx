import { useEffect, useRef } from "react";
import { img, P } from "../data/site";
import "./Hero.css";

export default function Hero() {
  const bg = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const move = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bg.current)
          bg.current.style.transform = `translate3d(0,${scrollY * 0.25}px,0) scale(1.1)`;
      });
    };
    addEventListener("scroll", move, { passive: true });
    return () => {
      removeEventListener("scroll", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <img
        ref={bg}
        className="hero-bg"
        src={img(P.plate, 1800)}
        alt=""
        onError={(e) => (e.currentTarget.style.opacity = 0)}
      />
      <div className="hero-in">
        <h1>
          Where the sea
          <br />
          <em>meets the grove</em>
        </h1>
        <p className="brush">a table worth lingering at</p>
        <p className="lede">
          Olive-oil-rich plates cooked over open fire and served in a candle-lit
          room in the heart of Lisbon.
        </p>
        <div className="actions">
          <a className="btn btn-solid" href="#menu">
            Explore Menu
          </a>
          <a className="btn btn-ghost" href="#reserve">
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  );
}
