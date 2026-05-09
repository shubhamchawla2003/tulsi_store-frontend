import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login(form);
      loginUser(data);
      toast.success(`Welcome back, ${data.name.split(' ')[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-tulsi-100">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">Login to your Tulsi Store account</p>
        {loading ? <Loader /> : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" className="input-field" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="input-field" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="submit" className="btn-primary w-full">Login</button>
          </form>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-tulsi-700 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
