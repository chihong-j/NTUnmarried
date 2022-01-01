import { useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client';
import {CHATBOX_QUERY, MESSAGE_SUBSCRIPTION} from '../graphql'
import { Tag } from 'antd'
import styled from 'styled-components'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';

const Messages = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const ChatBox = ({me, friend, ...props}) => {
    const messagesFooter = useRef(null);

    const {data, loading, subscribeToMore} = useQuery(CHATBOX_QUERY, {variables: {
        name1: me, name2: friend
    }});

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
                    variables: {from: me, to: friend},
                    updateQuery: (prev, {subscriptionData}) => {
                        if (!subscriptionData.data) return prev;
                        const newMessage = subscriptionData.data.message.message;
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
            <Button color="primary" variant="raised" component="span">
                <ArrowBackIosIcon sx = {{fontSize : "50px", flexGrow: 1}}/>
            </Button>
            <Messages>
                {/* {data.chatBox.messages.map(({sender: {name}, body}, i) => (
                    <div className="App-message" key={name + body + i} style={{ flexDirection: (name === me) ? 'row-reverse' : ''} } >
                        <Tag style={{height:"25px"}} color="blue">{name}</Tag>
                        <p className="MessageBody" style={{ margin: (name === me) ? '0px 10px' : '' }}>{body}</p>
                    </div>
                    ))} */}
                <div ref = {messagesFooter}/>
            </Messages>
        </>
    );
};

export default ChatBox;
