import React, { useContext, useState } from "react";
import styles from "./LoginCard.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {Context} from "../../main"
import axios from "axios";

const registerCard = ({ setShowLoginCard }) => {
  const [formvalue, setFormvalue] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(null);
  const {isAuthenticated,setIsAuthenticated}=useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:3000/api/user/login`, formvalue)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData)
        setIsAuthenticated(true);
        window.localStorage.setItem("token", responseData.token);
        window.localStorage.setItem("userId", responseData.userId);
        window.localStorage.setItem("username", responseData.username);
        setShowError(false);
        setShowLoginCard(false);
      })
      .catch((error) => {
        setShowError(true);
        setErrorMessage(error.message);
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <IoIosCloseCircleOutline
          className={styles.closeContainer}
          onClick={() => setShowLoginCard(false)}
        />
        <h3>Login to SwipTory</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputUsername}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={formvalue.username}
              onChange={(e) => {
                setFormvalue((prev) => {
                  return { ...prev, username: e.target.value };
                });
              }}
            />
          </div>
          <div className={styles.inputPassword}>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formvalue.password}
              onChange={(e) => {
                setFormvalue((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            {showPassword ? (
              <IoMdEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eye}
              />
            ) : (
              <IoMdEye
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eye}
              />
            )}
          </div>
          {showError && <div className={styles.error}>{errorMessage}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default registerCard;
