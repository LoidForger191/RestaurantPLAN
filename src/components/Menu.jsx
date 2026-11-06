import { useState } from "react";
import { cats, diets, dishes } from "../data/menu";
import Reveal from "./Reveal";
import Photo from "./Photo";
import DishModal from "./DishModal";
import "./Menu.css";

export default function Menu() {
  const [cat, setCat] = useState(cats[0]);
  const [on, setOn] = useState([]);
  const [dish, setDish] = useState(null);
  const toggle = (t) =>
    setOn((o) => (o.includes(t) ? o.filter((x) => x !== t) : [...o, t]));
  const list = dishes.filter(
    (d) => d.cat === cat && on.every((t) => d.tags.includes(t)),
  );

  return (
    <section id="menu" className="menu section">
      <Reveal>
        <h2>The menu</h2>
      </Reveal>
      <div className="tabs" role="tablist" aria-label="Menu categories">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            id={`tab-${c}`}
            aria-selected={c === cat}
            aria-controls="panel"
            className={c === cat ? "on" : ""}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="diets" role="group" aria-label="Dietary filters">
        {Object.entries(diets).map(([k, v]) => (
          <button
            key={k}
            aria-pressed={on.includes(k)}
            onClick={() => toggle(k)}
          >
            <b>{k}</b> {v}
          </button>
        ))}
      </div>
      <div
        id="panel"
        role="tabpanel"
        aria-labelledby={`tab-${cat}`}
        key={cat + on.join()}
        className="dishes"
      >
        {list.length ? (
          list.map((d) => (
            <button
              key={d.id}
              className="dish"
              aria-haspopup="dialog"
              onClick={() => setDish(d)}
            >
              <Photo src={d.img} />
              <span className="dish-top">
                <span className="dish-name">{d.name}</span>
                <span className="price">€{d.price}</span>
              </span>
              <span className="dish-desc">{d.desc}</span>
              <span className="dish-tags">
                {d.pick && <em>Chef’s pick</em>}
                {d.season && <em>Seasonal</em>}
                {d.tags.map((t) => (
                  <b key={t} title={diets[t]}>
                    {t}
                  </b>
                ))}
              </span>
            </button>
          ))
        ) : (
          <p className="none">
            No dishes match those filters in this category.
          </p>
        )}
      </div>
      <p className="note">
        Select a dish for full details and allergens. Please tell us about any
        allergies before ordering.
      </p>
      <DishModal dish={dish} onClose={() => setDish(null)} />
    </section>
  );
}
