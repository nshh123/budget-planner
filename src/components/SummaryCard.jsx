// src/components/SummaryCard.jsx
import { useState } from "react";

export default function SummaryCard({
  budget,
  spent,
  remaining,
  isDark,
  onUpdateBudget,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  // Styling variables
  const cardBg = isDark ? "#2d2d2d" : "#ffffff"; // Using pure white for light mode to match your image
  const subtextColor = isDark ? "#aaaaaa" : "#718096";
  const inputBg = isDark ? "#1e1e1e" : "#ffffff";
  const inputColor = isDark ? "#ffffff" : "#000000";
  const borderColor = isDark ? "#444444" : "#ccc";

  const handleSave = () => {
    onUpdateBudget(parseFloat(newBudget) || 0);
    setIsEditing(false);
  };

  const cardStyle = { backgroundColor: cardBg };
  const labelStyle = {
    margin: 0,
    color: subtextColor,
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  return (
    // Notice we are using the CSS class here instead of inline flex styles!
    <div className="summary-container">
      {/* CARD 1: Total Budget */}
      <div
        className="summary-card"
        style={{ ...cardStyle, borderColor: isDark ? "#444" : "#e2e8f0" }}
      >
        <h3 style={labelStyle}>Total Budget</h3>

        {isEditing ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              style={{
                width: "100px",
                padding: "6px",
                borderRadius: "4px",
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                color: inputColor,
              }}
              autoFocus
            />
            <button
              onClick={handleSave}
              style={{
                padding: "6px 12px",
                backgroundColor: "#2a9d8f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "26px",
                fontWeight: "bold",
                color: isDark ? "#fff" : "#1a202c",
              }}
            >
              {/* Changed to Rwf and added .toFixed(2) for the .00 decimal */}
              Rwf {parseFloat(budget).toFixed(2)}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* CARD 2: Total Spent */}
      <div
        className="summary-card"
        style={{ ...cardStyle, borderColor: isDark ? "#444" : "#e2e8f0" }}
      >
        <h3 style={labelStyle}>Total Spent</h3>
        <p
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "bold",
            color: "#ef4444",
          }}
        >
          Rwf {parseFloat(spent).toFixed(2)}
        </p>
      </div>

      {/* CARD 3: Remaining */}
      <div
        className="summary-card"
        style={{ ...cardStyle, borderColor: isDark ? "#444" : "#e2e8f0" }}
      >
        <h3 style={labelStyle}>Remaining</h3>
        <p
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "bold",
            color: remaining >= 0 ? "#10b981" : "#ef4444",
          }}
        >
          Rwf {parseFloat(remaining).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
