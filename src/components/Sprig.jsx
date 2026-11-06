export default function Sprig() {
  return (
    <svg className="sprig" viewBox="0 0 60 160" fill="none" aria-hidden="true">
      <path
        d="M30 158C30 100 32 50 36 4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {[20, 45, 70, 95, 120].map((y, i) => {
        const x = i % 2 ? 18 : 44;
        return (
          <ellipse
            key={y}
            cx={x}
            cy={y}
            rx="12"
            ry="4.5"
            transform={`rotate(${i % 2 ? -35 : 35} ${x} ${y})`}
            fill="currentColor"
            opacity=".55"
          />
        );
      })}
    </svg>
  );
}
