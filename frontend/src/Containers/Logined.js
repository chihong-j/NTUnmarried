import Header from "./Header";
import Match from "./Match";
import Ready from "./Ready";
import Chat from "./Chat";
import Profile from "./Profile";
import Notification from "./Notification";
import { useEffect, useState } from "react";

const Logined = ({setUserStatus}) => {
    const [isNotification, setIsNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState("match");
    return (
        <>
        <Header isNotifications={isNotification} setCurrentPage = {setCurrentPage} setUserStatus = {setUserStatus}/>
        {currentPage === "notification" && <Notification/>}
        {currentPage === "match" && <Match/>}
        {/* {currentPage === "ready" && <Ready/>} */}
        {currentPage === "chat"  && <Chat/>}
        {currentPage === "profile" && <Profile/>}
        </>
    );
}

export default Logined;
