
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Favorites from "./pages/Favorites";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
