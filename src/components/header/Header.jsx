import React, { useEffect, useRef, useState } from 'react';
import CodeloLogo from "../../assets/codelo_logo.svg"
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import "../../styles/header/header.scss"
import { ClickAwayListener } from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
const Header = () => {
    const logout = () => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('refresh_token='))
            ?.split('=')[1]; // Lấy refresh token từ cookie HttpOnly

        axios.post(`${API_BASE_URL}/auth/logout`, {
            accessToken: accessToken,
            refreshToken: refreshToken
        })
            .then(response => {
                if (response.status === 200) {
                    // Xóa access token khỏi localStorage và điều hướng
                    localStorage.removeItem('access_token');
                    
                    window.location.href = '/login'; // Điều hướng về trang đăng nhập
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    }
    const headerRef = useRef();
    const [isOpenDropDown, setOpenDropDown] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            let position = window.pageYOffset
            console.log(position)
            if (position > 100) {
                headerRef.current.classList.add('fixed')
            } else {
                headerRef.current.classList.remove('fixed')
            }
        })
    }, [])

    return (
        <>
            <div className="headerWrapper" ref={headerRef}>
                <header>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-1 d-flex justify-content-center align-items-center">
                                <img src={CodeloLogo} alt="codelologo" style={{ width: '300px', height: '60px' }} />
                            </div>
                            <div className="col-sm-5">
                                <div className="headerSearch d-flex align-item-center">
                                    <div className="search">
                                        <SearchIcon className='searchIcon cursor' />
                                        <input type="text" placeholder="Tìm kiếm bạn bè..." />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 d-flex align-items-center">
                                <div className="ml-auto d-flex align-items-center">
                                    <ClickAwayListener onClickAway={() => setOpenDropDown(false)}>
                                        <ul className="list list-inline mb-0 headerTabs">
                                            <li className="list-inline-item">
                                                <span>
                                                    <CircleNotificationsIcon style={{ fontSize: 40, marginRight: 10 }} />
                                                </span>
                                            </li>
                                            <li className='list-inline-item'>
                                                <span onClick={() => setOpenDropDown(!isOpenDropDown)}>
                                                    <AccountCircleIcon style={{ fontSize: 40, marginRight: 10 }} />
                                                </span>
                                                {
                                                    isOpenDropDown !== false &&
                                                    <ul className='dropdownMenu'>
                                                        <li><Button className='align-items-center'><AssignmentIndOutlinedIcon /> Xem trang cá nhân</Button></li>
                                                        <li><Button><SettingsSuggestOutlinedIcon /> Cài đặt</Button></li>
                                                        <li><Button onClick={logout}><LogoutOutlinedIcon /> Đăng xuất</Button></li>
                                                    </ul>
                                                }
                                            </li>
                                        </ul>
                                    </ClickAwayListener>
                                </div>
                            </div>
                        </div>


                    </div>
                </header>
            </div>
            <div className='afterHeader'></div>
        </>
    )
}

export default Header