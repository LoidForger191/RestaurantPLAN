import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import Calendar, { toISO } from "./Calendar";
import { site } from "../data/site";
import "./Reservation.css";

const dinner = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];
const lunch = ["12:30", "13:00", "13:30", "14:00", "14:30"];
const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT;
const blank = { name: "", email: "", phone: "", notes: "" };
const nice = (iso) =>
  new Date(`${iso}T12:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export default function Reservation() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState(2);
  const [f, setF] = useState(blank);
  const [err, setErr] = useState({});
  const [st, setSt] = useState({ s: "idle" });

  const slots = useMemo(() => {
    if (!date) return [];
    const day = new Date(`${date}T12:00`).getDay();
    const all =
      day === 0
        ? lunch
        : day === 5 || day === 6
          ? [...lunch, ...dinner]
          : dinner;
    const now = new Date();
    const passed = date === toISO(now) ? now.toTimeString().slice(0, 5) : "";
    return all.map((t) => ({ t, off: t <= passed }));
  }, [date]);

  const pickDate = (v) => {
    setDate(v);
    setTime("");
    setErr((e) => ({ ...e, date: "", time: "" }));
  };

  const check = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email))
      e.email = "Enter a valid email address.";
    if (f.phone && !/^\+?[\d\s()-]{7,}$/.test(f.phone))
      e.phone = "Enter a valid phone number.";
    if (!date) e.date = "Choose a date.";
    else if (!time) e.time = "Choose a time.";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = check();
    setErr(e);
    if (Object.keys(e).length) return;
    if (!endpoint)
      return setSt({
        s: "error",
        m: `Online booking isn’t connected yet. Please call ${site.phone} or message us on WhatsApp.`,
      });
    setSt({ s: "sending" });
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...f, date, time, party }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setSt({ s: "done" });
    } catch {
      setSt({
        s: "error",
        m: "We couldn’t send your request. Please try again, or message us on WhatsApp.",
      });
    }
  };

  const field = (k, label, extra = {}) => (
    <label className="fld">
      {label}
      <input
        value={f[k]}
        onChange={(e) => setF({ ...f, [k]: e.target.value })}
        aria-invalid={!!err[k]}
        aria-describedby={err[k] ? `e-${k}` : undefined}
        {...extra}
      />
      {err[k] && (
        <small id={`e-${k}`} role="alert">
          {err[k]}
        </small>
      )}
    </label>
  );

  return (
    <section id="reserve" className="res section">
      <Reveal>
        <h2>Reserve a table</h2>
        <p className="brush">we’ll save you a seat</p>
      </Reveal>
      {st.s === "done" ? (
        <div className="done" role="status">
          <h3>Thank you, {f.name.trim().split(" ")[0]}.</h3>
          <p>
            Your request for {party} {party === 1 ? "guest" : "guests"} on{" "}
            {nice(date)} at {time} has been sent. We’ll confirm by email to{" "}
            {f.email}.
          </p>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setSt({ s: "idle" });
              setDate("");
              setTime("");
              setF(blank);
            }}
          >
            Make another request
          </button>
        </div>
      ) : (
        <form className="res-form" onSubmit={submit} noValidate>
          <fieldset>
            <legend>1. Date</legend>
            <Calendar value={date} onChange={pickDate} />
            {err.date && <small role="alert">{err.date}</small>}
          </fieldset>
          <fieldset>
            <legend>2. Time</legend>
            {slots.length ? (
              <div className="chips">
                {slots.map((s) => (
                  <button
                    type="button"
                    key={s.t}
                    disabled={s.off}
                    aria-pressed={time === s.t}
                    onClick={() => setTime(s.t)}
                  >
                    {s.t}
                  </button>
                ))}
              </div>
            ) : (
              <p className="hint">Choose a date to see our seatings.</p>
            )}
            {err.time && <small role="alert">{err.time}</small>}
          </fieldset>
          <fieldset>
            <legend>3. Guests</legend>
            <div className="chips">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button
                  type="button"
                  key={n}
                  aria-pressed={party === n}
                  aria-label={`${n} ${n === 1 ? "guest" : "guests"}`}
                  onClick={() => setParty(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="hint">
              Parties of nine or more: please message us on WhatsApp.
            </p>
          </fieldset>
          <fieldset>
            <legend>4. Your details</legend>
            {field("name", "Full name", {
              autoComplete: "name",
              required: true,
            })}
            {field("email", "Email", {
              type: "email",
              autoComplete: "email",
              required: true,
            })}
            {field("phone", "Phone (optional)", {
              type: "tel",
              autoComplete: "tel",
            })}
            {field("notes", "Allergies or occasion (optional)")}
            <button className="btn btn-solid" disabled={st.s === "sending"}>
              {st.s === "sending" ? "Sending…" : "Request reservation"}
            </button>
            {st.s === "error" && (
              <p className="fail" role="alert">
                {st.m}
              </p>
            )}
          </fieldset>
        </form>
      )}
    </section>
  );
}
