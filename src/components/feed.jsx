import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from "react";
import LikePopup from './popup';
import "../styles/sidebar/middleSidebar.scss"
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PostForm from './postform';
import { NightShelter, RepeatOneSharp } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from '@mui/material/Skeleton';
import { API_BASE_URL } from '../main';

const Feed = ({ newPost, setNewPost }) => {
  const accessToken = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(false); // State để theo dõi trạng thái tải
  const [error, setError] = useState(null); // State để lưu thông báo lỗi nếu có
  const [offset, setOffset] = useState(0); // Biến lưu offset
  const limit = 5; // Số lượng bài viết mỗi lần tải thêm
  const [hasMore, setHasMore] = useState(true)

  // Hàm gọi API để lấy danh sách bài viết
  //const scrollPosition = useRef(0);

  const fetchPosts = useCallback(async (offset) => {
    // Ngăn gọi API khi đang tải
    if (loading) {
      return
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/newsfeed?limit=${limit}&offset=${offset}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Token nếu cần
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const dataResp = response.data.data
        console.log(response.data.data)
        if (!dataResp || dataResp.length === 0) {
          setHasMore(false)
          return
        }
        const newPosts = dataResp.map(post => ({ ...post, comments: [] }));
        setNewPost((prevPosts) => {
          const filteredPosts = newPosts.filter(
            (post) => !prevPosts.some((prevPost) => prevPost.postId === post.postId)
          );

          return [...prevPosts, ...filteredPosts];
        })
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra khi tải bài viết.');
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  }, []); //[accessToken, limit, setNewPost]);


  useEffect(() => {
    fetchPosts(offset);
  }, [fetchPosts, offset]);


  // Hàm xử lý like bài viết
  const handleLike = async (postId) => {
    if (!newPost) return;
    const updatedPosts = newPost.map(post => {
      if (post.postId === postId) {
        const updatedLikeCount = post.liked ? post.likeCount - 1 : post.likeCount + 1;
        return { ...post, liked: !post.liked, likeCount: updatedLikeCount };
      }
      return post;
    });

    setNewPost(updatedPosts); // Cập nhật bài viết với trạng thái mới

    try {
      const response = await axios.post(`${API_BASE_URL}/newsfeed/post/${postId}/like`, null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status !== 200) {
        // Nếu API không trả về thành công, hoàn lại trạng thái cũ
        setNewPost(newPost);
      }
    } catch (err) {
      // Nếu có lỗi trong khi gọi API, hoàn lại trạng thái cũ
      setNewPost(newPost);
      setError('Đã có lỗi xảy ra khi thích bài viết.');
    }
  };

  // Hiển thị khi có lỗi
  if (error) {
    return <div>{error}</div>;
  }

  const fetchComments = async (postId) => {
    // Ngăn gọi API khi đang tải
    if (loading) {
      return
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/newsfeed/post/${postId}/comments`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Token nếu cần
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const newComments = response.data.data
        setNewPost((prevPosts) =>
          prevPosts.map(post =>
            post.postId === postId ? { ...post, comments: newComments } : post
          ));
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra khi tải bài viết.');
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };

  const handleCommentChange = (postId, value) => {
    console.log(value)
    setNewPost((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, commentInput: value } : post
      )
    )
    /*const textarea = e.target;
    textarea.style.height = "auto"; // Reset chiều cao trước khi tính toán
    textarea.style.height = `${textarea.scrollHeight}px`; // Điều chỉnh chiều cao theo nội dung
    setCommentContent(textarea.value);*/
  };

  const handleCommentSubmit = async (postId) => {
    const post = newPost.find((p) => p.postId === postId)
    if (!post.commentInput) {
      return
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/newsfeed/post/${postId}/comment`, {
        content: post.commentInput,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Nếu cần token
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // Xử lý thành công (ví dụ, reset nội dung input hoặc thông báo thành công)
        //setCommentContent('');
        alert('Bài viết đã được đăng!');
        const newComment = response.data.data
        setNewPost((prevPosts) =>
          prevPosts.map((post) => post.postId === postId ? { ...post, comments: [newComment, ...post.comments], commentInput: '' } : post)
        )

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
    <div>
      <div className="container mt-4">
        <InfiniteScroll
          dataLength={newPost.length}
          next={() => {
            if (!loading && hasMore) {
              setOffset((prevOffset) => prevOffset + limit)
            }
          }}
          hasMore={hasMore}
          loader={
            Array.from(new Array(limit)).map((_, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <Skeleton variant="rectangular" height={40} />
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={20} />
                </div>
              </div>
            ))
          }
          endMessage={<p className="text-muted">Không còn bài viết nào để hiển thị.</p>}>
          {console.log(newPost.length, hasMore)}
          {
            newPost.map((post, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className='feedHeader'>
                    <span className='avatar-img'>
                      <img
                        src={post.avatarUrl || "https://via.placeholder.com/40"} // Avatar người dùng
                        alt="avatar"
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </span>
                    <span className='ownerPost'>
                      <strong>
                        {post.firstname} {post.lastname}
                      </strong>
                      <div className="timeline text-muted small">
                        {new Date(post.createdAt).toLocaleString()}
                        <span>. {post.privacy === "public" ? <PublicOutlinedIcon style={{ fontSize: "18" }} /> : post.privacy === "friends" ? <GroupOutlinedIcon style={{ fontSize: "18" }} /> : ""}</span>
                      </div>

                    </span>
                    <div className='postBody'>
                      <p className="card-text">{post.content}</p>
                    </div>
                  </div>
                  <div className='interactCount d-flex justify-content-between align-items-center"'>
                    <span className='me-auto' style={{ paddingTop: "5px" }}>
                      {post.likeCount <= 0 ? "" : (
                        <>
                          <ThumbUpIcon style={{ fontSize: "18" }} />
                          &nbsp;
                          <LikePopup postId={post.postId} likeCount={post.likeCount} />
                        </>
                      )
                      }
                    </span>
                    <div className='d-flex gap-3'>
                      <span>{post.commentCount} Bình luận</span>
                      &nbsp;
                      &nbsp;
                      <span>{post.shareCount} Chia sẻ</span>
                    </div>

                  </div>
                  <div className="interactPanel d-flex">
                    <button className={`${post.liked ? "liked" : ""} btn custom-button btn-primary btn-lg flex-fill`} onClick={() => handleLike(post.postId)}>
                      {post.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                      Thích</button>
                    <button className="btn custom-button btn-primary btn-lg flex-fill" onClick={() => fetchComments(post.postId)}><CommentOutlinedIcon />Bình luận</button>
                    <button className="btn custom-button btn-primary btn-lg flex-fill"><ShareOutlinedIcon />Chia sẻ</button>
                  </div>
                  <div className='comment-container'>
                    Xem thêm bình luận
                    {post.comments && post.comments.map((cmt, cmtindex) => (
                      <div key={cmtindex} className="commentcard mb-3">
                        <span className='avatar-img'>
                          <img src={cmt.avatarUrl || "https://via.placeholder.com/40"} alt="avatar" className="rounded-circle me-2" style={{ width: "40px", height: "40px" }} />
                        </span>
                        <div>
                          <strong>{cmt.firstname} {cmt.lastname}</strong>
                          <p>{cmt.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='commentInput-container'>
                    <textarea
                      value={post.commentInput || ''}
                      onChange={(e) => handleCommentChange(post.postId, e.target.value)}
                      placeholder="Viết bình luận..."
                      rows={1}
                      cols={50}
                    />
                    <button onClick={() => handleCommentSubmit(post.postId)}>Gửi</button>
                  </div>
                </div>
              </div>
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;