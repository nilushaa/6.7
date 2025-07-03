import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">⏳ Yuklanmoqda...</p>;

  if (!product) return <p>Mahsulot topilmadi.</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-xl w-full bg-blue-100 rounded-lg shadow-md p-6">
        {" "}
        <div className="flex flex-col gap-6 relative">
          <div className="w-full relative">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-auto rounded-lg object-contain"
            />
            <button
              onClick={() => navigate("/")}
              className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-300 transition"
              title="Bosh sahifaga qaytish"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828773.png"
                alt="Back"
                className="w-6 h-6"
              />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="flex justify-between text-lg text-gray-800">
              <p className="font-semibold">💰 ${product.price}</p>
              <p className="text-yellow-500">⭐ {product.rating}</p>
            </div>
            <p className="text-sm text-gray-500">🏷 Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500">
              🛒 Stock: {product.stock ? product.stock : "Not Available"}
            </p>
            {product.features && product.features.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Features:
                </h2>
                <ul className="list-disc pl-6 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <button className="btn btn-primary mt-6 py-2 px-4 text-white font-semibold rounded-md shadow-sm">
              Sotib olish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
