import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Operators from "./pages/Operators.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/operators" element={<Operators />} />
      </Routes>
    </BrowserRouter>
  );
}
