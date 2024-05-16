import React, { useState, useEffect, useContext } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import styles from "./Showstory.module.css";
import axios from "axios";
import LoginCard from "../../LoginCard/LoginCard";
import { Context } from "../../../main";

const Showstory = ({ slides, setStoryView }) => {
  const slideDuration = 6000;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const token = window.localStorage.getItem("token");

  const [bookmarkStatus, setBookmarkStatus] = useState(slides.map(() => false));
  const [linkCopiedStatus, setLinkCopiedStatus] = useState(
    slides.map(() => {
      return false;
    })
  );

  const [likeCount, setLikeCount] = useState(
    slides.map((slide) => slide.likes.length)
  );
  const [likeStatus, setLikeStatus] = useState(
    slides.map((slide) => slide.likes.includes(localStorage.getItem("userId")))
  );

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  useEffect(() => {
    const fetchBookMarkStatus = async () => {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      axios
        .get(
          `http://localhost:3000/api/slide/isBookmarked/${slides[currentSlideIndex]._id}`
        )
        .then((res) => {
          const data = res.data.isBookmarked;
          const newBookmarkStatus = [...bookmarkStatus];

          newBookmarkStatus[currentSlideIndex] = data;
          setBookmarkStatus(newBookmarkStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isAuthenticated) {
      fetchBookMarkStatus();
    }
  }, [currentSlideIndex, bookmarkStatus, slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, slideDuration);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlideIndex]);

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  //Handel Bookmark status
  const handleBookmark = async (slideIndex) => {
    const slideId = slides[slideIndex]._id;
    const endPoint = bookmarkStatus[slideIndex]
      ? "removeBookmark"
      : "addBookmark";
    axios.defaults.headers.common["Authorization"] = `${token}`;
    axios
      .post(`http://localhost:3000/api/slide/${endPoint}`, {
        slideId,
      })
      .then((res) => {
        if (isAuthenticated) {
          const newBookmarkStatus = [...bookmarkStatus];
          newBookmarkStatus[slideIndex] = !bookmarkStatus[slideIndex];
          setBookmarkStatus(newBookmarkStatus);
        } else {
          const container = document.getElementById("superContainer");
          console.log(container);
          container.style.display = "none";
          setShowLoginCard(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = async (slideIndex) => {
    const slideId = slides[slideIndex]._id;
    axios.defaults.headers.common["Authorization"] = `${token}`;
    axios
      .post(`http://localhost:3000/api/slide/like`, {
        slideId,
      })
      .then((res) => {
        const data = res.data;
        const updateCount = data.likeCount;
        const newLikeCount = [...likeCount];
        newLikeCount[slideIndex] = updateCount;
        setLikeCount(newLikeCount);

        const updateStatus = data.likeStatus;
        const newLikeStatus = [...likeStatus];
        newLikeStatus[slideIndex] = updateStatus;
        setLikeStatus(newLikeStatus);
      })
      .catch((error) => {
        console.error("Error while performing like action:", error);
      });
  };

  const handleShare = (slideIndex) => {
    const link = `http://localhost:3000/?slide=true&id=${slides[slideIndex]._id}`;
    navigator.clipboard.writeText(link);
    const newLinkCopiedStatus = [...linkCopiedStatus];
    newLinkCopiedStatus[slideIndex] = true;
    setLinkCopiedStatus(newLinkCopiedStatus);

    setTimeout(() => {
      const newLinkCopiedStatus = [...linkCopiedStatus];
      newLinkCopiedStatus[slideIndex] = false;
      setLinkCopiedStatus(newLinkCopiedStatus);
    }, 1000);
  };

  const handleContainerClick = (event) => {
    const containerWidth = event.currentTarget.offsetWidth;
    const clickX = event.nativeEvent.offsetX;
    const clickY = event.nativeEvent.offsetY;
    const clickPercentage = (clickX / containerWidth) * 100;

    if (clickY >= 75 && clickY <= 550) {
      if (clickPercentage <= 50) {
        handlePreviousSlide();
      } else {
        handleNextSlide();
      }
    }
  };
  return (
    <>
      <div className={styles.container} id="superContainer">
        <GrFormPrevious
          onClick={handlePreviousSlide}
          className={styles.moveIcons}
        />
        <div className={styles.cardcontainer}>
          <div className={styles.top}>
            <div className={styles.progressBarContainer}>
              {slides.map((slide, index) => {
                const isCompleted = index <= currentSlideIndex;
                const isActive = index === currentSlideIndex;
                return (
                  <div
                    key={index}
                    className={`${styles.progressBar} ${
                      isCompleted ? styles.progressBarCompleted : ""
                    } ${isActive ? styles.progressBarActive : ""}`}
                  ></div>
                );
              })}
            </div>
            <div className={styles.Topicons}>
              <IoMdClose
                className={styles.closeIcons}
                onClick={() => setStoryView(false)}
              />
              <img
                onClick={() => {
                  handleShare(currentSlideIndex);
                }}
                src="/shareIcon.png"
              />
            </div>
          </div>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0 ), rgba(0, 0, 0,  0.8)), linear-gradient(rgba(0, 0, 0, 0.2 ), rgba(0, 0, 0,   0)),url(${slides[currentSlideIndex].imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(event) => handleContainerClick(event)}
            className={styles.categoryStory}
          >
            {linkCopiedStatus[currentSlideIndex] && (
              <div className={styles.linkCopiedMsg}>
                Link copied to clipboard
              </div>
            )}

            <div className={styles.categoryStoryHeader}>
              {slides[currentSlideIndex].header}
            </div>
            <div className={styles.categoryStoryDescription}>
              {slides[currentSlideIndex].description.substring(0, 80)}...
            </div>
          </div>
          <div className={styles.bottom}>
            {!bookmarkStatus[currentSlideIndex] ? (
              <FaRegBookmark
                className={styles.bookmark}
                onClick={() => handleBookmark(currentSlideIndex)}
              />
            ) : (
              <FaBookmark
                className={styles.bookmark}
                onClick={() => handleBookmark(currentSlideIndex)}
              />
            )}
            <div className={styles.likesOv}>
              {!likeStatus[currentSlideIndex] ? (
                <CiHeart
                  className={styles.likes}
                  onClick={() => handleLike(currentSlideIndex)}
                />
              ) : (
                <FaHeart
                  className={styles.likes}
                  onClick={() => handleLike(currentSlideIndex)}
                />
              )}
              <p
                style={{
                  color: "white",
                }}
              >
                {likeCount[currentSlideIndex]}
              </p>
            </div>
          </div>
        </div>
        <MdNavigateNext
          onClick={handleNextSlide}
          className={styles.moveIcons}
        />
      </div>
      {showLoginCard && <LoginCard setShowLoginCard={setShowLoginCard} />}
    </>
  );
};

export default Showstory;
