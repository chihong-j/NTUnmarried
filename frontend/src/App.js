import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import Logined from './Containers/Logined';
import { useEffect, useState } from "react";

const LOCALSTORAGE_KEY = "save-name";
const LOCALSTORAGE_KEY_LOGIN = "save-login";
const LOCALSTORAGE_KEY_EMAIL = "save-email";
  
  
function App() {
  const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  const savedLogin = localStorage.getItem(LOCALSTORAGE_KEY_LOGIN);
  const savedEmail = localStorage.getItem(LOCALSTORAGE_KEY_EMAIL);
  const [userStatus, setUserStatus] = useState(savedLogin || "login");

  const [userName, setUserName] = useState(savedUser || "Leehom");
  const [userEmail, setUserEmail] = useState(savedEmail || "");

  localStorage.clear()
  useEffect(() => {
    if (userStatus === "logined") {
      localStorage.setItem(LOCALSTORAGE_KEY, userName);
      localStorage.setItem(LOCALSTORAGE_KEY_LOGIN, userStatus);
      localStorage.setItem(LOCALSTORAGE_KEY_EMAIL, userEmail);
    }
  }, [userStatus, userName, userEmail]);
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
