import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/animate.css";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [likedCount, setLikedCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageIndexes, setImageIndexes] = useState({});
  const [animatedProductId, setAnimatedProductId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLike = (id) => {
    const isLiked = likedProducts[id] === true;
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !isLiked,
    }));
    setLikedCount((prev) => (isLiked ? Math.max(prev - 1, 0) : prev + 1));
  };

  const handleAddToCart = () => setCartCount((prev) => prev + 1);
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");
  const toggleLoginModal = () => setShowLogin((prev) => !prev);
  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Ro‘yxatdan o‘tildi!");
    setShowLogin(false);
  };

  const allowedCategories = [
    "tops",
    "mens-shirts",
    "womens-dresses",
    "womens-jewellery",
    "jewellery",
    "toys",
    "automotive",
  ];

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => allowedCategories.includes(p.category));

  const handleImageClick = (e, id, images) => {
    e.preventDefault();
    const cur = imageIndexes[id] ?? 0;
    const next = (cur + 1) % images.length;
    setImageIndexes((prev) => ({ ...prev, [id]: next }));
    setAnimatedProductId(id);
    setTimeout(() => setAnimatedProductId(null), 1000);
  };

  if (loading) return <p className="text-center mt-10">⏳ Yuklanmoqda...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <header
        style={{
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            color: "#ff7f50",
            fontSize: "28px",
            fontWeight: "bold",
            margin: 0,
            userSelect: "none",
          }}
        >
          🛍 NILUshopping
        </h1>

      
        <div
          className="input-container"
          style={{ flex: 1, maxWidth: "400px", margin: "0 20px", position: "relative" }}
        >
          <input
            type="text"
            id="search"
            placeholder=" "
            value={searchTerm}
            onChange={handleSearch}
            className="animate__animated"
            style={{
              width: "100%",
              padding: "12px 12px 12px 12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1.5px solid #ccc",
              outlineColor: "#32a852",
            }}
            onFocus={(e) => e.target.classList.add("animate__pulse")}
            onBlur={(e) => e.target.classList.remove("animate__pulse")}
          />
          <label
            htmlFor="search"
            className="floating-label"
            style={{
              position: "absolute",
              left: "12px",
              top: "12px",
              color: "#999",
              fontSize: "16px",
              pointerEvents: "none",
              transition: "all 0.2s ease",
              backgroundColor: "white",
              padding: "0 4px",
              userSelect: "none",
            }}
          >
            Mahsulot qidirish...
          </label>
        </div>

        <button
          onClick={clearSearch}
          style={{
            backgroundColor: "#ff7f50",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          Tozalash
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            onClick={() => alert("Yoqilgan mahsulotlar")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "2px solid #ff7f50",
              borderRadius: "50%",
              padding: "6px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <span style={{ color: "#ff7f50", fontWeight: "bold", fontSize: "16px" }}>
              {likedCount} ❤️
            </span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              alt="Heart"
              style={{ width: "26px" }}
            />
          </div>
          <div
            onClick={toggleLoginModal}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "2px solid #32a852",
              borderRadius: "50%",
              padding: "6px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <span style={{ color: "#ff7f50", fontWeight: "bold", fontSize: "16px" }}>
              Tizimga kirish
            </span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              alt="User"
              style={{ width: "26px" }}
            />
          </div>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="Cart"
              style={{ width: "26px" }}
            />
            {cartCount > 0 && (
              <span
                style={{
                  backgroundColor: "#ff7f50",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  pointerEvents: "none",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>
      {showLogin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "300px",
              boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
              Tizimga kirish
            </h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  marginBottom: "12px",
                  width: "100%",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Parol"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  marginBottom: "12px",
                  width: "100%",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#ff7f50",
                  color: "white",
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                Ro'yxatdan o'tish
              </button>
            </form>
          </div>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => {
          const isLiked = likedProducts[product.id];
          const images = product.images ?? [];
          const currentImageIndex = imageIndexes[product.id] ?? 0;
          return (
            <div
              key={product.id}
              className="product-card"
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className={`image-container ${animatedProductId === product.id ? "animate__pulse" : ""}`}
                onClick={(e) => handleImageClick(e, product.id, images)}
              >
                <img
                  src={images[currentImageIndex] ?? "https://via.placeholder.com/200"}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <h3 style={{ margin: "16px 0", fontSize: "18px", fontWeight: "bold" }}>
                {product.title}
              </h3>
              <p style={{ color: "#888", fontSize: "14px", marginBottom: "12px" }}>
                {product.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleAddToCart()}
                  style={{
                    backgroundColor: "#32a852",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                    alt="Cart"
                    style={{ width: "20px" }}
                  />
                  Savatga qo'shish
                </button>
                <button
                  onClick={() => alert("Mahsulot o'chirildi")}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  O'chirish
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
