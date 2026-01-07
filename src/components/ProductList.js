import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 6;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        // Make sure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, []);

  // Filter products by search text (with safety check)
  const filtered = Array.isArray(products) 
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="product-list-container">
      <h1>Shop Products</h1>

      <input
        type="text"
        placeholder="Search product by title..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to page 1 on search change
        }}
        className="search-bar"
      />

      <div className="product-grid">
        {paginated.length === 0 ? (
          <p>No products found.</p>
        ) : (
          paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
