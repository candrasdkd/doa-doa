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
  const resetFilters = () => {
    setQuery('');
    setCategory(null);
    setShowFavoritesOnly(false);
  };

  return (
    <div className={`app-shell ${selectedId ? 'detail-open' : ''}`}>
      <aside className="app-sidebar">
        <div className="app-sidebar-header">
          <div className="app-header-brand">
            <div className="app-logo" aria-hidden="true">
              <span className="app-logo-text">دعاء</span>
            </div>
            <div className="app-brand-info">
              <h1 className="app-title">Saku Doa</h1>
              <p className="app-subtitle">Teman ibadah harian</p>
            </div>
          </div>

          <div className="app-intro">
            <span className="app-intro-arabic" lang="ar" dir="rtl">بِسْمِ اللَّهِ</span>
            <h2>Jadikan doa teman di setiap langkah.</h2>
            <p>Temukan bacaan yang tepat, kapan pun dibutuhkan.</p>
          </div>

          <SearchBar value={query} onChange={setQuery} />
          <div className="filter-row">
            <CategoryModal categories={categories} active={category} onSelect={setCategory} />
            <button
              className={`favorite-filter-btn ${showFavoritesOnly ? 'favorite-filter-active' : ''}`}
              onClick={() => setShowFavoritesOnly((s) => !s)}
              aria-pressed={showFavoritesOnly}
              aria-label="Tampilkan doa favorit saja"
              title="Filter favorit"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill={showFavoritesOnly ? 'currentColor' : 'none'} aria-hidden="true">
                <path
                  d="M12 17.3l-5.4 3.2 1.4-6.1L3 10l6.2-.5L12 3.7l2.8 5.8L21 10l-5 4.4 1.4 6.1z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Favorit</span>
              {favorites.length > 0 && <span className="favorite-count">{favorites.length}</span>}
            </button>
          </div>
        </div>

        <div className="doa-list-scroll" role="list" aria-label="Daftar doa">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon" aria-hidden="true"><span /></div>
              <h3>Tidak ada doa ditemukan</h3>
              <p>Coba kata kunci lain atau hapus filter yang aktif.</p>
              <button className="empty-state-action" onClick={resetFilters}>Atur ulang pencarian</button>
            </div>
          ) : (
            <>
              <div className="stats-row">
                <p><strong>{filtered.length}</strong> doa ditemukan</p>
                <span>{category ?? (showFavoritesOnly ? 'Tersimpan' : 'Semua kategori')}</span>
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

      <main className="app-main">
        {selectedDoa ? (
          <div className="doa-detail-wrapper">
            <DoaDetail
              key={selectedDoa.id}
              doa={selectedDoa}
              isFavorite={isFavorite(selectedDoa.id)}
              onBack={closeDoa}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ) : (
          <div className="detail-empty">
            <div className="detail-empty-card">
              <div className="detail-empty-mark" aria-hidden="true"><span>د</span></div>
              <span className="detail-empty-eyebrow">Ruang baca</span>
              <h2 className="detail-empty-title">Luangkan sejenak untuk mendekat.</h2>
              <p className="detail-empty-sub">
                Pilih salah satu doa dari daftar untuk membaca teks Arab, latin, dan artinya dengan nyaman.
              </p>
              <div className="detail-empty-stats" aria-label="Ringkasan koleksi">
                <div><strong>{doaData.length}</strong><span>bacaan doa</span></div>
                <div><strong>{categories.length}</strong><span>kategori</span></div>
                <div><strong>100%</strong><span>bisa offline</span></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
