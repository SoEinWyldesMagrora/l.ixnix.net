import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQgPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMGEyOCAyOCAwIDEgMCAtNTYgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlN2ZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=')] bg-repeat">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/:username" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;