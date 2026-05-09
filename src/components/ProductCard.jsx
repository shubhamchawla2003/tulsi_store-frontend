import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      <Link to={`/product/${product._id}`}>
        <div className="aspect-square overflow-hidden bg-tulsi-50">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs text-tulsi-700 bg-tulsi-50 px-2 py-1 rounded-full">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-2 font-serif text-lg font-semibold text-gray-900 hover:text-tulsi-700 line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 text-sm text-yellow-500">
          <FaStar />
          <span className="text-gray-700">{product.rating}</span>
          <span className="text-gray-400">({product.numReviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-tulsi-700">₹{product.price}</span>
          <button onClick={() => addToCart(product)} disabled={product.stock === 0 || !user}
            className="bg-tulsi-600 hover:bg-tulsi-700 text-white p-2 rounded-full transition disabled:opacity-50">
            <FaShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
