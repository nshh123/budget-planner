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

  const cardBg = isDark ? "#2d2d2d" : "#f8f9fa";
  const subtextColor = isDark ? "#aaaaaa" : "#6c757d";
  const inputBg = isDark ? "#1e1e1e" : "#ffffff";
  const inputColor = isDark ? "#ffffff" : "#000000";
  const borderColor = isDark ? "#444444" : "#ccc";

  const handleSave = () => {
    onUpdateBudget(parseFloat(newBudget) || 0);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: cardBg,
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            color: subtextColor,
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          Total Budget
        </h3>

        {isEditing ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "5px",
            }}
          >
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              style={{
                width: "80px",
                padding: "4px 8px",
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
                padding: "4px 8px",
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
                margin: "5px 0 0",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              ${budget}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                fontSize: "12px",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            color: subtextColor,
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          Total Spent
        </h3>
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#e63946",
          }}
        >
          ${spent}
        </p>
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            color: subtextColor,
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          Remaining
        </h3>
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "24px",
            fontWeight: "bold",
            color: remaining >= 0 ? "#2a9d8f" : "#e63946",
          }}
        >
          ${remaining}
        </p>
      </div>
    </div>
  );
}
