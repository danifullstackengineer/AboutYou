import React, { useState } from "react";
import { loginAdmin } from "../../API/Admin";
import { handleValidationAdmin } from "../../Logic/admin";
import "../../styles/components/Admin/LoginAdmin.css";

const LoginAdmin = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const valid = handleValidationAdmin(username, password, accessCode);
    setShowMessage(true);
    setValidMessage(valid.message);
    setTimeout(()=>{
      setShowMessage(false);
      setValidMessage("");
    }, 2000)
    if(valid.truth){
      loginAdmin(username, password, accessCode)
      .then(res=>{

      })
      .catch(err=>{

      })
    }
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");

  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [validMessage, setValidMessage] = useState<string>("This is a test message.");

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="loginAdmin">
      <span>Username</span>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required={true}
      />
      <span>Password</span>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      />
      <span>Access Code</span>
      <input
        type="text"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
        required={true}
      />
      <button type="submit">Log In</button>
      {showMessage ? <span className="loginAdmin__message">{validMessage}</span> : ""}
    </form>
  );
};

export default React.memo(LoginAdmin);
