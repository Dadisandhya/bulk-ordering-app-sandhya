import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";

import Products from "./pages/Products";
import PlaceOrder from "./pages/PlaceOrder";
import TrackOrder from "./pages/TrackOrder";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* App Title */}
        <h1>Bulk Vegetable & Fruit Ordering App</h1>

        {/* Navigation Bar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/admin" element={<AdminOrders />} />
        </Routes>

        {/* Footer */}
        <footer>
          Developed by <b>Sandhya</b>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
