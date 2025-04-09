import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Search } from 'lucide-react';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log('Failed to load categories:', err));
  }, []);

  useEffect(() => {
    const url = activeCategory
      ? `https://fakestoreapi.com/products/category/${activeCategory}`
      : 'https://fakestoreapi.com/products';
      
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Failed to load products:', err);
        setLoading(false);
      });
  }, [activeCategory]);

  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-64 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
    </div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Find products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-md border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-blue-500 sm:w-64"
          />
        </div>
        
        <select
          value={activeCategory}
          onChange={e => setActiveCategory(e.target.value)}
          className="rounded-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Products</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="group overflow-hidden rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg">
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-2 text-lg font-semibold text-blue-600">
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};