import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Products loaded:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      });
  }, []);

  const getEmoji = (name) => {
    switch (name) {
      case "Tomato":
        return "🍅";
      case "Potato":
        return "🥔";
      case "Onion":
        return "🧅";
      case "Apple":
        return "🍎";
      case "Banana":
        return "🍌";
      default:
        return "🥦";
    }
  };

  const orderNow = (productName) => {
    navigate("/place-order", {
      state: { productName },
    });
  };

  return (
    <div className="section">
      <h2>🥕 Available Products</h2>

      {products.length === 0 && (
        <p style={{ color: "#555" }}>No products found</p>
      )}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px",
            marginBottom: "12px",
            background: "#f8fafc",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "26px", marginRight: "14px" }}>
              {getEmoji(p.name)}
            </span>
            <span>
              <b>{p.name}</b> – ₹{p.price} per unit
            </span>
          </div>

          <button onClick={() => orderNow(p.name)}>Order</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
