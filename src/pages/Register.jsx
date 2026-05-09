import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await register(form);
      loginUser(data);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-tulsi-100">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-6">Join the Tulsi family</p>
        {loading ? <Loader /> : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" className="input-field" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input type="email" placeholder="Email" className="input-field" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password (min 6 chars)" className="input-field" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={6} required />
            <button type="submit" className="btn-primary w-full">Sign Up</button>
          </form>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-tulsi-700 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
