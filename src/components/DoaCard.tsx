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
    <article
      className={`doa-card ${isSelected ? 'doa-card-selected' : ''}`}
      role="listitem"
      aria-current={isSelected ? 'true' : undefined}
    >
      <button className="doa-card-open" onClick={() => onOpen(doa.id)}>
        <span className="doa-card-monogram" aria-hidden="true">
          {doa.kategori.charAt(0)}
        </span>
        <span className="doa-card-main">
          <span className="doa-card-kategori">
            {doa.kategori}
            {doa.terverifikasi && (
              <span className="verified-badge-pill" title="Teks doa & riwayat telah diverifikasi">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Terverifikasi
              </span>
            )}
          </span>
          <span className="doa-card-judul">{doa.judul}</span>
          {doa.konteks && <span className="doa-card-konteks">{doa.konteks}</span>}
          <span className="doa-card-versi">
            {doa.versions.length} versi bacaan
          </span>
        </span>
        <span className="doa-card-arrow" aria-hidden="true">→</span>
      </button>
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
    </article>
  );
}
