import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading) return <p className="p-6 text-center">⏳ Yuklanmoqda...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">❌ Xatolik: {error}</p>;
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/743/743922.png";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link to="/" className="text-purple-700 underline block mb-4">← Bosh sahifaga qaytish</Link>

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <img
        src={data.images?.[0] || defaultImage}
        alt={data.title}
        className="w-full h-64 object-contain bg-gray-100 rounded-xl mb-6"
      />

      <p className="text-gray-700 text-lg mb-4">{data.description}</p>

      <div className="bg-white shadow-md rounded-xl p-5 space-y-4 text-gray-800 text-base">
        <div><span className="mr-2">🏷️</span><strong>Brend:</strong> {data.brand}</div>
        <div><span className="mr-2">📦</span><strong>Ombordagi soni:</strong> {data.stock} dona</div>
        <div><span className="mr-2">💵</span><strong>Narxi:</strong> ${data.price}</div>
        <div><span className="mr-2">⭐</span><strong>Reyting:</strong> {data.rating}</div>
        <div><span className="mr-2">🗂️</span><strong>Kategoriya:</strong> {data.category}</div>
      </div>
    </div>
  );
}
