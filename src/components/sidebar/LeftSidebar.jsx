import React from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import "../../styles/sidebar/leftSidebar.scss"
const LeftSidebar = () =>{
    return (
        <div className="leftSidebar">
            <div className="card border-0 shadow">
                <div className="catList">
                    <div className="catItem d-flex align-items-center">
                        <span>
                            <PersonIcon style={{fontSize:"30"}}/>
                        </span>
                        <h4 className="mb-0 ml-3">Lê Lương Mạnh Toàn</h4>
                    </div>
                    <div className="catItem d-flex align-items-center">
                        <span>
                            <PeopleAltIcon style={{fontSize:"30"}}/>
                        </span>
                        <h4 className="mb-0 ml-3">Bạn bè</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar