import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Track total pages
  const [page, setPage] = useState(0); // Current page
  const [pageSize, setPageSize] = useState(10); // Items per page (default)
  const navigate = useNavigate();

  // Fetch categories with pagination
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/categories?page=${page}&size=${pageSize}`,
          { withCredentials: true }
        );
        setCategories(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [page, pageSize]); // Update categories when page or pageSize changes

  // Handle navigation to the next or previous page
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value)); // Update page size
    setPage(0); // Reset to the first page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Categories Dashboard</h1>
        <div className="space-x-4">
          <a
            href="http://localhost:8080/logout"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </a>
          <a
            href="http://localhost:5173/profile"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Profile
          </a>
        </div>
      </header>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="pageSize" className="mr-2 text-gray-700">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-3 py-1 border border-gray-300 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="text-gray-600">
          Page {page + 1} of {totalPages}
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <li key={category.id} className="border rounded p-4">
              <button
                onClick={() => navigate(`/products?categoryId=${category.id}`)}
                className="text-blue-500 hover:underline"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
        {categories.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No categories found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className={`px-4 py-2 rounded ${
            page === 0
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">Page {page + 1} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`px-4 py-2 rounded ${
            page === totalPages - 1
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center mt-6">
        <a
          href="/allproducts"
          className="text-blue-500 hover:underline"
        >
          All Products
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
