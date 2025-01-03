
import { useState } from "react";
import React from "react";
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { API_BASE_URL } from "../main";
const LikePopup = ({ postId, likeCount }) => {
    const [likes, setLikes] = useState([]); // Danh sách người thích
    const [loading, setLoading] = useState(false); // Trạng thái tải
    const [error, setError] = useState(null); // Lỗi nếu có
    const [showPopup, setShowPopup] = useState(false); // Hiển thị popup nhỏ
    const [showLargePopup, setShowLargePopup] = useState(false); // Hiển thị popup lớn
    const fetchLikes = async () => {
        const accessToken = localStorage.getItem('access_token'); // Hoặc lấy từ nơi khác
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/newsfeed/post/${postId}/like`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Thêm Bearer token vào header
                }
            });
            if (response.status === 200) {
                setLikes(response.data.data); // Giả sử API trả về mảng "data"
            }
        } catch (err) {
            setError("Không thể tải danh sách người thích bài viết.");
        } finally {
            setLoading(false);
        }
    };

    // Hiển thị popup nhỏ khi rê chuột
    const handleMouseEnter = () => {
        setShowPopup(true);
        fetchLikes();
    };

    // Ẩn popup nhỏ khi chuột rời
    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    // Hiển thị popup lớn khi bấm chuột
    const handleClick = () => {
        setShowLargePopup(true);
        setShowPopup(false); // Ẩn popup nhỏ khi bấm vào
    };

    // Ẩn popup lớn
    const handleCloseLargePopup = () => {
        setShowLargePopup(false);
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                style={{ textDecoration: "none", cursor: "pointer", color: "#57575B" }}
            >
                {likeCount} người thích
            </a>

            {/* Popup nhỏ khi rê chuột */}
            {showPopup && (
                <div
                    style={{
                        position: "absolute",
                        top: "25px",
                        left: "0",
                        padding: "10px",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                        borderRadius: "5px",
                        zIndex: 1000,
                        minWidth: "150px",
                        fontSize: "14px"
                    }}
                >
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                            {likes.slice(0, 5).map((like, index) => (  // Chỉ hiển thị 5 người đầu tiên
                                <li key={index} style={{ marginBottom: "5px" }}>
                                    {like.firstname} {like.lastname}
                                </li>
                            ))}
                            {likeCount > 5 && <li> và {likeCount - 5} người khác...</li>} {/* Hiển thị số người còn lại nếu có nhiều hơn 5 người */}
                        </ul>
                    )}
                </div>
            )}

            {/* Popup lớn khi bấm vào */}
            {showLargePopup && (
                <>
                    <div
                        style={{
                            position: "fixed", // Đặt cố định trên màn hình
                            top: "0", // Đặt phủ lên toàn màn hình
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.7)", // Màu trắng mờ
                            zIndex: 1000, // Đặt lớp phủ phía dưới modal
                        }}
                    />
                    <div
                        style={{
                            position: "fixed", // Đặt cố định trên màn hình
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: "20px",
                            backgroundColor: "white",
                            boxShadow: "0px 0px 15px rgba(0,0,0,0.5)",
                            borderRadius: "10px",
                            zIndex: 2000,
                            minWidth: "300px",
                            maxHeight: "400px",
                            overflowY: "auto",
                        }}
                    >
                        <button
                            onClick={handleCloseLargePopup}
                            style={{
                                position: "absolute",
                                width:"30px",
                                height:"30px",
                                top: "10px",
                                right: "10px",
                                padding: 0,
                                background: "#9b9ba3",
                                opacity: 80,
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                        >
                            <CloseOutlinedIcon/>
                        </button>
                        {loading ? (
                            <p>Đang tải...</p>
                        ) : error ? (
                            <p style={{ color: "red" }}>{error}</p>
                        ) : (
                            <ul style={{ marginTop: 30, padding: 0, listStyle: "none" }}>
                                {likes.map((like, index) => (
                                    <li key={index} style={{ marginBottom: "5px" }}>
                                        {like.firstname} {like.lastname}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default LikePopup;