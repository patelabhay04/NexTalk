import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

export default function Chat({ token, user, logout }) {
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [text, setText] = useState('');
  const [privateTo, setPrivateTo] = useState('');
  const socketRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    // fetch history
    axios.get(API + '/api/messages?limit=200')
      .then(res => { if (res.data.success) setMessages(res.data.messages || []); })
      .catch(err => console.error(err));

    // connect socket
    socketRef.current = io(API);
    const socket = socketRef.current;
    socket.emit('registerUser', user.username);
    socket.emit('joinUserRoom', user.username);

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    socket.on('privateMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    socket.on('onlineUsers', (list) => setOnlineUsers(list));

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    // scroll down
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const sendPublic = () => {
    if (!text.trim()) return;
    socketRef.current.emit('sendMessage', { sender: user.username, text, group: null });
    setText('');
  };

  const sendPrivate = () => {
    if (!text.trim() || !privateTo) return alert('Select a user to send a private message');
    socketRef.current.emit('privateMessage', { sender: user.username, receiver: privateTo, text });
    setText('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="chat-layout">
        <div className="card col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Public Chat</h3>
            <div>
              <span className="mr-4 text-sm text-gray-600">Signed in as <b>{user.username}</b></span>
              <button className="text-sm text-red-600" onClick={logout}>Logout</button>
            </div>
          </div>

          <div ref={boxRef} className="h-96 overflow-y-auto border rounded p-3">
            {messages.map((m) => (
              <div key={m._id} className={"message " + (m.sender === user.username ? 'me' : '')}>
                <div className="bubble " style={{ background: m.sender === user.username ? '#dcfce7' : '#f1f5f9' }}>
                  <div className="text-xs text-gray-500">{m.sender} {m.receiver ? '(private)' : ''}</div>
                  <div>{m.text}</div>
                  <div className="text-xs text-gray-400">{new Date(m.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input className="flex-1 p-2 border rounded" placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendPublic(); }} />
            <button className="px-4 bg-blue-600 text-white rounded" onClick={sendPublic}>Send</button>
            <button className="px-4 bg-indigo-600 text-white rounded" onClick={sendPrivate}>Send Private</button>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">Online</h4>
          <ul>
            {onlineUsers.map((u) => (
              <li key={u} className="flex justify-between items-center py-1">
                <span>{u}</span>
                <button className="text-sm text-blue-600" onClick={() => setPrivateTo(u)}>Chat</button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h5 className="text-sm text-gray-600">Private to: <b>{privateTo || '—'}</b></h5>
            <p className="text-xs text-gray-500 mt-2">Select a user from the list to send private messages. Private messages are visible only to you and the recipient.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
