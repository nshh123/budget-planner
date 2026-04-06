// src/components/AddTransactionForm.jsx
import { useState } from "react";

export default function AddTransactionForm({ onAdd, isDark }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      category,
    });

    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  const containerBg = isDark ? "#2d2d2d" : "#ffffff";
  const borderColor = isDark ? "#444444" : "#dddddd";
  const inputBg = isDark ? "#1e1e1e" : "#ffffff";
  const inputColor = isDark ? "#ffffff" : "#000000";

  const inputStyles = {
    padding: "8px",
    borderRadius: "4px",
    border: `1px solid ${borderColor}`,
    backgroundColor: inputBg,
    color: inputColor,
  };

  return (
    <div
      style={{
        backgroundColor: containerBg,
        padding: "20px",
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        marginBottom: "20px",
        transition: "all 0.3s ease",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Add New Expense</h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="What did you buy?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyles, flex: 1 }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ ...inputStyles, width: "100px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyles}
        >
          <option value="Housing">Housing</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
