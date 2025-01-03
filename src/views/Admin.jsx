import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from "../main";
const Logout = ()=>{
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1]; // Lấy refresh token từ cookie HttpOnly
        
    axios.post(`${API_BASE_URL}/auth/logout`,{
        accessToken:accessToken,
        refreshToken:refreshToken
    })

    .then(response => {
        if (response.status === 200) {
            // Xóa access token khỏi localStorage và điều hướng
            localStorage.removeItem('access_token');
            document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            window.location.href = '/login'; // Điều hướng về trang đăng nhập
        }
    })
    .catch(error => {
        console.error('Logout error:', error);
    });
}

const AdminPage = ()=>{
    return (
        <>
        <h1>Hello Admin</h1>
        <Button onClick={Logout}>Đăng xuất</Button>
        </>
    )
}
export default AdminPage