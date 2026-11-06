import { useState } from "react";
import "./Calendar.css";

const pad = (n) => String(n).padStart(2, "0");
export const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function Calendar({ value, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const [m, setM] = useState(first);
  const lead = (m.getDay() + 6) % 7;
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const step = (k) => setM(new Date(m.getFullYear(), m.getMonth() + k, 1));

  return (
    <div className="cal">
      <div className="cal-bar">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={m <= first}
          aria-label="Previous month"
        >
          ‹
        </button>
        <strong aria-live="polite">
          {m.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </strong>
        <button type="button" onClick={() => step(1)} aria-label="Next month">
          ›
        </button>
      </div>
      <div className="cal-grid">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} aria-hidden="true">
            {d}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <i key={`b${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const d = new Date(m.getFullYear(), m.getMonth(), i + 1);
          const iso = toISO(d);
          return (
            <button
              type="button"
              key={iso}
              disabled={d < today || d.getDay() === 1}
              aria-pressed={value === iso}
              aria-label={d.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              onClick={() => onChange(iso)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <p className="cal-note">We are closed on Mondays.</p>
    </div>
  );
}
