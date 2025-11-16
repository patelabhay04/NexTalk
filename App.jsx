import { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Chat from './components/Chat.jsx';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [mode, setMode] = useState('login'); // or register

  if (!token) {
    return mode === 'login' ? <Login setToken={setToken} setUser={setUser} switchToRegister={() => setMode('register')} /> : <Register switchToLogin={() => setMode('login')} />;
  }

  return <Chat token={token} user={user} logout={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(''); setUser(null); }} />;
}
