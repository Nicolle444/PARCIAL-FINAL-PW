import { useCelebrity } from "../context/celebritycontext";

export default function SortBar() {
  const { ordering, setOrdering, orderDir, setOrderDir } = useCelebrity();

  return (
    <div className="sort-section">
      <div className="filter-group">
        <label className="filter-label">Ordenar por</label>
        <select
          className="sort-select"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="name">Nombre</option>
          <option value="net_worth">Patrimonio</option>
        </select>
      </div>

      <button
        className="sort-dir-btn"
        onClick={() => setOrderDir(orderDir === "asc" ? "desc" : "asc")}
        title={orderDir === "asc" ? "Ascendente" : "Descendente"}
      >
        {orderDir === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  );
}
