import React, { useState } from 'react';
// import { makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
// import ModalDialog from './ModalDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
var e = 1;
// const useStyles = makeStyles(theme => ({
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

const Header = ({isNotification, setCurrentPage, setUserStatus}) => {
  const [open, setOpen] = useState(false);

  const handleChangeTab = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className= "NTUnmarriedTitle">
          NTUnmarried
        </Typography>
        <Button color="inherit" onClick={() => setCurrentPage("match")}>
          <FavoriteIcon/>
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("ready")}>
          <AppShortcutIcon/>
        </Button>
        <Button color="inherit" onClick = {() => setCurrentPage("login")}>
          <LogoutIcon/>
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("chat")}>
          <ChatIcon/>
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("notifications")}>
          {isNotification?<NotificationsActiveIcon/>:<NotificationsIcon/>}
        </Button>
        <Button color="inherit" onClick={() => setCurrentPage("Profile")}>
          <PersonIcon/>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
