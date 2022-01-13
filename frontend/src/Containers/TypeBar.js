import { Input } from 'antd';
const {Search} = Input;

const TypeBar = ({ me, friend, displayStatus, sendMessage, messageInput, setMessageInput }) => {
    
    return (
        <Search
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
                }//
                // console.log(me);
                await sendMessage(
                {
                    variables: {
                        from: me.email,
                        to: friend,
                        message: msg,
                    },
                });
                setMessageInput('');
            }}
            size = "large"
        ></Search>
    );
}

export default TypeBar
