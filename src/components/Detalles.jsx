import { useCelebrity } from "../context/celebritycontext";

function formatNetWorth(value) {
  if (!value && value !== 0) return "No disponible";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)} Billones`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)} Millones`;
  return `$${value.toLocaleString()}`;
}

function calcAge(birthday) {
  if (!birthday) return null;
  const birth = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default function CelebrityDetail() {
  const { selected, setSelected } = useCelebrity();

  if (!selected) {
    return (
      <div className="detail-panel">
        <div className="detail-placeholder">
          <div className="detail-placeholder-icon">★</div>
          <p>Selecciona una celebridad de la tabla para ver sus detalles.</p>
        </div>
      </div>
    );
  }

  const age = calcAge(selected.birthday);
  const occupations = Array.isArray(selected.occupation) ? selected.occupation : [];

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="detail-star-bg">★</div>

        <div className="detail-name">{selected.name}</div>

        <div className="detail-occupations">
          {occupations.length > 0
            ? occupations.map((occ) => (
                <span key={occ} className="celeb-occupation-pill">{occ}</span>
              ))
            : <span style={{ color: "var(--text-muted)", fontSize: 12 }}>N/D</span>
          }
        </div>

        <button
          onClick={() => setSelected(null)}
          style={{
            position: "absolute", top: 12, right: 12,
            background: "transparent", border: "none",
            color: "var(--text-muted)", fontSize: 18, cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div className="detail-body">
        <div className="detail-row">
          <div className="detail-row-icon">💰</div>
          <div className="detail-row-content">
            <div className="detail-row-label">Patrimonio neto</div>
            <div className="detail-net-worth">{formatNetWorth(selected.net_worth)}</div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-row-icon">🌍</div>
          <div className="detail-row-content">
            <div className="detail-row-label">Nacionalidad</div>
            <div className="detail-row-value">
              {selected.nationality ? (
                <>
                  <img
                    src={`https://flagcdn.com/w40/${selected.nationality.toLowerCase()}.png`}
                    alt={selected.nationality}
                    style={{ width: 24, height: 16, borderRadius: 2, marginRight: 8, verticalAlign: "middle" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  {selected.nationality}
                </>
              ) : "No disponible"}
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-row-icon">🎂</div>
          <div className="detail-row-content">
            <div className="detail-row-label">Fecha de nacimiento</div>
            <div className="detail-row-value">
              {selected.birthday
                ? `${selected.birthday}${age !== null ? ` (${age} años)` : ""}`
                : "No disponible"}
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-row-icon">📏</div>
          <div className="detail-row-content">
            <div className="detail-row-label">Altura</div>
            <div className="detail-row-value">
              {selected.height ? `${selected.height} m` : "No disponible"}
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-row-icon">👤</div>
          <div className="detail-row-content">
            <div className="detail-row-label">Género</div>
            <div className="detail-row-value">
              {selected.gender === "male" ? "Masculino" : selected.gender === "female" ? "Femenino" : "No disponible"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}