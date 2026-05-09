import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaLeaf } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors ${isActive ? 'text-tulsi-700' : 'text-gray-700 hover:text-tulsi-600'}`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-tulsi-700">
          <FaLeaf className="text-tulsi-600" /> Tulsi Store
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Shop</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <Link to={user ? '/cart' : '/login'} className="relative text-gray-700 hover:text-tulsi-600">
            <FaShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-tulsi-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              {user.isAdmin && <Link to="/admin" className="text-sm text-tulsi-700 font-medium">Admin</Link>}
              <span className="text-sm text-gray-600">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-red-600 hover:underline">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-1 text-gray-700 hover:text-tulsi-600">
              <FaUser size={18} /> Login
            </Link>
          )}
          <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <NavLink to="/" className="block py-1" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="block py-1" onClick={() => setOpen(false)}>Shop</NavLink>
          <NavLink to="/about" className="block py-1" onClick={() => setOpen(false)}>About</NavLink>
          {user ? (
            <>
              {user.isAdmin && <NavLink to="/admin" className="block py-1" onClick={() => setOpen(false)}>Admin</NavLink>}
              <button onClick={() => { logout(); setOpen(false); navigate('/'); }} className="text-red-600">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="block py-1" onClick={() => setOpen(false)}>Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
