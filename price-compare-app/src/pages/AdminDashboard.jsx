// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    links: [{ platform: "", link: "", price: "" }],
    imageFile: null,
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setUsers(savedUsers);
    setProducts(savedProducts);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteProduct = (name) => {
    const updatedProducts = products.filter((p) => p.name !== name);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...newProduct.links];
    updatedLinks[index][field] = value;
    setNewProduct({ ...newProduct, links: updatedLinks });
  };

  const addLinkField = () => {
    setNewProduct({
      ...newProduct,
      links: [...newProduct.links, { platform: "", link: "", price: "" }],
    });
  };

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/upload-image", formData);
      return res.data.imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const addProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.imageFile ||
      newProduct.links.some((l) => !l.link || !l.price || !l.platform)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImageToServer(newProduct.imageFile);

      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        image: imageUrl,
        links: newProduct.links,
      };

      const updated = [...products, productData];
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));

      setNewProduct({
        name: "",
        description: "",
        links: [{ platform: "", link: "", price: "" }],
        imageFile: null,
      });
    } catch (error) {
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const startEditingProduct = (index) => {
    setEditIndex(index);
    setEditProduct({ ...products[index] });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditLinkChange = (index, field, value) => {
    const updatedLinks = [...editProduct.links];
    updatedLinks[index][field] = value;
    setEditProduct({ ...editProduct, links: updatedLinks });
  };

  const saveEditedProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[editIndex] = editProduct;
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditIndex(null);
    setEditProduct(null);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditProduct(null);
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <h2>Admin Dashboard</h2>

      <div className="tab-buttons">
        <button
          onClick={() => setTab("users")}
          className={tab === "users" ? "active" : ""}
        >
          Manage Users
        </button>
        <button
          onClick={() => setTab("products")}
          className={tab === "products" ? "active" : ""}
        >
          Manage Products
        </button>
      </div>

      {tab === "users" && (
        <div className="admin-section">
          <h3>All Registered Users</h3>
          <ul>
            {users.map((u, i) => (
              <li key={i}>
                {u.name} ({u.email})
                <button onClick={() => deleteUser(u.email)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "products" && (
        <div className="admin-section">
          <h3>Add New Product</h3>
          <div className="product-form">
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
            <textarea
              placeholder="Product Description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageFile: e.target.files[0] })
              }
            />
            {newProduct.links.map((linkObj, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="Platform"
                  value={linkObj.platform}
                  onChange={(e) =>
                    handleLinkChange(idx, "platform", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={linkObj.link}
                  onChange={(e) => handleLinkChange(idx, "link", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={linkObj.price}
                  onChange={(e) => handleLinkChange(idx, "price", e.target.value)}
                />
              </div>
            ))}
            <button onClick={addLinkField}>Add Another Link</button>
            <button onClick={addProduct} disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>

          <h3>Existing Products</h3>
          <div className="product-grid">
            {products.map((p, i) => (
              <div className="product-card" key={i}>
                {editIndex === i ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={editProduct.name}
                      onChange={handleEditChange}
                    />
                    <textarea
                      name="description"
                      value={editProduct.description}
                      onChange={handleEditChange}
                    />
                    {editProduct.links.map((linkObj, idx) => (
                      <div key={idx}>
                        <input
                          type="text"
                          value={linkObj.platform}
                          onChange={(e) =>
                            handleEditLinkChange(idx, "platform", e.target.value)
                          }
                          placeholder="Platform"
                        />
                        <input
                          type="text"
                          value={linkObj.link}
                          onChange={(e) =>
                            handleEditLinkChange(idx, "link", e.target.value)
                          }
                          placeholder="Link"
                        />
                        <input
                          type="text"
                          value={linkObj.price}
                          onChange={(e) =>
                            handleEditLinkChange(idx, "price", e.target.value)
                          }
                          placeholder="Price"
                        />
                      </div>
                    ))}
                    <button onClick={saveEditedProduct}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <img src={p.image} alt={p.name} />
                    <h4>{p.name}</h4>
                    <p>{p.description}</p>
                    <div className="prices">
                      {p.links.map((linkObj, idx) => (
                        <div key={idx}>
                          <strong>{linkObj.platform}</strong><br />
                          <a href={linkObj.link} target="_blank" rel="noreferrer">
                            {linkObj.link}
                          </a>
                          <p>Price: ₹{linkObj.price}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => deleteProduct(p.name)}>Delete</button>
                    <button onClick={() => startEditingProduct(i)}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
