interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="var(--ink-faint)" strokeWidth="2" />
        <path d="M20 20L16.5 16.5" stroke="var(--ink-faint)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        inputMode="search"
        placeholder="Cari doa, mis. sebelum makan..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Cari doa"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Hapus pencarian"
        >
          &times;
        </button>
      )}
    </div>
  );
}
