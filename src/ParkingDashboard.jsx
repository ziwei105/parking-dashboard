import React, { useEffect, useState } from "react";
import "./ParkingDashboard.css"; // 👈 new css file

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
    };

    fetchSlots();
    const interval = setInterval(fetchSlots, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parking-dashboard">
      <h2>Parking Status</h2>
      <div className="parking-lot">
        {slots.map((s, i) => (
          <div
            key={s.slot_id}
            className={`slot ${s.status === "occupied" ? "occupied" : "vacant"}`}
          >
            <span className="slot-id">{s.slot_id}</span>
            <span className="slot-status">{s.status}</span>
            <span className="slot-time">{s.last_updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
