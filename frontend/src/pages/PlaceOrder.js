import { useState } from "react";
import { useLocation } from "react-router-dom";

function PlaceOrder() {
  const location = useLocation();

const [productName] = useState(
  location.state?.productName || ""
);

  const [quantity, setQuantity] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState(null);

  const placeOrder = (e) => {
    e.preventDefault();

    fetch("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: productName,
        quantity,
        buyer_name: buyerName,
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => setOrderId(data.orderId));
  };

  return (
    <div className="section">
      <h2>📝 Place Order</h2>

      <form onSubmit={placeOrder}>
        <input
          placeholder="Product Name"
          value={productName}
          readOnly
        />
        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Buyer Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Place Order</button>
      </form>

      {orderId && (
        <p className="success">
          ✅ Order placed successfully! Order ID: <b>{orderId}</b>
        </p>
      )}
    </div>
  );
}

export default PlaceOrder;
