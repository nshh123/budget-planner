// src/components/SpendingChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function SpendingChart({ transactions, isDark }) {
  if (transactions.length === 0) return null;

  const dataMap = transactions.reduce((acc, transaction) => {
    if (acc[transaction.category]) {
      acc[transaction.category] += transaction.amount;
    } else {
      acc[transaction.category] = transaction.amount;
    }
    return acc;
  }, {});

  const chartData = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  const COLORS = [
    "#4361ee",
    "#f72585",
    "#4cc9f0",
    "#f8961e",
    "#4d908e",
    "#9d4edd",
  ];

  const containerBg = isDark ? "#2d2d2d" : "#ffffff";
  const borderColor = isDark ? "#444444" : "#dddddd";
  const textColor = isDark ? "#ffffff" : "#333333";

  return (
    <div
      style={{
        backgroundColor: containerBg,
        padding: "20px",
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        marginBottom: "20px",
        color: textColor,
        transition: "all 0.3s ease",
      }}
    >
      <h3 style={{ marginTop: 0, textAlign: "center", marginBottom: "20px" }}>
        Spending Breakdown
      </h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%" // Center X
              cy="50%" // Center Y
              innerRadius={80} // This makes it a donut instead of a solid pie!
              outerRadius={110}
              paddingAngle={5} // Little gaps between slices
              dataKey="value"
              stroke="none" // Removes the default white border on slices
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: isDark ? "#333" : "#fff",
                borderRadius: "8px",
                border: "none",
                color: isDark ? "#fff" : "#000",
              }}
            />

            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
