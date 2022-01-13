import React, { useState, useEffect } from "react";
import "../style.css"
import Container from '@mui/material/Container';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NOTIFYCATION_SUBSCRIPTION, USER_QUERY } from "../graphql";
import { useQuery } from "@apollo/client";


const Notification = ({ pairedEmail, pairedName, setPairedName, isInitializedNo, setIsInitializedNo, userEmail }) => {
    //
    // const userLike = ["Kris", "Showlo"]
    // setPairedName(["Kris", "Showlo"])
    const {data, loading, subscribeToMore} = useQuery(USER_QUERY,
        {
            variables: {
                email: userEmail
            }
        },
    );
    useEffect(() => {
        if (!isInitializedNo) {
            setIsInitializedNo(true);
            if (!(!pairedName && typeof(pairedName) !== 'undefined' && pairedName != 0))
                setPairedName([...pairedName]);
        }
    });
    useEffect(() => {
        subscribeToMore({
          document: NOTIFYCATION_SUBSCRIPTION,
          variables: {email: userEmail},
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newPairedName = subscriptionData.data.notification.name;
            return {
              user: {
                  pairedName: [...prev.user.pairedName, newPairedName]
              }
            };
          },
        });
    
      }, [subscribeToMore]);
    console.log(pairedName);
    if (!pairedName && typeof(pairedName) !== 'undefined' && pairedName != 0) {
        return (
            <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                <Typography variant="h5" style={{display: "inline-block", color: "black"}}>
                    No notification!
                </Typography>
            </Container>
        ) 
    }
    else if (pairedName.length === 0) {
        return (
                <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                    <Typography variant="h5" style={{display: "inline-block", color: "black", marginTop: "50px"}}>
                        No notification!
                    </Typography>
                </Container>
            ) 
    }
    // setIsNotification(true);
    const notifiMsg = pairedName.map((name) => (`${name} 與你配對到了！快去跟他聊天吧！`))
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
