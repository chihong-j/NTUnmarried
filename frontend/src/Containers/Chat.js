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
import { USER_QUERY, CREATE_MESSAGE_MUTATION, CHAT_SUBSCRIPTION } from "../graphql";
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
        subscribeToMore({
          document: CHAT_SUBSCRIPTION,
          variables: {email: me.email},
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newName = subscriptionData.data.chatBoxPayload.name;
            const newFriendName = subscriptionData.data.chatBoxPayload.friendName;
            const newFriendImage = subscriptionData.data.chatBoxPayload.friendImage;
            const newFriendEmail = subscriptionData.data.chatBoxPayload.friendEmail;
            const newChatBoxPayload = {name: newName, friendName: newFriendName, friendImage: newFriendImage, friendEmail: newFriendEmail};
            return {
              user: {
                  chatBoxPayloadList: [newChatBoxPayload, ...prev.user.chatBoxPayloadList.filter((payload) => {
                      return payload.friendEmail !== newFriendEmail;
                  })]
              }
            };
          },
        });
    
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
    if (loading) return <p>loading</p>;
    // console.log("mydata", data)
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
                    <Stack>
                        {
                            data.user.chatBoxPayloadList.map(({name, friendName, friendImage, friendEmail}, id) => 
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
                            )
                        }
                    </Stack>
                </Container>
            )
            }
        </>
    );
}

export default Chat

