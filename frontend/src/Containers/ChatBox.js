import { useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client';
import {CHATBOX_QUERY, MESSAGE_SUBSCRIPTION} from '../graphql'
import { Tag } from 'antd'
import styled from 'styled-components'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';

const Messages = styled.div`
    height: calc(240px - 0px);
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 20px;
`;

const ChatBox = ({me, name, friendName, friendImage, friendEma, setFriendEma, setUserChatWith, setChatBoxName, setFriendImg}) => {
    const messagesFooter = useRef(null);
    const {data, loading, subscribeToMore} = useQuery(CHATBOX_QUERY, {variables: {
        name
    }});
    const ReturnChatBox = () => {
        setUserChatWith(null);
        setFriendImg(null);
        setFriendEma(null);
        setChatBoxName(null);
    }
    const scrollToBottom  = () => {
        messagesFooter.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    useEffect(() => {
        try {
            subscribeToMore(
                {
                    document: MESSAGE_SUBSCRIPTION,
                    variables: {from: me.email, to: friendEma},
                    updateQuery: (prev, {subscriptionData}) => {
                        if (!subscriptionData.data) return prev;
                        const newMessage = subscriptionData.data.message;
                        console.log("here: ", newMessage)
                        return {
                            chatBox: {
                                messages: [...prev.chatBox.messages, newMessage]
                            }
                        }
                    }
                }
            )
        } catch (e) {}
    }, [subscribeToMore]);

    if(loading) return <p>loading</p>;
    return (
        <>
            <Button color="primary" variant="raised" component="span" onClick={ReturnChatBox} >
                <ArrowBackIosIcon sx = {{fontSize : "50px", flexGrow: 1}}/> back  
            </Button>
            <Messages>
                {data.chatBox.messages.map(({sender: {email, name}, body}, i) => (
                    <div className="App-message" key={email + body + i} style={{ flexDirection: (email === me.email) ? 'row-reverse' : ''} } >
                        <Tag style={{height:"25px"}} color="blue">{email === me.email ? name : friendName}</Tag>
                        <p className="MessageBody" style={{ margin: (email === me.email) ? '0px 10px' : '' }}>{body}</p>
                    </div>
                    ))}
                <div ref = {messagesFooter}/>
            </Messages>
        </>
    );
};

export default ChatBox;
