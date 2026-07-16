export function OrnamentDivider() {
  return (
    <svg
      className="ornament-divider"
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 8 H80 M120 8 H200"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <path
        d="M100 2 L106 8 L100 14 L94 8 Z"
        fill="var(--accent)"
      />
      <circle cx="86" cy="8" r="1.6" fill="var(--accent)" opacity="0.6" />
      <circle cx="114" cy="8" r="1.6" fill="var(--accent)" opacity="0.6" />
    </svg>
  );
}

export function CornerFrame() {
  return (
    <svg className="corner-frame" viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M2 14 V6 Q2 2 6 2 H14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
