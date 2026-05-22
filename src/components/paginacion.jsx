import { useCelebrity } from "../context/celebritycontext";

export default function Pagination() {
  const { page, setPage, totalPages, hasFetched, loading } = useCelebrity();

  if (!hasFetched || loading || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-row">
      <button
        className="pag-btn"
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`pag-btn ${p === page ? "pag-active" : ""}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="pag-btn"
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
      >
        ›
      </button>

      <span className="pag-info">
        Pág. {page} de {totalPages}
      </span>
    </div>
  );
}