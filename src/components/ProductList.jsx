import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { debounce } from "lodash";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Parse categoryId from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("categoryId");
    if (categoryId) {
      setSelectedCategories([{ id: Number(categoryId), name: "" }]);
    }
  }, []);

  // Fetch categories for Multiselect dropdown
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

        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get("categoryId");
        if (categoryId) {
          const selectedCategory = categoryOptions.find(
            (category) => category.id === Number(categoryId)
          );
          if (selectedCategory) {
            setSelectedCategories([selectedCategory]);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async (updatedPage = page, updatedQuery = searchQuery, isSearchTriggered = false) => {
    try {
      if (!isSearchTriggered) {
        let url = `http://localhost:8080/products?page=${updatedPage}&size=${pageSize}`;
        if (updatedQuery.trim()) {
          url += `&q=${encodeURIComponent(updatedQuery)}`;
        }
        if (selectedCategories.length > 0) {
          const categoryIds = selectedCategories.map((category) => category.id).join(",");
          url += `&categoryIds=${categoryIds}`;
        }
        const response = await axios.get(url, { withCredentials: true });
        setProducts(response.data.content || []);
        setAllProducts(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setPage(updatedPage);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when categories or pagination change
  useEffect(() => {
    fetchProducts(page, searchQuery, false);
    const  fetchAllProducts = async () => {
      const response = await axios.get("http://localhost:8080/products", { withCredentials: true });
      setAllProducts(response.data.content || []);
    } 
    fetchAllProducts();
  }, [selectedCategories, pageSize, page]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const updatedQuery = e.target.value.toLowerCase();
    setSearchQuery(updatedQuery);

    // Parse and apply conditions
    const priceMatch = updatedQuery.match(/under\s+(\d+)|below\s+(\d+)/i);
    const extractedPrice = priceMatch ? Number(priceMatch[1] || priceMatch[2]) : null;

    let filteredProducts = allProducts;

    // Apply price filtering
    if (extractedPrice) {
      filteredProducts = filteredProducts.filter((product) => product.mrp <= extractedPrice);
    }

    // Apply category filtering based on the query
    const queryWithoutPrice = updatedQuery.replace(/under\s+\d+|below\s+\d+/i, "").trim();
    if (queryWithoutPrice) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(queryWithoutPrice)
      );
    }

    setProducts(filteredProducts);
  };

  // Handle category selection
  const handleSelect = (selectedList) => {
    setSelectedCategories(selectedList);
    setPage(0);
  };

  // Handle category removal
  const handleRemove = (selectedList) => {
    setSelectedCategories(selectedList);
    setPage(0);
  };

  // Handle page navigation
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Products</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search e.g., 'toy below 100', 'book under 200'"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full mb-4 p-3 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:ring-blue-200"
      />
      <div className="w-full flex flex-row justify-between">

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

        {/* Page Size Selector */}
        <div className="flex items-center justify-end mb-4">
          <label htmlFor="pageSize" className="mr-2 text-gray-600">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="p-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">MRP</th>
              <th className="px-4 py-2 border">Discount Price</th>
              <th className="px-4 py-2 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{product.id}</td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">${product.mrp}</td>
                  <td className="px-4 py-2 border">${product.discountPrice}</td>
                  <td className="px-4 py-2 border">
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
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className={`px-4 py-2 rounded ${
            page === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`px-4 py-2 rounded ${
            page === totalPages - 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
