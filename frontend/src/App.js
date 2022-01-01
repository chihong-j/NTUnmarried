import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import Logined from './Containers/Logined';
import { useEffect, useState } from "react";

const b = 1;


function App() {
  const [userStatus, setUserStatus] = useState("login");
  const [userName, setUserName] = useState("Leehom");

  return (
    <>
      {userStatus === "login" && <SignIn setUserStatus={setUserStatus} />}
      {userStatus === "signup" && <SignUp setUserStatus={setUserStatus} />}
      {userStatus === "logined" && <Logined setUserStatus={setUserStatus} userName = {userName}/>}
    </>
  );
}

export default App;
