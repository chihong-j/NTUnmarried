import { useState } from 'react'
// import { useMutation } from '@apollo/client';
import {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION} from '../graphql'
// import { Button, Input, Tag, Tabs, message } from 'antd'
import Button from '@mui/material/Button';
import ChatWithModal from '../Components/ChatWithModal'
import Control from '../Components/Control'
import Display from '../Components/Display'
import TypeBar from './TypeBar'
import ChatBox from './ChatBox';
import Title from '../Components/Title'
import useChatBox from './../Hooks/useChatBox';
import Message from '../Components/Message';
import styled from 'styled-components'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import "../style.css"

const Chat = ({ me, displayStatus, user }) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const {chatBoxes, createChatBox, removeChatBox, userChatWith, setUserChatWith} = useChatBox();
    // const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    // const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const onChange = (idx) => {
        setActiveKey(idx);
    };
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

    return (
        <>
            { userChatWith ?(
            <Container sx = {{height: 600}}>
                <Typography variant="h5" sx = {{justifyContent: "center", display: "flex", margin: "10px"}}>
                    {userChatWith.Name}  
                </Typography>
                <Message>
                    <Display>
                        <ChatBox me = {me.Email} friend = {userChatWith.Email} me_img = {user[0].img[0]} friend_img = {user[1].img[0]}/>
                    </Display>
                </Message>
                <Control>
                    <TypeBar me={me} friend = {userChatWith} messageInput = {messageInput} setMessageInput = {setMessageInput}
                        // displayStatus={displayStatus} sendMessage={sendMessage}
                        disabled={chatBoxes.length === 0} />
                </Control>
            </Container>
            ): (
                <Container maxWidth = "sm" sx = {{display: "flex"}}>
                    <Stack>
                        {
                            firends.map((friend) => 
                            <div className="chat-cell" onClick={() => setUserChatWith(friend)}>
                            <div className="chat-img-div" style={{display: "inline-block"}}>
                                <img className="chat_img" src={user[0].img[0]} ></img>  
                            </div>
                            <div style={{display: "inline-block", marginLeft: "20px", overflow: "hidden", width: "500px", height: "70px"}}>
                            <Typography variant="h4" color = "primary">
                                            {friend.Name}
                                        </Typography>
                                        <Typography variant="h5">
                                            {friend.LastMessage} 
                                            {/* 37 characters */}
                                        </Typography>
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

