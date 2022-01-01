import { useCallback, useState } from 'react'
import { Input } from 'antd';

const TypeBar = ({ me, activeKey, displayStatus, sendMessage, disabled, messageInput, setMessageInput }) => {
    // const [body, setBody] = useState('');
    
    return (
        <Input.Search
            value={messageInput} 
            enterButton="Send"
            placeholder="Type messages here..."
            onChange={(e) => setMessageInput(e.target.value)}
            onSearch={async (msg) => {
                if (!msg) {
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter some messages.'
                    })
                    return;
                }
                // console.log(me);
                await sendMessage(
                {
                    variables: {
                        from: me,
                        to: activeKey,
                        message: msg,
                    },
                });
                setMessageInput('');
            }}
            disabled={disabled}
            style={{ width: '75%' }}
        ></Input.Search>
    );
}

export default TypeBar
