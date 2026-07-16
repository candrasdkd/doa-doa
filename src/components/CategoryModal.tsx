import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  categories: string[];
  active: string | null;
  onSelect: (kategori: string | null) => void;
}

export function CategoryModal({ categories, active, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-focus search saat modal dibuka
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 60);
    } else {
      setSearch('');
    }
  }, [open]);

  // Tutup modal saat tekan Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Cegah scroll body saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSelect = (val: string | null) => {
    onSelect(val);
    setOpen(false);
  };

  const modal = open
    ? createPortal(
        <div className="cat-overlay" onClick={() => setOpen(false)} aria-modal="true" role="dialog" aria-label="Pilih Kategori">
          <div className="category-modal-inner" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="category-modal-header">
              <span className="category-modal-title">Pilih Kategori</span>
              <button
                className="category-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Tutup"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="category-modal-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                type="search"
                placeholder="Cari kategori..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Cari kategori"
              />
              {search && (
                <button
                  className="cat-search-clear"
                  onClick={() => setSearch('')}
                  aria-label="Hapus"
                >
                  ×
                </button>
              )}
            </div>

            {/* List */}
            <div className="category-modal-list" role="listbox" aria-label="Daftar kategori">
              <button
                className={`category-modal-item ${active === null ? 'category-modal-item-active' : ''}`}
                onClick={() => handleSelect(null)}
                role="option"
                aria-selected={active === null}
              >
                <span className="category-item-dot category-item-dot-all" />
                <span className="category-item-label">Semua Doa</span>
                {active === null && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <path d="M5 13l4 4L19 7" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {filtered.length === 0 ? (
                <p className="category-no-result">Tidak ada kategori yang cocok.</p>
              ) : (
                filtered.map((cat) => (
                  <button
                    key={cat}
                    className={`category-modal-item ${active === cat ? 'category-modal-item-active' : ''}`}
                    onClick={() => handleSelect(cat)}
                    role="option"
                    aria-selected={active === cat}
                  >
                    <span className="category-item-dot" />
                    <span className="category-item-label">{cat}</span>
                    {active === cat && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                        <path d="M5 13l4 4L19 7" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* Trigger button */}
      <button
        className={`category-trigger-btn ${active ? 'category-trigger-active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {active ? active : 'Semua Kategori'}
        {active ? (
          <span
            className="category-clear-x"
            role="button"
            aria-label="Hapus filter"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(null);
            }}
          >
            ×
          </span>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.5 }}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {modal}
    </>
  );
}
