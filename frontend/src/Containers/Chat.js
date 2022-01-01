import { useState } from 'react'
import { useMutation } from '@apollo/client';
import {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION} from '../graphql'
import { Button, Input, Tag, Tabs, message } from 'antd'
import ChatWithModal from '../Components/ChatWithModal'
import Control from '../Components/Control'
import Display from '../Components/Display'
import TypeBar from './TypeBar'
import ChatBox from './ChatBox';
import Title from './../Components/Title'
import useChatBox from './../Hooks/useChatBox';
import Message from '../Components/Message';
// import Title from './../components/Title'
import styled from 'styled-components'
const {TabPane} = Tabs;

const Wrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    display: flex;
`;

const Chat = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const {chatBoxes, createChatBox, removeChatBox} = useChatBox();
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const onChange = (idx) => {
        setActiveKey(idx);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            setModalVisible(true);
        } else if(action === 'remove') {
            setActiveKey(removeChatBox(targetKey, activeKey));
        }
    };

    const onCreate = async (friend) => {
        setModalVisible(false);
        createChatBox(friend);
        await startChat(
        {
            variables: {
              name1: me,
              name2: friend,
            },
          });
        setActiveKey(friend);
    };

    // const handleClear = () => {
    //     clearChatBox(activeKey);
    // }

    return (
        <>
            <Title>
                <h1>{me}'s Chat Room</h1>
                <Button type="primary" danger disabled={chatBoxes.length === 0}>
                    Clear
                </Button>
            </Title>
            <>
                <ChatWithModal isVisible={modalVisible} onCreate={onCreate} onCancel={() => setModalVisible(false)} />
                <Message>
                    <Display>
                        <Wrapper tabBarStyle = {{height: "36px"}} type="editable-card" onChange={onChange} activeKey={activeKey} onEdit={onEdit}  >
                            {chatBoxes.map((friend) => (
                                <TabPane tab = {friend} closable = {true} key = {friend} style={{ height: '230px', overflow: 'auto' }}>
                                    <ChatBox me = {me} friend = {friend} key = {friend} />
                                </TabPane>
                            ))}
                        </Wrapper> 
                    </Display>
                </Message>
                <Control>
                    <TypeBar me={me} activeKey={activeKey} messageInput = {messageInput} setMessageInput = {setMessageInput}
                        displayStatus={displayStatus} sendMessage={sendMessage}
                        disabled={chatBoxes.length === 0} />
                </Control>
            </>

        </>
    );
}

export default Chat

