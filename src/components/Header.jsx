import { useEffect, useState } from "react";
import { site } from "../data/site";
import "./Header.css";

const links = [
  ["story", "Our story"],
  ["signature", "Signatures"],
  ["menu", "Menu"],
  ["gallery", "Gallery"],
  ["reserve", "Reserve"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={`hd${solid ? " solid" : ""}${open ? " open" : ""}`}>
      <a className="logo" href="#top" aria-label={`${site.name}, back to top`}>
        {site.name}
      </a>
      <button
        className="burger"
        aria-expanded={open}
        aria-controls="nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav id="nav" className={open ? "open" : ""} aria-label="Primary">
        {links.map(([id, t]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "on" : ""}
            onClick={() => setOpen(false)}
          >
            {t}
          </a>
        ))}
      </nav>
    </header>
  );
}
