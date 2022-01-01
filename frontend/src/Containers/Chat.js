import { useState } from 'react'
// import { useMutation } from '@apollo/client';
import {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION} from '../graphql'
import { Button, Input, Tag, Tabs, message } from 'antd'
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

const Chat = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const {chatBoxes, createChatBox, removeChatBox, userChatWith, setUserChatWith} = useChatBox();
    // const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    // const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const onChange = (idx) => {
        setActiveKey(idx);
    };

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
                <Message>
                    <Display>

                    </Display>
                </Message>
                <Control>
                    <TypeBar me={me} activeKey={activeKey} messageInput = {messageInput} setMessageInput = {setMessageInput}
                        // displayStatus={displayStatus} sendMessage={sendMessage}
                        disabled={chatBoxes.length === 0} />
                </Control>
            </Container>
            ): (
                <Container maxWidth = "sm" sx = {{display: "flex"}}>
                    <Stack>
                        {/* {
                            chatBoxes.map((friend) => 
                            <Button color="inherit" onClick={() => setUserChatWith(friend)}>
                                <PersonIcon/>
                                <h1>Hi</h1>
                            </Button>
                            )
                        } */}
                        <Button color="inherit" onClick={() => setUserChatWith("1")} sx = {{height: 80, position: "relative"}}>
                            <div style = {{justifyContent: "space-between"}}>
                                <div style = {{height: "80px", width: "80px", position: "absolute", display : "inline-block"}}>
                                    <PersonIcon sx = {{height: 80, fontSize: 80, position: "relative"}}/>
                                </div>
                                <div style = {{height: "80px", width: "600px", display: "inline-block"}}>
                                    <div>
                                        <Typography variant="h4" sx = {{}}>
                                            Leehom
                                        </Typography>
                                        <Typography variant="h5">
                                            Hi
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Button>
                    </Stack>
                </Container>
            )
            }
        </>
    );
}

export default Chat

