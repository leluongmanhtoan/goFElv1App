import { useState, useEffect } from 'react'
import reactLogo from '../assets/codelo_logo.svg'
import viteLogo from '../assets/codelo_logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import LoginPage from './Login'
import AdminPage from './Admin'
import HomePage from './Home'
import axios from "axios";
import { API_BASE_URL } from '../main'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    // Nếu không có access token, coi như chưa đăng nhập
    if (!accessToken) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    // Gọi API để kiểm tra tính hợp lệ của token
    axios
      .post(`${API_BASE_URL}/auth/validate`,null,{
        headers: {
          Authorization: `Bearer ${accessToken}`, // Thêm Bearer token vào header
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true); // Token hợp lệ
        } else {
          setIsLoggedIn(false); // Token không hợp lệ
        }
      })
      .catch(() => {
        setIsLoggedIn(false); // Lỗi khi kiểm tra token
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><LoginPage setIsLoggedIn={setIsLoggedIn} /></PublicRoute>} />
        <Route path="/admin" element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
