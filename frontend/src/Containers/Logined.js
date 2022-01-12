import Header from "./Header";
import Match from "./Match";
import Chat from "./Chat";
import Profile from "./Profile";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import img from "../img/index";
import { Container } from 'reactstrap';
import { useQuery } from '@apollo/client';
import {USER_QUERY} from './../graphql'

const Logined = ({setUserStatus, userEmail}) => {
    const [isNotification, setIsNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState("match");
    const {data, loading, ...props} = useQuery(USER_QUERY, 
        {
            variables: {
                email: userEmail
            }
        }
        );
    //
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
    if(loading) return <p>loading</p>;
    return (
        <Container>
            <Header isNotifications={isNotification} setCurrentPage = {setCurrentPage} setUserStatus = {setUserStatus} userName = {data.name}/>
            {currentPage === "match" && <Match me ={data} user={user} />}
            {currentPage === "chat"  && <Chat me ={data} user = {user} />}
            {currentPage === "notifications" && <Notification/>}
            {currentPage === "profile" && <Profile me = {data}/>}
        </Container>
    );
}

export default Logined;
