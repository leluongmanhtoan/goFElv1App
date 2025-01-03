import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "../styles/auth/signin.scss"
import COVER_IMAGE from "../assets/auth/wallpaper6.jpg"
import CodeloLogo from "../assets/codelo_logo.svg"
import FriendImage from "../assets/auth/authcover3.svg"
import Friend2Image from "../assets/auth/authcover.svg"
import { API_BASE_URL } from "../main";

const LoginPage = ({ setIsLoggedIn }) => {
    const [activeButton, setActiveButton] = useState("")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Tên đăng nhập và mật khẩu không được để trống!");
            return
        }
        setLoading(true);
        setError('');
        try {
            localStorage.removeItem('access_token');
            document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            // Gửi yêu cầu POST đến API login
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });

            // Xử lý kết quả nếu đăng nhập thành công
            console.log('Đăng nhập thành công:', response.data);

            // Bạn có thể lưu token vào localStorage hoặc context để quản lý đăng nhập
            localStorage.setItem('access_token', response.data.accessToken);
            document.cookie = `refresh_token=${response.data.refreshToken}; path=/; Secure; HttpOnly; SameSite=Strict`;
            setIsLoggedIn(true)
           // navigate("/")

            // Sau khi đăng nhập thành công, có thể điều hướng đến trang khác
            // Ví dụ: window.location.href = '/dashboard';
            window.location.href = '/'
        } catch (err) {
            // Xử lý lỗi khi đăng nhập thất bại
            setError('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMode = (button) => {
        setActiveButton(button);
    }
    return (
        <div className={`container-fluid p-0 ${activeButton} loginWrapper`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="" onSubmit={handleSubmit} className="signIn-form">
                        <h1 className="title">Đăng nhập</h1>
                        <div className="input-box">
                            <PersonOutlineOutlinedIcon className="auth-icon" />
                            <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />

                        </div>
                        <div className="input-box">
                            <LockOutlinedIcon className="auth-icon" />
                            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        </div>
                        {error && <div className="error">{error}</div>}
                        <button type="submit" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
                    </form>
                    <form action="" className="signUp-form">
                        <h1 className="title">Đăng ký</h1>
                        <div className="input-box">
                            <PersonOutlineOutlinedIcon className="auth-icon" />
                            <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />

                        </div>
                        <div className="input-box">
                            <LockOutlinedIcon className="auth-icon" />
                            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        </div>
                        
                        <button type="submit" disabled={loading}>{loading ? 'Đang đăng ký tài khoản...' : 'Đăng ký'}</button>
                    </form>
                </div>
            </div>
            <div className="d-flex panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed sunt, maiores ad nisi numquam laborum inventore temporibus quia nemo veritatis quasi perferendis doloribus iusto eligendi odit quidem nesciunt quo tempore.</p>
                        <button className={`btn btn-outline-transparent`} onClick={() => handleMode("signupmode")}>Đăng ký</button>
                    </div>
                    <img src={FriendImage} alt="" className="image" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>Have account</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed sunt, maiores ad nisi numquam laborum inventore temporibus quia nemo veritatis quasi perferendis doloribus iusto eligendi odit quidem nesciunt quo tempore.</p>
                        <button className={`btn btn-outline-transparent`} onClick={() => handleMode("signinmode")}>Đăng nhập</button>
                    </div>
                    <img src={Friend2Image} alt="" className="image" />
                </div>
            </div>
        </div>
    )
}
export default LoginPage;