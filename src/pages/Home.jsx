import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShippingFast, FaHeart, FaSeedling } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { fetchFeatured } from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured().then((res) => setFeatured(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-tulsi-50 via-white to-tulsi-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-tulsi-700 bg-tulsi-100 px-3 py-1 rounded-full text-sm font-medium">
              <FaLeaf /> 100% Authentic Tulsi
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Sacred <span className="text-tulsi-700">Tulsi</span> for<br />Every Home
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-md">
              Premium quality Tulsi seeds and saplings — grown with love, delivered fresh to your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">Shop Now</Link>
              <Link to="/about" className="btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800" alt="Tulsi plant" className="rounded-3xl shadow-2xl w-full" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <FaSeedling />, title: 'Fresh Seeds', desc: '90% germination rate' },
          { icon: <FaShippingFast />, title: 'Fast Delivery', desc: 'Pan-India shipping' },
          { icon: <FaHeart />, title: 'Loved by 5000+', desc: 'Happy customers' },
          { icon: <FaLeaf />, title: 'Organic', desc: 'Chemical-free growing' },
        ].map((f, i) => (
          <div key={i} className="text-center p-4 hover:bg-tulsi-50 rounded-xl transition">
            <div className="text-4xl text-tulsi-600 flex justify-center mb-3">{f.icon}</div>
            <h4 className="font-semibold text-gray-900">{f.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-600 mt-2">Handpicked favorites from our collection</p>
        </div>
        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/products" className="btn-outline">View All Products</Link>
        </div>
      </section>

      <section className="bg-tulsi-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FaLeaf className="text-5xl text-tulsi-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Tulsi?</h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Known as the "Queen of Herbs", Tulsi (Holy Basil) is revered for its medicinal,
            spiritual, and air-purifying properties. A single Tulsi plant at home brings positivity,
            health, and a touch of divinity into your daily life.
          </p>
          <Link to="/about" className="btn-primary mt-6 inline-block">Read More</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
