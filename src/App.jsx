import { useState, useEffect } from "react";
import "./App.css";
import SummaryCard from "./components/SummaryCard";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import SpendingChart from "./components/SpendingChart";
import bgpic from "./assets/bgpic.png";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("budget-theme-dark");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget-total");
    return savedBudget ? JSON.parse(savedBudget) : 2500;
  });
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("budget-transactions");
    if (savedTransactions) return JSON.parse(savedTransactions);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("budget-total", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("budget-transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget-theme-dark", JSON.stringify(isDarkMode));
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  }, [isDarkMode]);

  const totalSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const remainingBalance = budget - totalSpent;

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyles = {
    maxWidth: "800px",
    margin: "0 auto 40px auto",
    padding: "20px",
    fontFamily: "sans-serif",

    backgroundImage: `url(${bgpic})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    backgroundColor: isDarkMode
      ? "rgba(30, 30, 30, 0.9)"
      : "rgba(255, 255, 255, 0.9)",
    backgroundBlendMode: "overlay",

    color: isDarkMode ? "#ffffff" : "#333333",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    minHeight: "100vh",
  };

  return (
    <div style={appStyles}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `2px solid ${isDarkMode ? "#333" : "#eee"}`,
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        <h1>Budget Dashboard</h1>

        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            cursor: "pointer",
            backgroundColor: isDarkMode ? "#444" : "#eee",
            color: isDarkMode ? "#fff" : "#333",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {isDarkMode ? " Light Mode" : " Dark Mode"}
        </button>
      </header>

      <main>
        <SummaryCard
          budget={budget}
          spent={totalSpent}
          remaining={remainingBalance}
          isDark={isDarkMode}
          onUpdateBudget={setBudget}
        />
        <SpendingChart transactions={transactions} isDark={isDarkMode} />
        <AddTransactionForm onAdd={handleAddTransaction} isDark={isDarkMode} />
        <TransactionList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          isDark={isDarkMode}
        />
      </main>
    </div>
  );
}

export default App;
