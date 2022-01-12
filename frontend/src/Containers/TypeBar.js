import { Input } from 'antd';
const {Search} = Input;

const TypeBar = ({ me, displayStatus, sendMessage, disabled, messageInput, setMessageInput }) => {
    
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
                    // variables: {
                    //     from: me,
                    //     to: activeKey,
                    //     message: msg,
                    // },
                });
                setMessageInput('');
            }}
            disabled={disabled}
            size = "large"
        ></Search>
    );
}

export default TypeBar
