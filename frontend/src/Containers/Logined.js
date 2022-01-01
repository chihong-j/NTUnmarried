import Header from "./Header";
import Match from "./Match";
import Chat from "./Chat";
import Profile from "./Profile";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import img from "../img/index";
import { Container } from 'reactstrap';

const Logined = ({setUserStatus}) => {
    const [isNotification, setIsNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState("match");
    const user = [
        {
            id: 1,
            name: "IU",
            img: [img.girl1, img.girl2, img.girl3],
            desc: "Hi, I am IU."
        },
        {
            id: 2,
            name: "Kris",
            img: [img.man1, img.man2, img.man3],
            desc: "Hi, I am Kris."
        }
    ]
    return (
        <Container>
            <Header isNotifications={isNotification} setCurrentPage = {setCurrentPage} setUserStatus = {setUserStatus}/>  
            {currentPage === "match" && <Match user={user} />}
            {currentPage === "chat"  && <Chat/>}
            {currentPage === "notification" && <Notification/>}
            {currentPage === "profile" && <Profile/>}
        </Container>
    );
}

export default Logined;
