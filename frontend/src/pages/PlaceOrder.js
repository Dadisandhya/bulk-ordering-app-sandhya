import { useState } from "react";
import { useLocation } from "react-router-dom";

function PlaceOrder() {
  const location = useLocation();

  const [productName] = useState(location.state?.productName || "");
  const [quantity, setQuantity] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  const placeOrder = async (e) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT

    setError("");

    if (!productName || !quantity || !buyerName || !address) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: productName,
          quantity: Number(quantity),
          buyer_name: buyerName,
          address: address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Order failed");
      }

      setOrderId(data.orderId);

      // Clear form (except product)
      setQuantity("");
      setBuyerName("");
      setAddress("");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    }
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

        {/* 🔴 MUST be type="submit" */}
        <button type="submit">Place Order</button>
      </form>

      {orderId && (
        <p className="success">
          ✅ Order placed successfully! <br />
          <b>Order ID:</b> {orderId}
        </p>
      )}

      {error && (
        <p className="error">{error}</p>
      )}
    </div>
  );
}

export default PlaceOrder;
