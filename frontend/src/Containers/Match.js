import React, { useState, useEffect } from "react";
import "../style.css"
import Container from '@mui/material/Container';
import { Row } from 'reactstrap';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Typography from '@mui/material/Typography';
import { useMutation } from '@apollo/client';
import { CREATE_LIKE_MUTATION } from "../graphql";
import { useQuery } from '@apollo/client';
import {STRANGER_QUERY} from './../graphql';
import img from "../img";


const Match = ({ me, user }) => {
    const [noUserLeft, setNoUserLeft] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [selectedPicId, setSelectedPicId] = useState(0);
    const [leftPicDisabled, setLeftPicDisabled] = useState(true);
    const [rightAnimate, setRightAnimate] = useState(false);
    const [leftAnimate, setLeftAnimate] = useState(false);
    const [likeUser] = useMutation(CREATE_LIKE_MUTATION);
    const [rightPicDisabled, setRightPicDisabled] = useState(false);
    
    const {data, loading, ...props} = useQuery(STRANGER_QUERY, 
        {
            variables: {
            }
        },
    );
    
    // useEffect(() => {
    //     if (selectedUserId < data.stranger.length)
    //         setNoUserLeft(false);
    //     else
    //         setNoUserLeft(true);
    // }, [selectedUserId, data]);

    const setDisabled = (currentID) => {
        if (currentID === 0) {
            setLeftPicDisabled(true);
            setRightPicDisabled(false);
        }
        else if (currentID >= data.stranger[selectedUserId].images.length - 1) {
            setLeftPicDisabled(false);
            setRightPicDisabled(true);
        }
        else {
            setLeftPicDisabled(false);
            setRightPicDisabled(false);
        }
    }
    //
    const nextPic = () => {
        let currentID = selectedPicId+1
        if (currentID <= data.stranger[selectedUserId].images.length - 1) {
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
        console.log(data.stranger[selectedUserId].email)
        await likeUser({
            variables: {
                to: data.stranger[selectedUserId].email,
                isLike: true
            },
        });
        let currentUserID = selectedUserId+1
        if (currentUserID <= data.stranger.length - 1) {
            setSelectedUserId(currentUserID);
            setLeftPicDisabled(true);
            setRightPicDisabled(data.stranger[currentUserID].images.length <= 1);
            setSelectedPicId(0);
        }
        else {
            setNoUserLeft(true);
        }
        setRightAnimate(false);
    }
    const dislikePeople = async () => {
        setLeftAnimate(true);
        await delay(300);
        console.log(data.stranger[selectedUserId].email)
        await likeUser({
            variables: {
                to: data.stranger[selectedUserId].email,
                isLike: false
            },
        })
        let currentUserID = selectedUserId+1
        if (currentUserID <= data.stranger.length - 1) {
            setSelectedUserId(currentUserID);
            setLeftPicDisabled(true);
            setRightPicDisabled(data.stranger[currentUserID].images.length <= 1);
            setSelectedPicId(0);
        }
        else {
            setNoUserLeft(true);
        }
        setLeftAnimate(false);
    }
    if (loading) return <p>loading</p>;
    if (!data.stranger && typeof(data.stranger) !== 'undefined' && data.stranger != 0) {
        return (
            <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                <Typography variant="h5" style={{display: "inline-block", color: "black", marginTop: "50px"}}>
                    No User Left! You can try reloading later.
                </Typography>
            </Container>
        ) 
    }
    else if (data.stranger.length === 0) {
        return (
            <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                <Typography variant="h5" style={{display: "inline-block", color: "black", marginTop: "50px"}}>
                    No User Left!
                </Typography>
            </Container>
            ) 
    }
    else if (noUserLeft) {
        return (
            <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                <Typography variant="h5" style={{display: "inline-block", color: "black", marginTop: "50px"}}>
                    No User Left!
                </Typography>
            </Container>
        ) 
    }
    // console.log(data.stranger[selectedUserId]);
    return (
        <Container>
            <Row>
                <div className="view-container">
                    <ChevronLeftIcon sx={{fontSize: "50px", marginLeft: "300px", cursor: leftPicDisabled ? "" : "pointer", opacity: leftPicDisabled ? "0.2" : "1"}} onClick={prevPic} />
                    <div className={rightAnimate ? "album alb-animate-like" : (leftAnimate ? "album alb-animate-dislike" : "album")} >  
                        <img className="big-pic" src={data.stranger[selectedUserId].images.length === 0 ? img.emptyPic : data.stranger[selectedUserId].images[selectedPicId]} alt="IU"></img>      
                        <div className="text-on-image">
                            <Typography variant="h4" style={{color: "white"}}>{data.stranger[selectedUserId].name}</Typography>
                            <Typography variant="h6" style={{color: "white"}}>{data.stranger[selectedUserId].department}</Typography>
                            <Typography variant="h6" style={{color: "white"}}>{data.stranger[selectedUserId].age}</Typography>
                        </div>
                    </div>
                    <ChevronRightIcon sx={{fontSize: "50px", marginRight: "300px", cursor: rightPicDisabled ? "" : "pointer", opacity: rightPicDisabled ? "0.2" : "1"}} onClick={nextPic} />
                </div>
            </Row>
            <Row>
                <div className="view-container">
                    <Typography variant="body">{data.stranger[selectedUserId].aboutMe}</Typography>
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

// map
{/* <Container>
    {data.stranger.map((user, idx1) => { return (
        <>
            <Row>
                <div className="view-container">
                    <ChevronLeftIcon sx={{fontSize: "50px", marginLeft: "300px", cursor: leftPicDisabled ? "" : "pointer", opacity: leftPicDisabled ? "0.2" : "1"}} onClick={prevPic} />
                    <div className={rightAnimate ? "album alb-animate-like" : (leftAnimate ? "album alb-animate-dislike" : "album")} >  
                        <img className="big-pic" src={data.stranger.images[selectedPicId]} alt="IU"></img>      
                        <div className="text-on-image">
                            <Typography variant="h4" style={{color: "white"}}>{data.stranger.name}</Typography>
                            <Typography variant="h6" style={{color: "white"}}>{data.stranger.department}</Typography>
                            <Typography variant="h6" style={{color: "white"}}>{data.stranger.age}</Typography>
                        </div>
                    </div>
                    <ChevronRightIcon sx={{fontSize: "50px", marginRight: "300px", cursor: rightPicDisabled ? "" : "pointer", opacity: rightPicDisabled ? "0.2" : "1"}} onClick={nextPic} />
                </div>
            </Row>
            <Row>
                <div className="view-container">
                    <Typography variant="body">{data.stranger.aboutMe}</Typography>
                </div>
            </Row>
        </>
        )}
    )}
    <Row>
        <div className="view-container">
            <button className="dislike-button"><CloseOutlinedIcon sx={{color: "red", fontSize: "50px"}} onClick={dislikePeople} /></button>
            <button className="like-button"><FavoriteIcon className="like" sx={{color: "green",fontSize: "50px" }}  onClick={likePeople} /></button>       
        </div>
    </Row>
</Container> */}

// Oldest
{/* <Container>
    <Row>
        <div className="view-container">
            <ChevronLeftIcon sx={{fontSize: "50px", marginLeft: "300px", cursor: leftPicDisabled ? "" : "pointer", opacity: leftPicDisabled ? "0.2" : "1"}} onClick={prevPic} />
            <div className={rightAnimate ? "album alb-animate-like" : (leftAnimate ? "album alb-animate-dislike" : "album")} >  
                <img className="big-pic" src={user[selectedUserId].img[selectedPicId]} alt="IU"></img>      
                <div className="text-on-image">
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
</Container> */}