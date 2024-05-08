import React, { useState } from "react";
import styles from "./RegisterCard.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";

const registerCard = ({ setShowRegisterCard }) => {
  const [formvalue, setFormvalue] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post(
        `http://localhost:3000/api/user/register`,
        formvalue ,{
          withCredentials:true
        }
      )
      .then((res)=>{
        setShowRegisterCard(false)
        setShowError(false);
      })
      .catch((err)=>{
        setShowError(true);
        setErrorMessage(err.message);
      })
  };
  console.log(formvalue);
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <IoIosCloseCircleOutline
          className={styles.closeContainer}
          onClick={() => setShowRegisterCard(false)}
        />
        <h3>Register to SwipTory</h3>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default registerCard;
