import React, { useState } from "react";
import "../style.css"
import { Container, Row, Col } from 'reactstrap';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Typography from '@mui/material/Typography';


const Match = ({ user }) => {
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [selectedPicId, setSelectedPicId] = useState(0);
    const [leftPicDisabled, setLeftPicDisabled] = useState(true);
    const [rightPicDisabled, setRightPicDisabled] = useState(false);
    const [rightAnimate, setRightAnimate] = useState(false);
    const [leftAnimate, setLeftAnimate] = useState(false);
    const setDisabled = (currentID) => {
        if (currentID === 0) {
            setLeftPicDisabled(true);
            setRightPicDisabled(false);
        }
        else if (currentID === user[selectedUserId].img.length - 1) {
            setLeftPicDisabled(false);
            setRightPicDisabled(true);
        }
        else {
            setLeftPicDisabled(false);
            setRightPicDisabled(false);
        }
    }
    const nextPic = () => {
        let currentID = selectedPicId+1
        if (currentID <= user[selectedUserId].img.length - 1) {
            setSelectedPicId(currentID);
            setDisabled(currentID);
        }
    }
    const prevPic = () => {
        let currentID = selectedPicId-1
        if (currentID >= 0) {
            setSelectedPicId(currentID);
            setDisabled(currentID);
        }
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const likePeople = async () => {
        setRightAnimate(true);
        await delay(300);
        let currentUserID = selectedUserId+1
        if (currentUserID <= user.length - 1) {
            setSelectedUserId(currentUserID);
            setLeftPicDisabled(true);
            setRightPicDisabled(false);
            setSelectedPicId(0);
        }
        setRightAnimate(false);
    }
    const dislikePeople = async () => {
        setLeftAnimate(true);
        await delay(300);
        let currentUserID = selectedUserId+1
        if (currentUserID <= user.length - 1) {
            setSelectedUserId(currentUserID);
            setLeftPicDisabled(true);
            setRightPicDisabled(false);
            setSelectedPicId(0);
        }
        setLeftAnimate(false);
    }

    return (
        <Container>
            <Row>
                <div className="view-container">
                    <ChevronLeftIcon sx={{fontSize: "50px", marginLeft: "300px", cursor: leftPicDisabled ? "" : "pointer", opacity: leftPicDisabled ? "0.2" : "1"}} onClick={prevPic} />
                    <div className={rightAnimate ? "album alb-animate-like" : (leftAnimate ? "album alb-animate-dislike" : "album")} >  
                        <img className="big-pic" src={user[selectedUserId].img[selectedPicId]} alt="IU"></img>      
                        <div class="text-on-image">
                            <Typography variant="h4" style={{color: "white"}}>IU</Typography>
                            <Typography variant="h6" style={{color: "white"}}>工管系</Typography>
                            <Typography variant="h6" style={{color: "white"}}>25</Typography>
                        </div>
                    </div>
                    <ChevronRightIcon sx={{fontSize: "50px", marginRight: "300px", cursor: rightPicDisabled ? "" : "pointer", opacity: rightPicDisabled ? "0.2" : "1"}} onClick={nextPic} />
                </div>
            </Row>
            <Row>
                <div className="view-container">
                    <Typography variant="body">你好，我是IU，我喜歡睡覺</Typography>
                </div>
            </Row>
            <Row>
                <div className="view-container">
                    <button className="dislike-button"><CloseOutlinedIcon sx={{color: "red", fontSize: "50px"}} onClick={dislikePeople} /></button>
                    <button className="like-button"><FavoriteIcon className="like" sx={{color: "green",fontSize: "50px" }}  onClick={likePeople} /></button>       
                </div>
            </Row>
        </Container>
    );
}

export default Match;
