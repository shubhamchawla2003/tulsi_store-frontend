import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { createOrder, verifyPayment } from '../services/api';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: 'India', phone: '' });

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error('Cart is empty');
    setLoading(true);
    const ok = await loadRazorpay();
    if (!ok) { setLoading(false); return toast.error('Razorpay failed to load'); }

    try {
      const orderItems = cartItems.map((i) => ({
        product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.qty,
      }));
      const { data } = await createOrder({ orderItems, shippingAddress: shipping, totalPrice });

      const options = {
        key: data.razorpayKey,
        amount: Math.round(totalPrice * 100),
        currency: 'INR',
        name: 'Tulsi Store',
        description: 'Sacred Tulsi Products',
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          try {
            await verifyPayment(data.order._id, response);
            toast.success('Payment successful!');
            clearCart();
            navigate('/');
          } catch { toast.error('Payment verification failed'); }
        },
        prefill: { contact: shipping.phone },
        theme: { color: '#2d7037' },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order creation failed');
    } finally { setLoading(false); }
  };

  if (loading) return <Loader size="lg" />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          <input name="address" value={shipping.address} onChange={handleChange} placeholder="Address" className="input-field" required />
          <input name="city" value={shipping.city} onChange={handleChange} placeholder="City" className="input-field" required />
          <input name="postalCode" value={shipping.postalCode} onChange={handleChange} placeholder="Postal Code" className="input-field" required />
          <input name="country" value={shipping.country} onChange={handleChange} placeholder="Country" className="input-field" required />
          <input name="phone" value={shipping.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" required />
          <button type="submit" className="btn-primary w-full">Pay ₹{totalPrice} with Razorpay</button>
        </form>
        <div className="bg-tulsi-50 rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          {cartItems.map((i) => (
            <div key={i._id} className="flex justify-between py-2 text-sm">
              <span>{i.name} × {i.qty}</span>
              <span>₹{i.price * i.qty}</span>
            </div>
          ))}
          <div className="border-t my-3"></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>₹{totalPrice}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
