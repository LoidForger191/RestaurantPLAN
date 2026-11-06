import { useEffect, useRef } from "react";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
