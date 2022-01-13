import React, { useState, useEffect } from "react";
import "../style.css"
import Container from '@mui/material/Container';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NOTIFICATION_SUBSCRIPTION, USER_QUERY } from "../graphql";
import { useQuery } from "@apollo/client";


const Notification = ({ isInitializedNo, setIsInitializedNo, userEmail }) => {
    const {data, loading, subscribeToMore} = useQuery(USER_QUERY,
        {
            variables: {
                email: userEmail
            }
        },
    );
    // useEffect(() => {
    //     if (!isInitializedNo) {
    //         setIsInitializedNo(true);
    //         if (!(!pairedName && typeof(pairedName) !== 'undefined' && pairedName != 0))
    //             setPairedName([...pairedName]);
    //     }
    // });
    useEffect(() => {
        subscribeToMore({
          document: NOTIFICATION_SUBSCRIPTION,
          variables: {email: userEmail},
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newPairedName = subscriptionData.data.notification.name;
            const newPairedImage = subscriptionData.data.notification.image;
            return {
              user: {
                notificationList: [{name: newPairedName, image: newPairedImage}, ...prev.user.notificationList]
              }
            };
          },
        });
    
      }, [subscribeToMore]);
    if (data.user.notificationList.length === 0) {
        return (
                <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>  
                    <Typography variant="h5" style={{display: "inline-block", color: "black", marginTop: "50px"}}>
                        No notification!
                    </Typography>
                </Container>
            ) 
    }
    // setIsNotification(true);
    return (
        <Container maxWidth = "sm" sx={{display: "flex", justifyContent: "center"}}>
            <Stack>
                {data.user.notificationList.map(({name, image}, id) => 
                    <div className="notification-cell" key={id} >
                        <div style={{display: "inline-block"}}>
                            {/* <img className="like" style={{color: "green",fontSize: "30px" }} src={image}></img> */}
                            <FavoriteIcon className="like" sx={{color: "green",fontSize: "30px" }} />    
                        </div>
                        <Typography variant="h5" style={{display: "inline-block", color: "black"}}>
                            {`${name} 與你配對到了！快去跟他聊天吧！`}
                        </Typography>
                    </div>
                )}
            </Stack>
        </Container>
    );
}

export default Notification;
