import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { addCartItem, clearCart as clearCartRequest, fetchCart, removeCartItem, updateCartItem } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const normalizeItems = (items = []) =>
    items.map((item) => ({
      ...item,
      _id: item.product?._id || item.product || item._id,
      qty: item.quantity || item.qty || 1,
    }));

  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }

      try {
        const { data } = await fetchCart();
        setCartItems(normalizeItems(data.items || []));
      } catch (error) {
        setCartItems([]);
        toast.error(error.response?.data?.message || 'Failed to load cart');
      }
    };

    loadCart();
  }, [user]);

  const syncCart = (cart) => {
    setCartItems(normalizeItems(cart.items || []));
  };

  const addToCart = async (product, qty = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const { data } = await addCartItem({ productId: product._id, quantity: qty });
      syncCart(data);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add item to cart');
    }
  };

  const removeFromCart = async (id) => {
    if (!user) return;

    try {
      const { data } = await removeCartItem(id);
      syncCart(data);
      toast.success('Item removed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not remove item');
    }
  };

  const updateQty = async (id, qty) => {
    if (!user) return;

    try {
      const { data } = await updateCartItem(id, { quantity: qty });
      syncCart(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update item');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await clearCartRequest();
      setCartItems([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not clear cart');
    }
  };

  const totalPrice = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const totalItems = cartItems.reduce((acc, i) => acc + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
