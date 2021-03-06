import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = ({isNotification, setCurrentPage, setUserStatus, userName}) => {
  const [open, setOpen] = useState(false);

  const handleChangeTab = () => {
    setOpen(true);
    //
  };

  const handleClose = () => {
    setOpen(false);
  };

  const test = () => {
    console.log('###')
  }

  const logout = () => {
    localStorage.clear();
    window.location.reload();
    setUserStatus("login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className= "NTUnmarriedTitle" onClick={() => setCurrentPage("match")} sx = {{flexGrow: 1}} style={{hover: "cursor"}} color = "white">
          NTㄩㄇ
        </Typography>
        <Button color="inherit" onClick={() => setCurrentPage("match")} sx = {{flexGrow: 0}}>
          <FavoriteIcon/>
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("chat")} sx = {{flexGrow: 0}}>
          <ChatIcon/>
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("notifications")} sx = {{flexGrow: 0}}>
          {isNotification?<NotificationsActiveIcon/>:<NotificationsIcon/>}
        </Button>
        <Button color="inherit" onClick = {logout} sx = {{flexGrow: 0}}>
          <LogoutIcon/>
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("profile")} sx = {{flexGrow: 0}}>
          <PersonIcon/>
        </Button>
        <Box sx = {{flexGrow: 0}}>
          <Typography variant="h6" className= "NTUnmarriedTitle" color = "white">
            Hi {userName}!
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
