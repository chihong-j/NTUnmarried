import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import { useEffect, useState } from "react";

function App() {
  const [userStatus, setUserStatus] = useState("login");
  return (
    <>
      {userStatus === "login" && <SignIn setUserStatus={setUserStatus} />}
      {userStatus === "signup" && <SignUp setUserStatus={setUserStatus} />}
    </>
  );
}

export default App;
