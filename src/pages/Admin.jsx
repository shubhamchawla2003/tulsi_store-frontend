import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../services/api';

const emptyForm = { name: '', price: 0, description: '', category: 'Seeds', image: '', stock: 0, featured: false };

const Admin = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const load = async () => {
    setLoading(true);
    const { data } = await fetchProducts({});
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  if (!user?.isAdmin) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;
      if (file) {
        const fd = new FormData();
        fd.append('image', file);
        const { data } = await uploadImage(fd);
        imageUrl = data.url;
      }
      const payload = { ...form, image: imageUrl };
      if (editId) { await updateProduct(editId, payload); toast.success('Product updated'); }
      else { await createProduct(payload); toast.success('Product created'); }
      setForm(emptyForm); setEditId(null); setFile(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Action failed'); }
  };

  const handleEdit = (p) => {
    setForm(p); setEditId(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    toast.success('Product deleted');
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="bg-tulsi-50 rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="md:col-span-2 text-xl font-semibold">{editId ? 'Edit Product' : 'Add Product'}</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input-field" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="input-field" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="input-field md:col-span-2" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="md:col-span-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className="input-field md:col-span-2" required />
        <select name="category" value={form.category} onChange={handleChange} className="input-field">
          <option>Seeds</option>
          <option>Small Plants</option>
        </select>
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="input-field" required />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured Product
        </label>
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" className="btn-primary flex items-center gap-2"><FaPlus /> {editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" onClick={() => { setForm(emptyForm); setEditId(null); }} className="btn-outline">Cancel</button>}
        </div>
      </form>

      {loading ? <Loader /> : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-xl overflow-hidden">
            <thead className="bg-tulsi-100 text-left">
              <tr>
                <th className="p-3">Image</th><th className="p-3">Name</th>
                <th className="p-3">Category</th><th className="p-3">Price</th>
                <th className="p-3">Stock</th><th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-3"><img src={p.image} alt="" className="w-12 h-12 object-cover rounded" /></td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-tulsi-700 hover:text-tulsi-900"><FaEdit /></button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
