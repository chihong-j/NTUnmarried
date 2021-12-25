import './App.css';
import SignIn from './Containers/SignIn';
import SignUp from './Containers/SignUp';
import { useEffect, useState } from "react";

function App() {
  const [signIn, setSignIn] = useState(false);
  return (
    <>
    {signIn ? <SignIn /> : <SignUp />} 
    </>
  );
}

export default App;
