import React, { useState } from "react";
import MapView from "./MapView";
import ParkingDashboard from "./ParkingDashboard";
import SchematicLot from "./SchematicLot";

function App() {
  const [view, setView] = useState("map");

  return (
    <div>
      <header style={{ padding: "10px", background: "#222", color: "white" }}>
        <button onClick={() => setView("map")} style={{ marginRight: "10px" }}>
          🗺️ Map View
        </button>
        <button onClick={() => setView("table")} style={{ marginRight: "10px" }}>
          📋 Table Dashboard
        </button>
        <button onClick={() => setView("schematic")}>
          🏗️ Schematic Lot
        </button>
      </header>

      <main style={{ padding: "10px" }}>
        {view === "map" && <MapView apiUrl={process.env.REACT_APP_API_URL} />}
        {view === "table" && <ParkingDashboard />}
        {view === "schematic" && <SchematicLot />}
      </main>
    </div>
  );
}

export default App;
