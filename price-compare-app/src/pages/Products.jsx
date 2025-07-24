// src/pages/Products.jsx
import { useEffect, useState } from "react";
import "../styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);

  return (
    <div className="products">
      <h2>Compare Prices</h2>
      <div className="product-grid">
        {products.map((p, i) => (
          <div key={i} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="prices">
              {p.links.map((linkObj, idx) => (
                <div key={idx} className="price-row">
                  <span><strong>{linkObj.platform}:</strong> ₹{linkObj.price}</span>
                  <a
                    href={linkObj.link}
                    className="buy-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
