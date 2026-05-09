import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkout = () => navigate(user ? '/checkout' : '/login');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <FaShoppingBag className="text-6xl text-tulsi-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-600 mt-2">Add some Tulsi love to your cart!</p>
        <Link to="/products" className="btn-primary mt-6 inline-block">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 bg-white border rounded-xl p-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <Link to={`/product/${item._id}`} className="font-semibold hover:text-tulsi-700">{item.name}</Link>
                <p className="text-tulsi-700 font-bold mt-1">₹{item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border rounded-lg text-sm">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-3 py-1">−</button>
                    <span className="px-3">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-3 py-1">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="font-bold">₹{item.price * item.qty}</div>
            </div>
          ))}
        </div>
        <div className="bg-tulsi-50 rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between py-2"><span>Subtotal</span><span>₹{totalPrice}</span></div>
          <div className="flex justify-between py-2"><span>Shipping</span><span className="text-tulsi-700">Free</span></div>
          <div className="border-t my-3"></div>
          <div className="flex justify-between py-2 font-bold text-lg"><span>Total</span><span>₹{totalPrice}</span></div>
          <button onClick={checkout} className="btn-primary w-full mt-4">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
