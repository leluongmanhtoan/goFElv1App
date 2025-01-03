import React from "react";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import "../styles/sidebar/middleSidebar.scss"
import Friendtest from "../assets/auth/avt.jpg"
import Friendtest2 from "../assets/auth/wallpaper2.jpg"
import Friendtest3 from "../assets/auth/wallpaper3.jpg"
import Friendtest4 from "../assets/auth/wallpaper4.jpg"
import Friendtest5 from "../assets/auth/wallpaper5.jpg"
const StoryBar = () => {
    return (
        <div className="container mt-4">
            <div className="story-gallery">
                <div className="story" style={{ backgroundImage: `linear-gradient(transparent,rgba(0,0,0,0.5)),url(${Friendtest})` }}>
                    <AddCircleOutlinedIcon className="addStory" />
                    <p>Tạo tin</p>
                </div>
                <div className="story" style={{ backgroundImage: `linear-gradient(transparent,rgba(0,0,0,0.5)),url(${Friendtest2})` }}>
                    <img src={Friendtest2} alt="" />
                    <p>Le Toan</p>
                </div>
                <div className="story" style={{ backgroundImage: `linear-gradient(transparent,rgba(0,0,0,0.5)),url(${Friendtest3})` }}>
                    <img src={Friendtest3} alt="" />
                    <p>Le Quan</p>
                </div>
                <div className="story" style={{ backgroundImage: `linear-gradient(transparent,rgba(0,0,0,0.5)),url(${Friendtest4})` }}>
                    <img src={Friendtest4} alt="" />
                    <p>Gia Man</p>
                </div>
                <div className="story" style={{ backgroundImage: `linear-gradient(transparent,rgba(0,0,0,0.5)),url(${Friendtest5})` }}>
                    <img src={Friendtest5} alt="" />
                    <p>Nguyen Anh</p>
                </div>
            </div>
        </div>

    )
}

export default StoryBar