import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ExpensePage from "./pages/ExpensePage";
import IncomePage from "./pages/IncomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpensePage />} />
        <Route path="/income" element={<IncomePage />} />
      </Routes>
    </BrowserRouter>
  );
}