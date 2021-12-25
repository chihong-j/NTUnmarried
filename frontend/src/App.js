import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import Logined from './Containers/Logined';
import { useEffect, useState } from "react";
import useChat from "../hooks/useChat";


function App() {
  const [userStatus, setUserStatus] = useState("login");
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY_ME);
  const [userName, setUserName] = useState(savedMe || "");
  const savedPa = localStorage.getItem(LOCALSTORAGE_KEY_PA);
  const [password, setPassword] = useState(savedPa || "");
  useEffect(() => {
    if (userStatus === "Home") {
      localStorage.setItem(LOCALSTORAGE_KEY_ME, userName);
      localStorage.setItem(LOCALSTORAGE_KEY_PA, password);
    }
  }, [userStatus, password, userName]);

  return (
    <>
      {userStatus === "login" && <SignIn setUserStatus={setUserStatus} />}
      {userStatus === "signup" && <SignUp setUserStatus={setUserStatus} />}
      {userStatus === "logined" && <Logined/>}
    </>
  );
}

export default App;
