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
import useNTU from '../Hooks/useNTU'

const Logined = ({setUserStatus, userEmail}) => {
    const [isNotification, setIsNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState("match");
    const [isInitialized, setIsInitialized] = useState(false);
    const {images, setIamges, aboutMe, setAboutMe, department, setDepartment, gender, setGender, age, setAge, birth, setBirth, initialize} = useNTU()
    const {data, loading, ...props} = useQuery(USER_QUERY, 
        {
            variables: {
                email: userEmail
            }
        },
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
            <Header isNotifications={isNotification} setCurrentPage = {setCurrentPage} setUserStatus = {setUserStatus} userName = {data.user.name}/>
            {currentPage === "match" && <Match me ={data.user} user={user} />}
            {currentPage === "chat"  && <Chat me ={data.user} user = {user} />}
            {currentPage === "notifications" && <Notification/>}
            {currentPage === "profile" && <Profile me = {data.user} isInitialized={isInitialized} setIsInitialized={setIsInitialized} images = {images} setIamges = {setIamges} aboutMe = {aboutMe} setAboutMe = {setAboutMe} department = {department} setDepartment = {setDepartment} gender = {gender} setGender = {setGender} age = {age} setAge = {setAge} birth = {birth} setBirth = {setBirth} initialize = {initialize}/>}
        </Container>
    );
}

export default Logined;

// import Header from "./Header";
// import Match from "./Match";
// import Chat from "./Chat";
// import Profile from "./Profile";
// import Notification from "./Notification";
// import { useEffect, useState } from "react";
// import img from "../img/index";
// import { Container } from 'reactstrap';
// import { useQuery } from '@apollo/client';
// import {USER_QUERY} from './../graphql'

// const LOCALSTORAGE_KEY = "save-user";
// const Logined = ({setUserStatus, userEmail}) => {
//     const [isNotification, setIsNotification] = useState(false);
//     const [currentPage, setCurrentPage] = useState("match");
//     const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
//     var {data, loading, ...props} = useQuery(USER_QUERY, 
//         {
//             variables: {
//                 email: userEmail
//             }
//         }
//         );
//     //
    
//     const user = [
//         {
//             id: 1,
//             name: "IU",
//             img: [img.girl1, img.girl2, img.girl3],
//             desc: "Hi, I am IU."
//         },
//         {
//             id: 2,
//             name: "Kris",
//             img: [img.man1, img.man2, img.man3],
//             desc: "Hi, I am Kris."
//         }
//     ]
//     if(loading) return <p>loading</p>;
//     if(data){
//         localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
//         // console.log(localStorage.getItem(LOCALSTORAGE_KEY))
//     }else{
//         data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
//         // console.log(data);
//     }
//     return (
//         <Container>
//             <Header isNotifications={isNotification} setCurrentPage = {setCurrentPage} setUserStatus = {setUserStatus} userName = {data.user.name}/>
//             {currentPage === "match" && <Match me ={data.user} user={user} />}
//             {currentPage === "chat"  && <Chat me ={data.user} user = {user} />}
//             {currentPage === "notifications" && <Notification/>}
//             {currentPage === "profile" && <Profile me = {data.user}/>}
//         </Container>
//     );
// }

// export default Logined;
