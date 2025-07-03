import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const categories = [
  "mens-shirts", "womens-dresses", "tops",
  "mens-shoes", "womens-shoes",
  "mens-bags", "womens-bags",
  "mens-watches", "womens-watches"
];

export default function ProductList() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=200");
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data?.products) {
      const filtered = data.products.filter(p => categories.includes(p.category));
      setProducts(filtered);
    }
  }, [data]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <div className="fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg z-50">
        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-6 h-6 mr-2" />
        <span className="font-bold">{cartCount} items</span>
      </div>

      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-purple-800 text-center sm:text-left">Clothing Shop</h1>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Qidiruv..."
            className="input input-bordered w-full sm:w-64"
          />
          <button onClick={() => setSearchTerm("")} className="btn btn-warning">Tozalash</button>
        </div>
      </header>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <Link to={`/product/${p.id}`} className="flex-grow">
                <img
                  src={p.images?.[0] || "https://via.placeholder.com/150"}
                  alt={p.title}
                  className="w-full h-48 object-contain bg-gray-200"
                />
                <div className="p-4 h-40">
                  <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{p.description}</p>
                </div>
              </Link>
              <div className="p-4 border-t flex justify-between items-center">
                <span className="font-bold">${p.price}</span>
                <button
                  onClick={() => setCartCount(c => c + 1)}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
