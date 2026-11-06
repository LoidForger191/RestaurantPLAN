import Reveal from "./Reveal";
import "./Testimonials.css";

const quotes = [
  [
    "An evening that felt like a holiday. The fire-roasted bream alone is worth the journey.",
    "Marta L.",
    "Anniversary dinner",
  ],
  [
    "Warm, generous and beautifully paced. Order the olive oil cake without hesitation.",
    "James and Priya",
    "Birthday lunch",
  ],
  [
    "Quietly the most elegant room in the city, with food that tastes of real places.",
    "Sofia R.",
    "Weekend regular",
  ],
];

export default function Testimonials() {
  return (
    <section className="tst section" aria-labelledby="tst-h">
      <Reveal>
        <h2 id="tst-h">What guests say</h2>
      </Reveal>
      <div className="tst-grid">
        {quotes.map(([q, name, note], i) => (
          <Reveal as="figure" key={name} delay={i * 120}>
            <blockquote>“{q}”</blockquote>
            <figcaption>
              {name}
              <span>{note}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
