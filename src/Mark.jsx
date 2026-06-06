export default function Mark({ size = 26, glow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      style={glow ? { filter: "drop-shadow(0 0 6px rgba(52,227,176,.5))" } : undefined}
    >
      <defs>
        <linearGradient id="fthr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34E3B0" />
          <stop offset="1" stopColor="#4D7CFF" />
        </linearGradient>
      </defs>
      {/* vane */}
      <path
        d="M14 3 C20 9 19.5 18 15 25.5 L12.5 26 C8.5 18 8 9 14 3 Z"
        fill="url(#fthr)"
        fillOpacity="0.14"
        stroke="url(#fthr)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* spine */}
      <path d="M14 4.5 L13 25" stroke="#34E3B0" strokeWidth="1.2" strokeLinecap="round" />
      {/* barbs — right */}
      <path d="M13.6 8 L18 6.4 M13.4 12 L18.6 11 M13.2 16 L18 16.4 M13 20 L16.8 21.2"
        stroke="#34E3B0" strokeWidth="0.9" strokeLinecap="round" />
      {/* barbs — left */}
      <path d="M13.4 8 L9.4 6.4 M13.6 12 L8.6 11 M13.8 16 L9 16.4 M13.2 20 L9.6 21.2"
        stroke="#34E3B0" strokeWidth="0.9" strokeLinecap="round" />
      {/* circuit nodes */}
      <circle cx="14" cy="4" r="1.7" fill="#34E3B0" />
      <circle cx="18" cy="6.4" r="1" fill="#4D7CFF" />
      <circle cx="8.6" cy="11" r="1" fill="#4D7CFF" />
      <circle cx="16.8" cy="21.2" r="0.9" fill="#4D7CFF" />
    </svg>
  );
}
