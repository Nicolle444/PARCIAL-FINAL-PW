import { CelebrityProvider } from "./context/celebritycontext";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";
import CelebrityTable from "./components/TablaCele";
import Pagination from "./components/paginacion";
import CelebrityDetail from "./components/Detalles";

function AppContent() {
  return (
    <div className="app-wrapper">

      <header className="site-header">
        <div className="header-brand">
          <span className="header-eyebrow">UIS · Programación en la Web</span>
          <h1 className="header-title">
            Explorador de <span>Celebridades</span>
          </h1>
          <p className="header-subtitle">
            Encuentra la información de tus celebridades favoritas.
          </p>
        </div>
        <div className="header-star-row">
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </header>

      <div className="controls-row">
        <FilterBar />
        <SortBar />
      </div>

      <div className="content-grid">
        <div>
          <CelebrityTable />
          <Pagination />
        </div>
        <div>
          <CelebrityDetail />
        </div>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <CelebrityProvider>
      <AppContent />
    </CelebrityProvider>
  );
}