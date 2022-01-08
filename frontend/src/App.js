import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import Logined from './Containers/Logined';
import { useEffect, useState } from "react";


function App() {
  const [userStatus, setUserStatus] = useState("login");
  const [userName, setUserName] = useState("Leehom");
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      {userStatus === "login" && <SignIn setUserStatus={setUserStatus} />}
      {userStatus === "signup" && <SignUp setUserStatus={setUserStatus} />}
      {userStatus === "logined" && <Logined setUserStatus={setUserStatus} userEmail = {userEmail}/>}
    </>
  );
}

export default App;
