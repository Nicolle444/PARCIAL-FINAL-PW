import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const CelebrityContext = createContext();

const API_KEY = "EvBVGRvNSLTAwpZBBzmW7zX8BxV7BxV4bWyDWQN9"; 
const BASE_URL = "https://api.api-ninjas.com/v1/celebrity";

export function CelebrityProvider({ children }) {
  const [celebrities, setCelebrities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Filtros
  const [filterName, setFilterName] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [filterMinNetWorth, setFilterMinNetWorth] = useState("");

  // Ordenamiento
  const [ordering, setOrdering] = useState("name");
  const [orderDir, setOrderDir] = useState("asc");

  // Paginación
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const fetchCelebrities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterName.trim()) params.name = filterName.trim();
      if (filterNationality.trim()) params.nationality = filterNationality.trim().toUpperCase();
      if (filterMinNetWorth.trim()) params.min_net_worth = filterMinNetWorth.trim();

      const response = await axios.get(BASE_URL, {
        headers: { "X-Api-Key": API_KEY },
        params,
      });

      setCelebrities(Array.isArray(response.data) ? response.data : []);
      setPage(1);
      setSelected(null);
      setHasFetched(true);
    } catch (err) {
      setError("Error al conectar con la API. Verifica tu API Key.");
      setCelebrities([]);
    } finally {
      setLoading(false);
    }
  }, [filterName, filterNationality, filterMinNetWorth]);

  // Ordenamiento en memoria
  const sorted = [...celebrities].sort((a, b) => {
    let valA = a[ordering] ?? "";
    let valB = b[ordering] ?? "";
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    if (valA < valB) return orderDir === "asc" ? -1 : 1;
    if (valA > valB) return orderDir === "asc" ? 1 : -1;
    return 0;
  });

  // Paginación en memoria
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const clearFilters = () => {
    setFilterName("");
    setFilterNationality("");
    setFilterMinNetWorth("");
  };

  return (
    <CelebrityContext.Provider value={{
      paginated,
      totalItems: sorted.length,
      selected, setSelected,
      loading, error, hasFetched,
      filterName, setFilterName,
      filterNationality, setFilterNationality,
      filterMinNetWorth, setFilterMinNetWorth,
      fetchCelebrities, clearFilters,
      ordering, setOrdering,
      orderDir, setOrderDir,
      page, setPage,
      totalPages,
    }}>
      {children}
    </CelebrityContext.Provider>
  );
}

export function useCelebrity() {
  return useContext(CelebrityContext);
}