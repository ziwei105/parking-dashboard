import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function ParkingDashboard() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(API_URL);
        const text = await res.text();  
        console.log("Raw API response:", text); 

        const data = JSON.parse(text);  
        setSlots(data);
      } catch (err) {
        console.error("Error fetching/parsing:", err);
      }
    }; // ✅ this was missing

    fetchSlots();
    const interval = setInterval(fetchSlots, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Parking Status</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,150px)",
          gap: 10,
        }}
      >
        {slots.map((s) => (
          <div
            key={s.slot_id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <strong>{s.slot_id}</strong>
            <div>{s.status}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{s.last_updated}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
