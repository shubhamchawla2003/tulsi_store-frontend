import { Link } from 'react-router-dom';
import { FaLeaf, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-tulsi-800 text-white mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="flex items-center gap-2 text-xl font-bold mb-3"><FaLeaf /> Tulsi Store</h3>
        <p className="text-tulsi-100 text-sm">Bringing the sacred Tulsi plant to every Indian home â€” fresh, healthy, and authentic.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Shop</h4>
        <ul className="space-y-2 text-sm text-tulsi-100">
          <li><Link to="/products" className="hover:text-white">All Products</Link></li>
          <li><Link to="/products?category=Seeds" className="hover:text-white">Seeds</Link></li>
          <li><Link to="/products?category=Small Plants" className="hover:text-white">Plants</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Company</h4>
        <ul className="space-y-2 text-sm text-tulsi-100">
          <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          <li><a href="#" className="hover:text-white">Contact</a></li>
          <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Follow Us</h4>
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-tulsi-200"><FaInstagram /></a>
          <a href="#" className="hover:text-tulsi-200"><FaFacebook /></a>
          <a href="#" className="hover:text-tulsi-200"><FaTwitter /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-tulsi-700 py-4 text-center text-sm text-tulsi-200">
      Â© {new Date().getFullYear()} Tulsi Store. Made with í¼¿ in India.
    </div>
  </footer>
);

export default Footer;
