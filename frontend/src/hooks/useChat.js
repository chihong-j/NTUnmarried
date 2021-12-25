import { useState, useEffect } from "react";
const LOCALSTORAGE_KEY_EMAIL = "save-email";
const LOCALSTORAGE_KEY_USER = "save-user";
const LOCALSTORAGE_KEY_PA = "save-pa";

const useChat = () => {
    const [userStatus, setUserStatus] = useState("login");
    const savedEmail = localStorage.getItem(LOCALSTORAGE_KEY_EMAIL);
    const [email, setEmail] = useState(savedEmail || "");
    const savedUserName = localStorage.getItem(LOCALSTORAGE_KEY_USER);
    const [userName, setUserName] = useState(savedUserName || "");
    const savedPa = localStorage.getItem(LOCALSTORAGE_KEY_PA);
    const [password, setPassword] = useState(savedPa || "");
    useEffect(() => {
        if (userStatus === "Home") {
            localStorage.setItem(LOCALSTORAGE_KEY_EMAIL, email);
            localStorage.setItem(LOCALSTORAGE_KEY_USER, userName);
            localStorage.setItem(LOCALSTORAGE_KEY_PA, password);
        }
    }, [userStatus, email, password, userName]);
    return {
        userStatus,
        setUserStatus,
        email,
        setEmail,
        userName,
        setUserName,
        password,
        setPassword,
    };
};
export default useChat;
