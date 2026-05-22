import { useCelebrity } from "../context/celebritycontext";

function formatNetWorth(value) {
  if (!value && value !== 0) return "N/D";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${value}`;
}

export default function CelebrityTable() {
  const { paginated, selected, setSelected, loading, error, hasFetched, totalItems } = useCelebrity();

  if (loading) {
    return (
      <div className="state-box">
        <div className="state-icon">⏳</div>
        Buscando celebridades...
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-box">
        <div className="state-icon">⚠️</div>
        {error}
      </div>
    );
  }

  if (!hasFetched) {
    return (
      <div className="state-box">
        <div className="state-icon">🔭</div>
        Usa los filtros y presiona <strong>Buscar</strong> para encontrar celebridades.
      </div>
    );
  }

  if (paginated.length === 0) {
    return (
      <div className="state-box">
        <div className="state-icon">🎭</div>
        No se encontraron resultados con estos filtros.
      </div>
    );
  }

  return (
    <>
      <p className="results-info">
        Mostrando <strong>{paginated.length}</strong> de <strong>{totalItems}</strong> resultados
      </p>

      <div className="celeb-table-wrap">
        <table className="celeb-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Ocupación</th>
              <th>País</th>
              <th>Patrimonio</th>
              <th>Altura</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((celeb, idx) => (
              <tr
                key={celeb.name + idx}
                className={selected?.name === celeb.name ? "row-active" : ""}
                onClick={() => setSelected(celeb)}
              >
                <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{idx + 1}</td>

                <td className="celeb-name-cell">{celeb.name}</td>

                <td>
                  {Array.isArray(celeb.occupation) && celeb.occupation.length > 0
                    ? celeb.occupation.slice(0, 2).map((occ) => (
                        <span key={occ} className="celeb-occupation-pill">{occ}</span>
                      ))
                    : <span style={{ color: "var(--text-muted)" }}>N/D</span>
                  }
                </td>

                <td>
                  {celeb.nationality ? (
                    <>
                      <img
                        className="flag-img"
                        src={`https://flagcdn.com/w40/${celeb.nationality.toLowerCase()}.png`}
                        alt={celeb.nationality}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      {celeb.nationality}
                    </>
                  ) : <span style={{ color: "var(--text-muted)" }}>N/D</span>}
                </td>

                <td className="net-worth-cell">{formatNetWorth(celeb.net_worth)}</td>

                <td style={{ color: "var(--text-secondary)" }}>
                  {celeb.height ? `${celeb.height} m` : "N/D"}
                </td>

                <td>
                  <button
                    className="detail-btn"
                    onClick={(e) => { e.stopPropagation(); setSelected(celeb); }}
                  >
                    Ver ★
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}