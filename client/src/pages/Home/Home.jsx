import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import axios from 'axios';
import StoryBoard from '../../components/StoryBoard/StoryBoard';

const filters = [
  {
    name: "All",
    imageUrl:
      "/all.jpg",
  },
  {
    name: "Education",
    imageUrl:
      "/education.jpg",
  },
  {
    name: "health and fitness",
    imageUrl:
      "/health.jpg",
  },
  {
    name: "movie",
    imageUrl:
      "/movie.jpg",
  },
  {
    name: "Food",
    imageUrl:
      "/food.png",
  },
  {
    name: "Travel",
    imageUrl:
      "/travel.jpg",
  },
];

const Home = () => {
  const [selectedCategory,setSelectedCategory]=useState("All");
  const [totalStory,setTotalStory]=useState(null);

  const handleCategory = (name) => {
    const category = document.getElementById(name);
    if (!category) return; 
  
    if (selectedCategory === name) {
      category.style.border = "none";
      setSelectedCategory(null);
    } else {
      if (selectedCategory) {
        const prevCategory = document.getElementById(selectedCategory);
        prevCategory.style.border = "none";
      }
      category.style.border = "2px solid #00ACD2";
      setSelectedCategory(name);
    }
  };


  return (
    <div className={styles.supercontainer}>
        <div className={styles.categoryContainer}>
          {
            filters.map((data,index)=>(
              <div className={styles.eachCategory} key={index} style={{backgroundImage:`url(${data.imageUrl})`,cursor:"pointer"}} onClick={()=>handleCategory(data.name)} id={data.name}>
                  <h3>{data.name}</h3>
              </div>
            ))
          }
        </div>
        <div className={styles.storyContainer}>
          {
            selectedCategory==="All"?
            filters.filter((data)=>data.name!=="All")
            .map((data,index)=>(
              <StoryBoard category={data.name} key={index}/>
            ))
            :
            <StoryBoard category={selectedCategory}/>
          }
        </div>
    </div>
  )
}

export default Home