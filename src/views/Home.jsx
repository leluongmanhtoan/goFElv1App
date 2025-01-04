import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import PostForm from '../components/postform';
import Feed from '../components/feed';
import Header from '../components/header/Header';
import LeftSidebar from '../components/sidebar/LeftSidebar';
import "../styles/page/home.scss"
import StoryBar from '../components/story';
import { Navigate } from "react-router-dom";

const HomePage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [post, setPost] = useState([]);
    const addNewPost = (newPost) => {
        const postWithComments = { ...newPost, comments: [] };
        setPost((prevPosts) => {
            return [postWithComments, ...prevPosts]
        });
    };
    return (
        <div>
            {isLoggedIn ? (
                <>
                    <Header />
                    <section className='homePage'>
                        <div className='row homeForm'>
                            <div className='col-md-3 sidebarWrapper pt-0'>
                                <LeftSidebar />
                            </div>
                            <div className='col-md-6 middleContent pt-0'>
                                <StoryBar />
                                <PostForm addPost={addNewPost} />
                                <Feed newPost={post} setNewPost={setPost} />
                            </div>
                            <div className='col-md-3 rightContent pt-0'>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <Navigate to="/login" />
                </>
            )}
        </div>
    );
};



export default HomePage;