import { useState } from 'react';

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const [userChatWith, setUserChatWith] = useState(null)
    const removeChatBox = (targetKey, activeKey) => {
        let temp = chatBoxes;
        let i = temp.indexOf(targetKey);
        temp.splice(targetKey, 1);
        setChatBoxes(temp);
        if(targetKey === activeKey){
            if(i > 0){
                return temp[i];
            }else{
                if(temp.length){
                    return temp[0];
                }else {
                    return '';
                }
            }
        }
    };
    const createChatBox = (friend) => {
        setChatBoxes([...chatBoxes, friend]);
    };
    return {chatBoxes, removeChatBox, createChatBox, userChatWith, setUserChatWith};
};


export default useChatBox;


