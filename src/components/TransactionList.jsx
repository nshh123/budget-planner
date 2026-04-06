// src/components/TransactionList.jsx

export default function TransactionList({ transactions, onDelete, isDark }) {
  const containerBg = isDark ? "#2d2d2d" : "#ffffff";
  const borderColor = isDark ? "#444444" : "#dddddd";
  const itemBorderColor = isDark ? "#3d3d3d" : "#f8f9fa";
  const subtextColor = isDark ? "#aaaaaa" : "#6c757d";

  if (transactions.length === 0) {
    return (
      <div
        style={{ textAlign: "center", padding: "20px", color: subtextColor }}
      >
        <p>No transactions yet. Add your first expense above!</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: containerBg,
        padding: "20px",
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        transition: "all 0.3s ease",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: "10px",
          marginBottom: "15px",
        }}
      >
        Recent Transactions
      </h3>

      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: `1px solid ${itemBorderColor}`,
            }}
          >
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontWeight: "bold",
                  display: "block",
                  fontSize: "16px",
                }}
              >
                {transaction.description}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: subtextColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {transaction.category}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#e63946",
                }}
              >
                -${transaction.amount.toFixed(2)}
              </span>

              <button
                onClick={() => onDelete(transaction.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e63946",
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Delete transaction"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
