import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { fetchProduct } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct(id).then((res) => setProduct(res.data)).catch(() => navigate('/products')).finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Loader size="lg" />;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-tulsi-700 mb-6 hover:underline">
        <FaArrowLeft /> Back
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-tulsi-50 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover aspect-square" />
        </div>
        <div>
          <span className="text-sm text-tulsi-700 bg-tulsi-50 px-3 py-1 rounded-full">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            <FaStar />
            <span className="text-gray-700 font-medium">{product.rating}</span>
            <span className="text-gray-400">({product.numReviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-tulsi-700 mt-4">₹{product.price}</p>
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex items-center gap-2 mt-4">
            <FaCheckCircle className={product.stock > 0 ? 'text-tulsi-600' : 'text-red-500'} />
            <span className="font-medium">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
          </div>
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 hover:bg-gray-100">−</button>
                <span className="px-4 font-semibold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-4 py-2 hover:bg-gray-100">+</button>
              </div>
              <button onClick={() => addToCart(product, qty)} disabled={!user} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
