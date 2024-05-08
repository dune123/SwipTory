import React, { useState, useContext } from "react";
import styles from "./Navbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";
import LoginCard from "../LoginCard/LoginCard";
import RegisterCard from "../RegisterCard/RegisterCard";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AddStoryCard from "../AddStory/AddStoryCard";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuDesktop, setShowMenuDesktop] = useState(false);
  const [showRegisterCard, setShowRegisterCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [showAddStoryCard, setShowAddStoryCard] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = async () => {
    axios.defaults.headers.common["Authorization"] = `${token}`;
    axios
      .post(`http://localhost:3000/api/user/logout`, {
        username,
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        setShowMenuDesktop(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1>SwipTory</h1>
        </div>
        {!isAuthenticated ? (
          <div className={styles.rightContainer}>
            <button
              className={styles.register}
              onClick={() => setShowRegisterCard(true)}
            >
              register Now
            </button>
            <button
              className={styles.signin}
              onClick={() => setShowLoginCard(true)}
            >
              Log In
            </button>
            <GiHamburgerMenu
              className={styles.menu}
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        ) : (
          <div className={styles.rightContainer}>
            <button
              className={styles.bookmark}
              onClick={() => {
                navigate("/");
              }}
            >
              <IoIosBookmark />
              Bookmark
            </button>
            <button
              className={styles.signin}
              onClick={() => setShowAddStoryCard(true)}
            >
              Add story
            </button>
            <GiHamburgerMenu
              className={styles.menuForDestop}
              onClick={() => setShowMenuDesktop(true)}
            />
          </div>
        )}
      </div>
      {showMenu &&
        (!isAuthenticated ? (
          <div className={styles.menuContainer}>
            <IoMdClose
              className={styles.close}
              onClick={() => setShowMenu(!showMenu)}
            />
            <div className={styles.smallButton}>
              <button onClick={() => setShowLoginCard(true)}>Log In</button>
              <button onClick={() => setShowRegisterCard(true)}>
                Register
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.menuContainerForlogin}>
              <p>{username}</p>
              <IoMdClose
                className={styles.closeForLogin}
                onClick={() => setShowMenu(!showMenu)}
              />
            <div className={styles.smallButton}>
              <button>Your Story</button>
              <button>Add Story</button>
              <button onClick={() => setShowLoginCard(true)}>
                <IoIosBookmark />
                Bookmark
              </button>
              <button onClick={() => setShowRegisterCard(true)}>Logout</button>
            </div>
          </div>
        ))}
      {showMenuDesktop && (
        <div className={styles.menuContainerDesktop}>
          <p
            onClick={() => setShowMenuDesktop(false)}
            style={{ position: "relative", left: "6vw", cursor: "pointer" }}
          >
            X
          </p>
          <p className={styles.username}>{username}</p>
          <button className={styles.logout} onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      )}
      {showRegisterCard && (
        <RegisterCard setShowRegisterCard={setShowRegisterCard} />
      )}
      {showLoginCard && <LoginCard setShowLoginCard={setShowLoginCard} />}
      {
        showAddStoryCard&&<AddStoryCard setShowAddStoryCard={setShowAddStoryCard}/>
      }
    </>
  );
};

export default Navbar;

//check for Navbar mobile view
