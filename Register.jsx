import { useState } from 'react';
import axios from 'axios';
import AuthCard from './AuthCard.jsx';

export default function Register({ switchToLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const register = async () => {
    try {
      const res = await axios.post(API + '/api/auth/register', { username: u, password: p });
      if (res.data.success) {
        alert('Registered. Please login.');
        switchToLogin();
      } else {
        alert(res.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Registration error');
    }
  };

  return (
    <AuthCard title="Create account">
      <input className="w-full p-2 border rounded mb-3" placeholder="Username" onChange={e => setU(e.target.value)} />
      <input className="w-full p-2 border rounded mb-3" placeholder="Password" type="password" onChange={e => setP(e.target.value)} />
      <button className="w-full bg-green-600 text-white p-2 rounded" onClick={register}>Register</button>
      <p className="mt-3 text-center text-sm">
        <button className="text-blue-600" onClick={switchToLogin}>Back to login</button>
      </p>
    </AuthCard>
  );
}
