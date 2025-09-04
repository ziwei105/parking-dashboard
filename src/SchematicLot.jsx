import React, { useEffect, useState } from "react";

export default function SchematicLot() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    async function loadData() {
      const layout = await fetch("/parking_slots.geojson").then(res => res.json());
      const apiData = await fetch(process.env.REACT_APP_API_URL).then(res => res.json());

      const statusMap = {};
      apiData.forEach(s => {
        statusMap[s.slot_id] = s.status;
      });

      setSlots(layout.features.map(f => ({
        id: f.properties.slot_id,
        status: statusMap[f.properties.slot_id] || "unknown"
      })));
    }
    loadData();
  }, []);

  return (
    <div>
      <h2>UTAR Parking Schematic Lot</h2>
      <table border="1" style={{ borderCollapse: "collapse", minWidth: "300px" }}>
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map(slot => (
            <tr key={slot.id}>
              <td>{slot.id}</td>
              <td style={{ color: slot.status === "occupied" ? "red" : "green" }}>
                {slot.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
