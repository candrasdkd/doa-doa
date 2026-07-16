import { useEffect, useMemo, useState } from 'react';
import doaData from './data/index';

import { useFavorites } from './hooks/useFavorites';
import { SearchBar } from './components/SearchBar';
import { CategoryModal } from './components/CategoryModal';
import { DoaCard } from './components/DoaCard';
import { DoaDetail } from './components/DoaDetail';
import './App.css';


function getIdFromHash(): string | null {
  const hash = window.location.hash;
  return hash.startsWith('#/doa/') ? hash.replace('#/doa/', '') : null;
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(() => getIdFromHash());
  const { isFavorite, toggleFavorite, favorites } = useFavorites();

  useEffect(() => {
    const onPopState = () => setSelectedId(getIdFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openDoa = (id: string) => {
    window.history.pushState({}, '', `#/doa/${id}`);
    setSelectedId(id);
    // On mobile scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDoa = () => {
    window.history.pushState({}, '', '#/');
    setSelectedId(null);
  };

  const categories = useMemo(
    () => Array.from(new Set(doaData.map((d) => d.kategori))),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doaData.filter((doa) => {
      if (showFavoritesOnly && !favorites.includes(doa.id)) return false;
      if (category && doa.kategori !== category) return false;
      if (!q) return true;
      return (
        doa.judul.toLowerCase().includes(q) ||
        doa.kategori.toLowerCase().includes(q) ||
        (doa.konteks?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, category, showFavoritesOnly, favorites]);

  const selectedDoa = selectedId ? doaData.find((d) => d.id === selectedId) ?? null : null;

  return (
    <div className={`app-shell ${selectedId ? 'detail-open' : ''}`}>
      {/* ── SIDEBAR / LIST ── */}
      <aside className="app-sidebar">
        <div className="app-sidebar-header">
          <div className="app-header-brand">
            <div className="app-logo" aria-hidden="true">
              <span className="app-logo-text">دعاء</span>
            </div>
            <div className="app-brand-info">
              <h1 className="app-title">Kumpulan Doa</h1>
              <p className="app-subtitle">Doa harian, offline kapan saja</p>
            </div>
            <div className="app-header-actions">
              <button
                className={`favorite-filter-btn ${showFavoritesOnly ? 'favorite-filter-active' : ''}`}
                onClick={() => setShowFavoritesOnly((s) => !s)}
                aria-pressed={showFavoritesOnly}
                aria-label="Tampilkan favorit saja"
                title="Filter favorit"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={showFavoritesOnly ? 'var(--accent)' : 'none'}>
                  <path
                    d="M12 17.3l-5.4 3.2 1.4-6.1L3 10l6.2-.5L12 3.7l2.8 5.8L21 10l-5 4.4 1.4 6.1z"
                    stroke={showFavoritesOnly ? 'var(--accent)' : 'var(--ink-faint)'}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <SearchBar value={query} onChange={setQuery} />
          <CategoryModal categories={categories} active={category} onSelect={setCategory} />
        </div>

        <div className="doa-list-scroll" role="list" aria-label="Daftar doa">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Tidak ada hasil</p>
              <p className="empty-state-sub">Coba kata kunci lain atau ubah filter kategori.</p>
            </div>
          ) : (
            <>
              <div className="stats-row">
                <span className="stat-pill">
                  <span className="stat-count">{filtered.length}</span>
                  {filtered.length === 1 ? ' doa' : ' doa'}
                </span>
              </div>
              {filtered.map((doa) => (
                <DoaCard
                  key={doa.id}
                  doa={doa}
                  isSelected={selectedId === doa.id}
                  isFavorite={isFavorite(doa.id)}
                  onOpen={openDoa}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </>
          )}
        </div>
      </aside>

      {/* ── DETAIL PANEL ── */}
      <main className="app-main">
        {selectedDoa ? (
          <div className="doa-detail-wrapper">
            <DoaDetail
              doa={selectedDoa}
              isFavorite={isFavorite(selectedDoa.id)}
              onBack={closeDoa}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ) : (
          <div className="detail-empty">
            <div className="detail-empty-icon">🕌</div>
            <h2 className="detail-empty-title">Pilih Doa</h2>
            <p className="detail-empty-sub">Klik salah satu doa di sebelah kiri<br />untuk membaca bacaannya.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
