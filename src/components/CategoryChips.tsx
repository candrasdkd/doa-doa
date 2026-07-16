interface Props {
  categories: string[];
  active: string | null;
  onSelect: (kategori: string | null) => void;
}

export function CategoryChips({ categories, active, onSelect }: Props) {
  return (
    <div className="chip-row" role="tablist" aria-label="Filter kategori">
      <button
        className={`chip ${active === null ? 'chip-active' : ''}`}
        onClick={() => onSelect(null)}
        role="tab"
        aria-selected={active === null}
      >
        Semua
      </button>
      {categories.map((kategori) => (
        <button
          key={kategori}
          className={`chip ${active === kategori ? 'chip-active' : ''}`}
          onClick={() => onSelect(kategori)}
          role="tab"
          aria-selected={active === kategori}
        >
          {kategori}
        </button>
      ))}
    </div>
  );
}
