import Reveal from "./Reveal";
import Photo from "./Photo";
import Sprig from "./Sprig";
import { img, P } from "../data/site";
import "./Story.css";

export default function Story() {
  return (
    <section id="story" className="story section">
      <Reveal className="story-img">
        <Photo
          src={img(P.room, 1000)}
          alt="The candle-lit dining room at Knightingale"
        />
      </Reveal>
      <div>
        <Reveal>
          <h2>Olive groves, open fire and slow evenings</h2>
        </Reveal>
        <Reveal delay={120}>
          <p>
            Knightingale began with one idea: cook the way the coast eats. Fish from the
            morning boats, vegetables from neighbouring farms and olive oil
            pressed down the road, all finished over a wood fire and served to
            share.
          </p>
        </Reveal>
        <Reveal delay={240} className="facts">
          <div>
            <b>Wood</b>
            <span>fired every day</span>
          </div>
          <div>
            <b>12</b>
            <span>seasonal plates</span>
          </div>
          <div>
            <b>100%</b>
            <span>local olive oil</span>
          </div>
        </Reveal>
        <Sprig />
      </div>
    </section>
  );
}
