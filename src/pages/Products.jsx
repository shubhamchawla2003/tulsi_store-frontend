import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { fetchProducts } from '../services/api';

const categories = ['All', 'Seeds', 'Small Plants'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    setLoading(true);
    fetchProducts({ keyword, category }).then((res) => setProducts(res.data)).catch(() => {}).finally(() => setLoading(false));
    const params = {};
    if (keyword) params.keyword = keyword;
    if (category !== 'All') params.category = category;
    setSearchParams(params);
  }, [keyword, category, setSearchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop Tulsi</h1>
      <p className="text-gray-600 mb-8">Browse our collection of seeds and plants</p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={keyword}
            onChange={(e) => setKeyword(e.target.value)} className="input-field pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-lg font-medium transition ${category === c ? 'bg-tulsi-600 text-white' : 'bg-tulsi-50 text-tulsi-700 hover:bg-tulsi-100'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {loading ? <Loader /> : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Products;
