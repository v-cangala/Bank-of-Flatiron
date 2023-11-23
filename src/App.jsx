import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import UserForm from "../components/UserForm";
import "./index.css";
import TransactionTable from "../components/TransactionTable";

function App() {
  const [transactions, setTransactions] = useState([]);

  // State for displaying messages to the user
  const [message, setMessage] = useState("");

  // State for filtering transactions based on search term
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (transactions) => {
    fetch("db.json", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name: transactions }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
        setMessage("Transaction added successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to add transaction");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };
  const handleDelete = (transactionId) => {
    fetch(`http://localhost:3000/transactions/${transactionId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction.id !== transactionId)
        );
        setMessage("Item has been deleted.");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };
  // Function to handle the initial fetching of transactions
  useEffect(() => {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to add a new transaction to the list
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Filter transactions based on the search term
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container mt-3 ">
      <UserForm />
      <ExpenseForm onTransactionAdded={addTransaction} />
      <input
        type="text"
        placeholder="Search transactions by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default App;
