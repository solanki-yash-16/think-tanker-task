import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../utils/api.js";
import { debounce } from "../utils/helpers.js";
import ProductCard from "../components/product/ProductCard.jsx";
import SearchBar from "../components/product/SearchBar.jsx";
import Pagination from "../components/product/Pagination.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadProducts = async (page = 1, search = "", category = "") => {
    setLoading(true);
    try {
      const response = await fetchProducts(page, 10, search, category);
      setProducts(response.products);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadProducts = debounce(loadProducts, 300);

  useEffect(() => {
    loadProducts(1, searchQuery, selectedCategory);
  }, []);

  useEffect(() => {
    const handleSearch = (event) => {
      const query = event.detail;
      setSearchQuery(query);
      setCurrentPage(1);
      debouncedLoadProducts(1, query, selectedCategory);

      // Update URL
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      setSearchParams(params);
    };

    window.addEventListener("searchProducts", handleSearch);
    return () => window.removeEventListener("searchProducts", handleSearch);
  }, [selectedCategory, setSearchParams, debouncedLoadProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    loadProducts(1, query, selectedCategory);

    // Update URL
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    setSearchParams(params);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    loadProducts(1, searchQuery, category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadProducts(page, searchQuery, selectedCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover our complete collection of premium products
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-300">
          {loading ? "Loading..." : `${total} products found`}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
            No products found
          </p>
          <p className="text-gray-400 dark:text-gray-500">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
