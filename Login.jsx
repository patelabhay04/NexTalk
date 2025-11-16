import { useState } from 'react';
import axios from 'axios';
import AuthCard from './AuthCard.jsx';

export default function Login({ setToken, setUser, switchToRegister }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const login = async () => {
    try {
      const res = await axios.post(API + '/api/auth/login', { username: u, password: p });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login error');
    }
  };

  return (
    <AuthCard title="Welcome back">
      <input className="w-full p-2 border rounded mb-3" placeholder="Username" onChange={e => setU(e.target.value)} />
      <input className="w-full p-2 border rounded mb-3" placeholder="Password" type="password" onChange={e => setP(e.target.value)} />
      <button className="w-full bg-blue-600 text-white p-2 rounded" onClick={login}>Login</button>
      <p className="mt-3 text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>
        <button className="text-blue-600 ml-2" onClick={switchToRegister}>Create one</button>
      </p>
    </AuthCard>
  );
}
