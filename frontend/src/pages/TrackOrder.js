import { useState } from "react";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const trackOrder = () => {
    setError("");
    setOrder(null);

    fetch(`http://localhost:7000/orders/${orderId}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setOrder(data))
      .catch(() => setError("Order not found"));
  };

  return (
    <div className="section">
      <h2>Track Order</h2>

      <input
        type="number"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <br /><br />

      <button onClick={trackOrder}>Track</button>

      {error && <p className="error">{error}</p>}

      {order && (
        <div>
          <p><b>Product:</b> {order.product_name}</p>
          <p><b>Quantity:</b> {order.quantity}</p>
          <p><b>Status:</b> {order.status}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
