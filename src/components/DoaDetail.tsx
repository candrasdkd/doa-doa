import { useState } from 'react';
import type { Doa } from '../types';
import { OrnamentDivider } from './Ornament';

interface Props {
  doa: Doa;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
}

export function DoaDetail({ doa, isFavorite, onBack, onToggleFavorite }: Props) {
  const [activeVersion, setActiveVersion] = useState(0);
  const version = doa.versions[activeVersion];
  const hasMultipleVersions = doa.versions.length > 1;
  const isEmpty = doa.versions.length === 0;

  return (
    <>
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="back-btn" onClick={onBack} aria-label="Kembali ke daftar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </button>
        <button
          className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
          onClick={() => onToggleFavorite(doa.id)}
          aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          aria-pressed={isFavorite}
          title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'var(--accent)' : 'none'}>
            <path
              d="M12 17.3l-5.4 3.2 1.4-6.1L3 10l6.2-.5L12 3.7l2.8 5.8L21 10l-5 4.4 1.4 6.1z"
              stroke={isFavorite ? 'var(--accent)' : 'var(--ink-faint)'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="doa-detail">
        <span className="detail-kategori-badge">{doa.kategori}</span>
        <h1 className="detail-judul">{doa.judul}</h1>
        {doa.konteks && <p className="detail-konteks">{doa.konteks}</p>}

        {/* Belum ada data versi */}
        {isEmpty && (
          <div className="versions-empty">
            <span className="versions-empty-icon">🚧</span>
            <p className="versions-empty-text">Konten doa ini belum tersedia.</p>
            <p className="versions-empty-sub">Sedang dalam proses penambahan data.</p>
          </div>
        )}

        {!isEmpty && hasMultipleVersions && (
          <div className="version-tabs" role="tablist" aria-label="Pilih versi bacaan">
            {doa.versions.map((v, i) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={i === activeVersion}
                className={`version-tab ${i === activeVersion ? 'version-tab-active' : ''}`}
                onClick={() => setActiveVersion(i)}
              >
                {v.sumber}
              </button>
            ))}
          </div>
        )}

        {!isEmpty && version && (
        <div className="version-panel" key={version.id}>
          {!hasMultipleVersions && (
            <span className="version-sumber-solo">{version.sumber}</span>
          )}

          <div className="arab-block">
            <p className="arab-text" lang="ar" dir="rtl">{version.arab}</p>
          </div>

          <OrnamentDivider />

          <div className="content-blocks">
            <div className="latin-block">
              <span className="block-label">Latin</span>
              <p className="latin-text">{version.latin}</p>
            </div>

            <div className="artinya-block">
              <span className="block-label">Artinya</span>
              <p className="artinya-text">{version.artinya}</p>
            </div>

            {version.catatan && (
              <div className="catatan-block">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2, opacity: 0.6 }}>
                  <circle cx="12" cy="12" r="9" stroke="var(--accent)" strokeWidth="1.5" />
                  <path d="M12 8v4M12 16h.01" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="catatan-text">{version.catatan}</p>
              </div>
            )}

            {version.keterangan && (
              <div className="keterangan-block">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2, opacity: 0.7 }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--keterangan-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <span className="keterangan-label">Keterangan</span>
                  <p className="keterangan-text">{version.keterangan}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </>
  );
}
