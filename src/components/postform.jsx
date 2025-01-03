import React, { useState } from "react";
import "../styles/sidebar/middleSidebar.scss"
import axios from 'axios';
import Friendtest from "../assets/auth/avt.jpg"
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { ClickAwayListener } from "@mui/material";
import Button from '@mui/material/Button';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { API_BASE_URL } from "../main";

const PostForm = ({addPost}) => {
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('public');
    const [isOpenDropDown, setOpenDropDown] = useState(false);
    const accessToken = localStorage.getItem('access_token');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto"; // Reset chiều cao trước khi tính toán
        textarea.style.height = `${textarea.scrollHeight}px`; // Điều chỉnh chiều cao theo nội dung
        setContent(textarea.value);
    };


    const handleSubmit = async () => {
        if (content.trim() === '') {
            setError("Bài viết không được để trống")
            return
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/newsfeed/post`, {
                content: content,
                privacy: selectedOption
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // Nếu cần token
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                // Xử lý thành công (ví dụ, reset nội dung input hoặc thông báo thành công)
                setContent('');
                alert('Bài viết đã được đăng!');
                console.log(response.data.data)
                addPost(response.data.data)
                const textarea = document.querySelector('textarea');
                textarea.style.height = 'auto';
                
            } else {
                setError('Đã có lỗi xảy ra khi đăng bài.');
            }
        } catch (err) {
            setError('Đã có lỗi xảy ra khi kết nối tới server.');
        } finally {
            setLoading(false); // Kết thúc quá trình tải
        }
    };
    return (
        <div className="container mt-4">
            <div className="writePost-container">
                <div className="user-profile">
                    <img src={Friendtest} alt="" />
                    <div>
                        <p>Toan Le</p>
                        <div className="ml-auto d-flex align-items-center">
                            <ClickAwayListener onClickAway={() => setOpenDropDown(false)}>
                                <ul className="mb-0 postmodeTabs">
                                    <li onClick={() => setOpenDropDown(!isOpenDropDown)}>
                                        <span>
                                            {selectedOption === "public" ? (
                                                <>
                                                    <PublicOutlinedIcon style={{ fontSize: "18px" }} />
                                                    &nbsp; Công khai
                                                    <ArrowDropDownOutlinedIcon />
                                                </>
                                            ) : (
                                                <>
                                                    <GroupOutlinedIcon style={{ fontSize: "18px" }} />
                                                    &nbsp; Bạn bè
                                                    <ArrowDropDownOutlinedIcon />
                                                </>
                                            )}
                                        </span>
                                        {isOpenDropDown && (
                                            <ul className="dropdownMenu">
                                                <li
                                                    onClick={() => {
                                                        setSelectedOption("public");
                                                        setOpenDropDown(false);
                                                    }}
                                                    style={{ cursor: "pointer", padding: "10px", display: "flex", alignItems: "center", gap: "10px" }}
                                                >
                                                    <PublicOutlinedIcon style={{ fontSize: "16px" }} />
                                                    <span style={{ userSelect: "none" }}>Công khai</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setSelectedOption("friends");
                                                        setOpenDropDown(false);
                                                    }}
                                                    style={{ cursor: "pointer", padding: "10px", display: "flex", alignItems: "center", gap: "10px" }}
                                                >
                                                    <GroupOutlinedIcon style={{ fontSize: "16px" }} />
                                                    <span style={{ userSelect: "none" }}>Bạn bè</span>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </ClickAwayListener>
                        </div>
                    </div>
                </div>
                <div className="postInput-container">
                    <textarea
                        value={content}
                        onChange={handleInput}
                        placeholder="Bạn đang nghĩ gì thế?"
                        rows={3}
                        cols={50}
                    />
                    <div className="d-flex justify-content-between align-items-center">
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            <PermMediaOutlinedIcon />
                            {loading ? 'Đang đăng...' : 'Ảnh/video'}
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Đang đăng...' : 'Đăng bài'}
                        </button>

                    </div>
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>


        </div>
    )
}

export default PostForm


