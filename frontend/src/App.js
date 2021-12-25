import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import Logined from './Containers/Logined';
import { useEffect, useState } from "react";
import useChat from "../hooks/useChat";


function App() {
  const {
    userStatus,
    setUserStatus,
    email,
    setEmail,
    userName,
    setUserName,
    password,
    setPassword,
  } = useChat();

  return (
    <>
      {userStatus === "login" && <SignIn setUserStatus={setUserStatus} />}
      {userStatus === "signup" && <SignUp setUserStatus={setUserStatus} />}
      {userStatus === "logined" && <Logined/>}
    </>
  );
}

export default App;
