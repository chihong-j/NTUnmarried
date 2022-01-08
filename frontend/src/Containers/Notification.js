import React, { useState } from "react";
import "../style.css"
import Container from '@mui/material/Container';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const Notification = () => {
    const userLike = ["Kris", "Showlo"]
    const notifiMsg = userLike.map((name) => (`${name} 與你配對到了！快去跟他聊天吧！`))
    return (
        <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>
            <Stack>
                {notifiMsg.map((notiMsg, id) => 
                    <div className="notification-cell" key={id} >
                        <div style={{display: "inline-block"}}>
                            <FavoriteIcon className="like" sx={{color: "green",fontSize: "30px" }} />    
                        </div>
                        <Typography variant="h5" style={{display: "inline-block", color: "black"}}>
                            {notiMsg}
                        </Typography>
                        {/* <div style={{display: "inline-block"}}>  
                            {notiMsg}
                        </div> */}
                    </div>
                )}
            </Stack>
        </Container>
    );
}

export default Notification;
