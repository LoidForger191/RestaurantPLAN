import { dishes } from "../data/menu";
import Reveal from "./Reveal";
import Photo from "./Photo";
import "./Signature.css";

export default function Signature() {
  const picks = dishes.filter((d) => d.pick);
  const season = dishes.filter((d) => d.season);
  return (
    <section id="signature" className="sig section">
      <Reveal>
        <h2>Dishes we’re known for</h2>
      </Reveal>
      <div className="sig-grid">
        {picks.map((d, i) => (
          <Reveal as="article" key={d.id} delay={i * 120} className="sig-card">
            <Photo src={d.img} alt={d.name} />
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
            <span className="price">€{d.price}</span>
          </Reveal>
        ))}
      </div>
      <Reveal className="season">
        <h3 className="brush">This season</h3>
        <ul>
          {season.map((d) => (
            <li key={d.id}>
              <span>{d.name}</span>
              <i />
              <span className="price">€{d.price}</span>
            </li>
          ))}
        </ul>
        <a className="btn btn-solid" href="#menu">
          Explore Menu
        </a>
      </Reveal>
    </section>
  );
}
