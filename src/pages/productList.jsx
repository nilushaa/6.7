import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
function ProductList() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [likedCount, setLikedCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    const isAlreadyLiked = likedProducts[id] === true;
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !isAlreadyLiked,
    }));
    setLikedCount((prevCount) =>
      isAlreadyLiked ? Math.max(prevCount - 1, 0) : prevCount + 1
    );
  };

  const handleAddToCart = (id) => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <p className="text-center mt-10">⏳ Yuklanmoqda...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        <header className="flex items-center justify-between mb-10 p-6 bg-blue-200 hover:bg-blue-500 shadow-lg rounded-lg relative">
          <div className="text-2xl font-bold text-blue-500">🛍 NILUshopping</div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              className="input input-bordered w-80 max-w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              onClick={clearSearch}
              className="btn btn-warning"
              title="Tozalash"
            >
              Tozalash
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-red-600 font-bold select-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                alt="Like icon"
                className="w-6 h-6"
              />
              <span>{likedCount}</span>
            </div>
            <div className="flex items-center gap-2 text-black font-bold select-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/892/892236.png"
                alt="Cart icon"
                className="w-6 h-6"
              />
              <span>{cartCount}</span>
            </div>
            <Link to="/login">
              <div className="flex items-center gap-2 text-white font-bold">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="Login icon"
                  className="w-6 h-6"
                />
                Tizimga kirish
              </div>
            </Link>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center ">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="relative bg-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105 flex flex-col border-2 border-transparent hover:border-blue-500"
            >
              <button
                onClick={() => handleLike(p.id)}
                className="absolute top-2 right-2 z-10"
                title={
                  likedProducts[p.id]
                    ? "Sevimlidan olib tashlash"
                    : "Sevimlilar qo'shish"
                }
              >
                <img
                  src={
                    likedProducts[p.id]
                      ? "https://cdn-icons-png.flaticon.com/512/833/833472.png"
                      : "https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                  }
                  alt="Like"
                  className="w-6 h-6"
                />
              </button>
              <Link to={`/product/${p.id}`}>
                <figure className="px-6 pt-4 bg-gray-200 rounded-lg cursor-pointer">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="rounded-lg w-full max-h-48 object-contain mx-auto"
                  />
                </figure>
              </Link>

              <div className="p-4 flex-grow text-center text-sm">
                <h2 className="text-base font-semibold mb-1">{p.title}</h2>
                <p className="text-gray-600 line-clamp-2">{p.description}</p>
                <div className="flex justify-between mt-2 px-4">
                  <p className="font-semibold text-gray-800">💰 ${p.price}</p>
                  <p className="text-yellow-500">⭐ {p.rating}</p>
                </div>
                <p className="text-gray-500">🏷 {p.brand}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleAddToCart(p.id)}
                  className="btn bg-blue-300 text-white rounded-md hover:bg-blue-500 ml-5 mb-4"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/892/892236.png" 
                    alt="Cart"
                    className="w-5 h-5"
                  />
                </button>
                <button
                  onClick={() => handleDelete(p.id)} 
                  className="btn bg-blue-300 text-white ml-25 mb-4 rounded-md hover:bg-blue-500 transition duration-200"
                >
                  Dalet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
