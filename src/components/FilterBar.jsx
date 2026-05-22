import { useCelebrity } from "../context/celebritycontext";

export default function FilterBar() {
  const {
    filterName, setFilterName,
    filterNationality, setFilterNationality,
    filterMinNetWorth, setFilterMinNetWorth,
    fetchCelebrities,
    clearFilters,
    loading,
  } = useCelebrity();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchCelebrities();
  };

  return (
    <div className="filter-section">
      <div className="filter-group">
        <label className="filter-label">Nombre</label>
        <input
          className="filter-input"
          type="text"
          placeholder="ej: Taylor Swift"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Nacionalidad</label>
        <input
          className="filter-input"
          type="text"
          placeholder="ej: US, GB, CO"
          value={filterNationality}
          onChange={(e) => setFilterNationality(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={2}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Patrimonio mínimo ($)</label>
        <input
          className="filter-input"
          type="number"
          placeholder="ej: 1000000"
          value={filterMinNetWorth}
          onChange={(e) => setFilterMinNetWorth(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button className="filter-btn" onClick={fetchCelebrities} disabled={loading}>
        {loading ? "Buscando…" : "Buscar"}
      </button>

      <button className="clear-btn" onClick={clearFilters}>
        Limpiar
      </button>
    </div>
  );
}