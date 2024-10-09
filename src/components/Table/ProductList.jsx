import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("low to high");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    const sorted = filtered.sort((a, b) => {
      return sortOrder === "low to high"
        ? a.price - b.price
        : b.price - a.price;
    });

    setFilteredProducts(sorted);
  }, [searchTerm, sortOrder, selectedCategory, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="flex mb-4 space-x-4">
        <div className="flex-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search for Item
          </label>
          <input
            type="text"
            id="search"
            placeholder="🔍 Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700"
          >
            Sort by Price
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="low to high">Price: Low to High</option>
            <option value="high to low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="All">All</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>
      <table className="min-w-full border-l border-r border-gray-200 rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2">Image</th>
      <th className="p-2">Category</th>
      <th className="p-2">Title</th>
      <th className="p-2">Description</th>
      <th className="p-2">Price</th>
    </tr>
  </thead>
  <tbody>
    {currentProducts.map((product) => (
      <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
        <td className="p-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 object-cover rounded-full"
          />
        </td>
        <td className="p-2">{product.category}</td>
        <td className="p-2">{product.title}</td>
        <td className="p-2">
          {product.description.length > 50
            ? product.description.substring(0, 50) + "..." // Обрезаем описание для удобства
            : product.description}
        </td>
        <td className="p-2 text-blue-600">${product.price}</td>
      </tr>
    ))}
  </tbody>
</table>
      {/* Pagination Controls */}
      <div className="flex justify-between border-t items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center p-2 rounded disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            color={"#000000"}
            fill={"none"}
            className="mr-2" // добавляем отступ справа для иконки
          >
            <path
              d="M3.99982 11.9998L19.9998 11.9998"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Previous
        </button>

        <div className="flex items-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-2 py-1 rounded-full ${
                currentPage === index + 1 ? "bg-gray-100 " : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="flex items-center p-2 rounded disabled:opacity-50"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            color={"#000000"}
            fill={"none"}
            className="ml-2" // добавляем отступ слева для иконки
          >
            <path
              d="M20.0001 11.9998L4.00012 11.9998"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.0003 17C15.0003 17 20.0002 13.3176 20.0002 12C20.0002 10.6824 15.0002 7 15.0002 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
