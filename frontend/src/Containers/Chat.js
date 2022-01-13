import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { message } from 'antd'
import Control from '../Components/Control'
import Display from '../Components/Display'
import TypeBar from './TypeBar'
import ChatBox from './ChatBox';
import useChatBox from './../Hooks/useChatBox';
import Message from '../Components/Message';
import styled from 'styled-components'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import "../style.css"
import { USER_QUERY, CREATE_MESSAGE_MUTATION } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
//
const Chat = ({ me, user}) => {
    const [messageInput, setMessageInput] = useState("");
    const [chatBoxName, setChatBoxName] = useState("");
    const [friendImg, setFriendImg] = useState("");
    const [friendEma, setFriendEma] = useState("");
    // const [selectedChatBoxId, setSelectedChatBoxId] = useState(0);
    const {chatBoxes, createChatBox, removeChatBox, userChatWith, setUserChatWith} = useChatBox();
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const {data, loading, subscribeToMore} = useQuery(USER_QUERY,
        {
            variables: {
                email: me.email
            }
        },
    );
    useEffect(() => {
        // subscribeToMore({
        //   document: NOTIFYCATION_SUBSCRIPTION,
        //   variables: {email: userEmail},
        //   updateQuery: (prev, { subscriptionData }) => {
        //     if (!subscriptionData.data) return prev;
        //     const newPairedName = subscriptionData.data.notification.name;
        //     return {
        //       user: {
        //           pairedName: [...prev.user.pairedName, newPairedName]
        //       }
        //     };
        //   },
        // });
    
    }, [subscribeToMore]);

    const displayStatus = (payload) => {
    if (payload.msg) {
        const { type, msg } = payload;
        const content = { content: msg, duration: 1.5 }
        switch (type) {
        case 'success':
            message.success(content);
            break;
        case 'error':
        default:
            message.error(content);
            break;
        }
    }
    }
    // const onChange = (idx) => {
    //     setActiveKey(idx);
    // };
    const firends = [{Email: "b07100000@ntu.edu.tw", Name: "Leehom", LastMessage: "你不知道的事"}, {Email: "b07100001@ntu.edu.tw", Name: "Showlo", LastMessage: "哈囉你好，我是阿扣謝和我是阿扣謝和我是阿扣謝和"}];
    const onEdit = (targetKey, action) => {
        // if (action === 'add') {
        //     setModalVisible(true);
        // } else if(action === 'remove') {
        //     setActiveKey(removeChatBox(targetKey, activeKey));
        // }
    };

    const onCreate = async (friend) => {
        // setModalVisible(false);
        // createChatBox(friend);
        // await startChat(
        // {
        //     variables: {
        //       name1: me,
        //       name2: friend,
        //     },
        //   });
        // setActiveKey(friend);
    };

    // const handleClear = () => {
    //     clearChatBox(activeKey);
    // }
    const startChat = (name, friendName, friendImage, friendEmail) => {
        setFriendEma(friendEmail);
        setChatBoxName(name);
        setFriendImg(friendImage);
        setUserChatWith(friendName);
    }
    if (data.user.chatBoxPayloadList.length === 0) {
        return (
                <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                    <Typography variant="h5" style={{display: "inline-block", color: "black", marginTop: "50px"}}>
                        No Message!
                    </Typography>
                </Container>
            ) 
    }

    return (
        <>
            { userChatWith ?(
            <Container sx = {{height: 600}}>
                <Typography variant="h5" sx = {{justifyContent: "center", display: "flex", margin: "10px"}}>
                    {userChatWith}  
                </Typography>
                <Message>
                    <Display>
                        <ChatBox me={me} name={chatBoxName} friendName={userChatWith} friendImage={friendImg} friendEma={friendEma} setFriendEma={setFriendEma} setUserChatWith={setUserChatWith} setChatBoxName={setChatBoxName} setFriendImg={setFriendImg}  />
                    </Display>
                </Message>
                <Control>
                    <TypeBar me={me.email} friend={friendEma} displayStatus={displayStatus} sendMessage={sendMessage} messageInput = {messageInput} setMessageInput = {setMessageInput} />
                </Control>
            </Container>
            ): (
                <Container maxWidth = "sm" sx = {{display: "flex", justifyContent: "center"}}>
                        {
                            data.user.chatBoxPayloadList.map(({name, friendName, friendImage, friendEmail}, id) => 
                            <Stack>
                                <div key={id} className="chat-cell" onClick={() => startChat(name, friendName, friendImage, friendEmail)}>
                                    <div className="chat-img-div" style={{display: "inline-block"}}>
                                        <img className="chat_img" src={friendImage} ></img>  
                                    </div>
                                    <div style={{display: "inline-block", marginLeft: "20px", overflow: "hidden", width: "500px", height: "70px"}}>
                                    <Typography variant="h4" color = "primary">
                                        {friendName}
                                    </Typography>
                                                {/* <Typography variant="h5">
                                                </Typography> */}
                                    </div>
                                </div>
                            </Stack>
                            )
                        }
                </Container>
            )
            }
        </>
    );
}

export default Chat

