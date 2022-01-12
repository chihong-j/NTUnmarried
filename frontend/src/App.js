import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import Logined from './Containers/Logined';
import { useEffect, useState } from "react";

const LOCALSTORAGE_KEY = "save-user";
const LOCALSTORAGE_KEY_LOGIN = "save-login";
  
  
function App() {
  const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  const savedLogin = localStorage.getItem(LOCALSTORAGE_KEY_LOGIN);
  const [userStatus, setUserStatus] = useState(savedLogin || "login");
  const [userName, setUserName] = useState(savedUser || "Leehom");
  const [userEmail, setUserEmail] = useState("");
  // localStorage.clear()
  useEffect(() => {
    if (userStatus === "logined") {
      localStorage.setItem(LOCALSTORAGE_KEY, userName);
      localStorage.setItem(LOCALSTORAGE_KEY_LOGIN, userStatus);
    }
  }, [userStatus, userName, userStatus]);
//
  return (
    <>
      {userStatus === "login" && <SignIn setUserStatus={setUserStatus} setUserName={setUserName} setUserEmail={setUserEmail} />}
      {userStatus === "signup" && <SignUp setUserStatus={setUserStatus} />}
      {userStatus === "logined" && <Logined setUserStatus={setUserStatus} userEmail = {userEmail}/>}
    </>
  );
}

export default App;
