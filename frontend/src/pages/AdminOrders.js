import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch("http://localhost:7000/orders/admin/all")
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markDelivered = (id) => {
    fetch(`http://localhost:7000/orders/admin/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Delivered" }),
    }).then(fetchOrders);
  };

  return (
    <div className="section">
      <h2>Admin Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="admin-order">
          <span>
            #{order.id} | {order.product_name} | Qty: {order.quantity} | Status: {order.status}
          </span>

          {order.status === "Pending" && (
            <button onClick={() => markDelivered(order.id)}>
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
