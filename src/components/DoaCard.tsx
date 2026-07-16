import type { Doa } from '../types';

interface Props {
  doa: Doa;
  isFavorite: boolean;
  isSelected?: boolean;
  onOpen: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function DoaCard({ doa, isFavorite, isSelected = false, onOpen, onToggleFavorite }: Props) {
  return (
    <div
      className={`doa-card ${isSelected ? 'doa-card-selected' : ''}`}
      onClick={() => onOpen(doa.id)}
      role="listitem button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(doa.id)}
      aria-current={isSelected ? 'true' : undefined}
    >
      <div className="doa-card-main">
        <span className="doa-card-kategori">{doa.kategori}</span>
        <h3 className="doa-card-judul">{doa.judul}</h3>
        {doa.konteks && <p className="doa-card-konteks">{doa.konteks}</p>}
        <span className="doa-card-versi">
          {doa.versions.length} versi bacaan
        </span>
      </div>
      <button
        className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(doa.id);
        }}
        aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        aria-pressed={isFavorite}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'var(--accent)' : 'none'}>
          <path
            d="M12 17.3l-5.4 3.2 1.4-6.1L3 10l6.2-.5L12 3.7l2.8 5.8L21 10l-5 4.4 1.4 6.1z"
            stroke={isFavorite ? 'var(--accent)' : 'var(--ink-faint)'}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
