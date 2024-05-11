import React, { useState,useEffect } from 'react'
import styles from "./StoryBoard.module.css"
import axios from 'axios'
import StoryViewer from './subcomponent/StoryViewer'

const StoryBoard = ({category}) => {
  const [story,setStory]=useState(null)
  useEffect(()=>{
    const getallstory=async()=>{
      await axios.get(`http://localhost:3000/api/story/getstory/${category}`)
      .then((res)=>{
        setStory(res.data.posts);
      })
      .catch((error)=>{
        console.log(error);
      })
  }
  getallstory()
  },[category])
  return (
    <div className={styles.storyBoard}>
        <h1>Top Stories {category}</h1>
        <div class={styles.storyViewer}>
        {
            story&&story.map((slidesData, index) =>(
                <StoryViewer slideData={slidesData} key={index}/>
            ))
        }
        </div>
    </div>
  )
}

export default StoryBoard