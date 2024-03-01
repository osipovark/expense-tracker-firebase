import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./components/pages/auth/Auth.jsx";
import ExpenseTracker from "./components/pages/expense-tracker/ExpenseTracker.jsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
