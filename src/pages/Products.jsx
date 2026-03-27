import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { insforge } from '../lib/insforge';

const Products = ({ category }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await insforge.database.from('products').select('*').eq('category', category);
      
      if (data) {
        let result = [...data];
        
        if (sortBy === 'price-low') {
          result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          result.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category, sortBy]);

  return (
    <div className="products-page">
      <div className="category-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={category}
            className="category-title"
          >
            {category.toUpperCase()}
          </motion.h1>
          <p className="category-description">
            Explore our curated selection of premium {category}'s apparel, designed for the modern individual who values quality and style.
          </p>
        </div>
      </div>

      <div className="container filters-container">
        <div className="filters-bar">
          <div className="results-count">{filteredProducts.length} PRODUCTS</div>
          <div className="sort-wrapper">
            <span>SORT BY:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">NEWEST</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container product-grid-container">
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .products-page {
          padding-top: var(--header-height);
        }

        .category-header {
          padding: 80px 0 40px;
          text-align: center;
          background: var(--bg-secondary);
          margin-bottom: 40px;
        }

        .category-title {
          font-size: 60px;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
        }

        .category-description {
          max-width: 600px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .filters-container {
          margin-bottom: 40px;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .sort-wrapper select {
          background: none;
          border: none;
          font-family: inherit;
          font-weight: 700;
          margin-left: 10px;
          cursor: pointer;
          outline: none;
        }

        .product-grid-container {
          padding-bottom: 120px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 40px 30px;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .category-title {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
