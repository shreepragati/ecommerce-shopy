import React, { useEffect, useState } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate, useLocation } from "react-router-dom";

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Default rows per page
  const [userRowLimit, setUserRowLimit] = useState(10); // Tracks the selected row limit

  const navigate = useNavigate();
  const location = useLocation();

  // Update URL whenever the page changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, navigate, location.search]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryIds = selectedCategories.map((category) => category.id).join(",");
        const response = await axios.get(
          `http://localhost:8080/products?page=${page}&size=${pageSize}${
            categoryIds ? `&categoryIds=${categoryIds}` : ""
          }`,
          { withCredentials: true }
        );
        const fetchedProducts = response.data.content || [];
        setProducts(fetchedProducts);
        setAllProducts(fetchedProducts);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [page, pageSize, selectedCategories]);

  // Fetch categories for Multiselect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories", {
          withCredentials: true,
        });
        const categoryOptions = response.data.content.map((category) => ({
          name: category.name,
          id: category.id,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category selection
  const handleSelect = (selectedList) => {
    setSelectedCategories(selectedList);
    setPage(0);
  };

  const handleRemove = (selectedList) => {
    setSelectedCategories(selectedList);
    setPage(0);
  };

  const handleAllProducts = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setPage(0);
    setProducts(allProducts); // Reset the product list
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const updatedQuery = e.target.value.toLowerCase();
    setSearchQuery(updatedQuery);

    let filteredProducts = allProducts;

    const underMatch = updatedQuery.match(/under\s+(\d+)/i);
    const belowMatch = updatedQuery.match(/below\s+(\d+)/i);
    const betweenMatch = updatedQuery.match(/between\s+(\d+)\s+and\s+(\d+)/i);

    if (underMatch) {
      const maxPrice = parseInt(underMatch[1], 10);
      filteredProducts = filteredProducts.filter(
        (product) => product.mrp <= maxPrice
      );
    } else if (belowMatch) {
      const maxPrice = parseInt(belowMatch[1], 10);
      filteredProducts = filteredProducts.filter(
        (product) => product.mrp <= maxPrice
      );
    } else if (betweenMatch) {
      const minPrice = parseInt(betweenMatch[1], 10);
      const maxPrice = parseInt(betweenMatch[2], 10);
      filteredProducts = filteredProducts.filter(
        (product) => product.mrp >= minPrice && product.mrp <= maxPrice
      );
    } else {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(updatedQuery)
      );
    }

    setProducts(filteredProducts);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  // Handle user row limit change
  const handleRowLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setUserRowLimit(newLimit);
    setPageSize(newLimit);
    setPage(0); // Reset to the first page when limit changes
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        All Products
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
      />

      {/* Category Filter */}
      <Multiselect
        options={categories}
        selectedValues={selectedCategories}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue="name"
        placeholder="Filter by category"
        className="mb-4"
      />

      <button
        onClick={handleAllProducts}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        All Products
      </button>

      {/* Row Limit Selector */}
      <div className="mt-4">
        <label htmlFor="row-limit" className="text-gray-700 font-medium">
          Rows per page:
        </label>
        <select
          id="row-limit"
          value={userRowLimit}
          onChange={handleRowLimitChange}
          className="ml-2 border border-gray-300 p-2 rounded-md"
        >
          {[10, 20, 50, 100].map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse border border-gray-200 bg-white shadow-md">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">MRP</th>
              <th className="border border-gray-300 px-4 py-2">Discount Price</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.mrp}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.discountPrice}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.category?.name || "Uncategorized"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className={`px-4 py-2 rounded-md ${
            page === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="mx-4 text-gray-700">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`px-4 py-2 rounded-md ${
            page === totalPages - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProductList;
