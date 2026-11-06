import { site } from "../data/site";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Knightingale, I’d like to ask about a reservation.")}`;
  return (
    <a
      className="wa"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 20l1.3-4.2A8 8 0 1 1 8.3 18.8L4 20z" />
        <circle cx="9" cy="12" r=".6" />
        <circle cx="12" cy="12" r=".6" />
        <circle cx="15" cy="12" r=".6" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
