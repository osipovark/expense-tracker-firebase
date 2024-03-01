import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { useAddTransaction } from "../../../hooks/useAddTransaction.js";
import { useGetTransactions } from "../../../hooks/useGetTransactions.js";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo.js";

import { auth } from "../../../config/firebase-config.js";

import "./styles.css";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const {name, profilePicture} = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your balance</h3>
            <h2>{`${balance < 0 ? "-" : ""}$${Math.abs(balance)}`}</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />

            <button type="submit">Add transaction</button>
          </form>
        </div>
        {profilePicture && (
          <div className="profile">
            <img className="profile-photo" src={profilePicture} />
            <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;

            return (
              <li>
                <h4>{description}</h4>
                <p>${transactionAmount} : <label style={{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ExpenseTracker;
