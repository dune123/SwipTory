import React, { useContext, useEffect, useState } from "react";
import styles from "./AddStoryCard.module.css";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStoryCard = ({ setShowAddStoryCard }) => {
  const [story, setStory] = useState([]);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [error, setError] = useState(null);
  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");

  //Initializing the first 3 slides
  useEffect(() => {
    const initialStory = [
      {
        header: "",
        description: "",
        imagUrl: "",
        category: "",
      },
      {
        header: "",
        description: "",
        imagUrl: "",
        category: "",
      },
      {
        header: "",
        description: "",
        imagUrl: "",
        category: "",
      },
    ];
    setStory(initialStory);
  }, []);

  const addNewSlide = () => {
    if (story.length === 6) {
      setError("You can not add more than 6 slide");
      return;
    }
    const updatedStory = [...story];
    const newSlide = {
      header: "",
      description: "",
      imageUrl: "",
      category: "",
    };
    updatedStory.push(newSlide);
    setStory(updatedStory);
  };

  const onClickSlide = (index) => {
    setSelectedSlide(index);
  };
  const removeSlide = (index) => {
    if (story.length > 3 && index !== selectedSlide) {
      story.splice(index, 1);
    } else {
      setError("you can not remove selected slide");
    }
  };

  const addStory = async () => {
    axios.defaults.headers.common["Authorization"] = `${token}`;
    await axios
      .post(`http://localhost:3000/api/story/addpost`, { slides:story })
      .then((res) => {
        toast.success(res.data.message);
        setShowAddStoryCard(false);
      })
      .catch((err) => {
        setError(err);
      });
  };
  console.log(story);
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <FaRegTimesCircle
          className={styles.cardCross}
          onClick={() => setShowAddStoryCard(false)}
        />
        <div className={styles.slideContainer}>
          {story.map((data, index) => (
            <div
              className={
                selectedSlide === index ? styles.selectedSlide : styles.slides
              }
              key={index}
              onClick={() => onClickSlide(index)}
            >
              slide {index + 1}
              {story.length > 3 && index > 2 && (
                <FaRegTimesCircle
                  className={styles.slidecross}
                  onClick={() => removeSlide(index)}
                />
              )}
            </div>
          ))}
          <div className={styles.slides} onClick={() => addNewSlide()}>
            add +
          </div>
        </div>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.headerInput}>
              <label>header:</label>
              <input
                placeholder="your header"
                value={story[selectedSlide]?.header || ""}
                onChange={(e) => {
                  const updatedStory = [...story];
                  updatedStory[selectedSlide].header = e.target.value;
                  setStory(updatedStory);
                }}
              />
            </div>
            <div className={styles.DescriptionInput}>
              <label>Description:</label>
              <textarea
                placeholder="Your description"
                value={story[selectedSlide]?.description || ""}
                onChange={(e) => {
                  const updatedStory = [...story];
                  updatedStory[selectedSlide].description = e.target.value;
                  setStory(updatedStory);
                }}
              ></textarea>
            </div>
            <div className={styles.imageInput}>
              <label>ImageUrl:</label>
              <input
                placeholder="image url"
                value={story[selectedSlide]?.imageUrl || ""}
                onChange={(e) => {
                  const updatedStory = [...story];
                  updatedStory[selectedSlide].imageUrl = e.target.value;
                  setStory(updatedStory);
                }}
              />
            </div>
            <div className={styles.categoryinput}>
              <label>category:</label>
              <select
                placeholder="select category"
                value={story[selectedSlide]?.category || ""}
                onChange={(e) => {
                  const updatedStory = [...story];
                  updatedStory[selectedSlide].category = e.target.value;
                  setStory(updatedStory);
                }}
              >
                <option value="All">All</option>
                <option value="Education">Education</option>
                <option value="health and fitness">health and fitness</option>
                <option value="movie">movie</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
          </form>
        </div>
        {error && <p style={{ color: "red", marginLeft: "4vw" }}>{error}</p>}
        <div className={styles.buttonContainer}>
          <div className={styles.leftButtons}>
            <button
              style={{ backgroundColor: "#7EFF73" }}
              onClick={() => {
                if (selectedSlide > 0) {
                  setSelectedSlide(selectedSlide - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#73ABFF" }}
              onClick={() => {
                if (selectedSlide < story.length - 1) {
                  setSelectedSlide(selectedSlide + 1);
                }
              }}
            >
              Next
            </button>
          </div>
          <div className={styles.rightButtons}>
            <button
              style={{ backgroundColor: "#FF7373" }}
              onClick={() => addStory()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStoryCard;
