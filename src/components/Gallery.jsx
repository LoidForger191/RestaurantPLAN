import { useEffect, useRef, useState } from "react";
import { img, P } from "../data/site";
import Reveal from "./Reveal";
import Photo from "./Photo";
import "./Gallery.css";

const shots = [
  { id: P.room, alt: "Candle-lit dining room" },
  { id: P.plate, alt: "Plated fish course" },
  { id: P.grill, alt: "Dish from the open fire" },
  { id: P.salad, alt: "Fresh seasonal starter" },
  { id: P.pasta, alt: "Hand-cut pasta course" },
  { id: P.main, alt: "Slow-roasted main course" },
];

export default function Gallery() {
  const [i, setI] = useState(null);
  const ref = useRef(null);
  const n = shots.length;
  const go = (d) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const d = ref.current;
    if (i !== null && !d.open) d.showModal();
    if (i === null && d.open) d.close();
  }, [i]);

  const onKey = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section id="gallery" className="gal section">
      <Reveal>
        <h2>Inside Knightingale</h2>
      </Reveal>
      <div className="mosaic">
        {shots.map((s, k) => (
          <button
            key={s.id}
            className={`m m${k}`}
            onClick={() => setI(k)}
            aria-label={`Open photo: ${s.alt}`}
          >
            <Photo src={img(s.id, 900)} alt={s.alt} />
          </button>
        ))}
      </div>
      <dialog
        ref={ref}
        className="lb"
        aria-label="Photo gallery"
        onClose={() => setI(null)}
        onKeyDown={onKey}
        onClick={(e) => e.target === ref.current && setI(null)}
      >
        {i !== null && (
          <figure key={i}>
            <img src={img(shots[i].id, 1800)} alt={shots[i].alt} />
            <figcaption>
              {shots[i].alt} ({i + 1} of {n})
            </figcaption>
          </figure>
        )}
        <button
          className="lb-x"
          onClick={() => setI(null)}
          aria-label="Close gallery"
        >
          ×
        </button>
        <button
          className="lb-p"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button className="lb-n" onClick={() => go(1)} aria-label="Next photo">
          ›
        </button>
      </dialog>
    </section>
  );
}
