export default function Photo({ src, alt = "", className = "", ...rest }) {
  return (
    <span className={`photo ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(e) => (e.currentTarget.style.opacity = 0)}
        {...rest}
      />
    </span>
  );
}
