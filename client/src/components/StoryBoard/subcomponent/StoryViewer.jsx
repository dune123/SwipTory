import React, { useState } from 'react'
import styles from "./StoryViewer.module.css"
import Showstory from '../subcomponent2/Showstory'

const StoryViewer = ({slideData}) => {
  const slides=slideData.slides
  const [storyView,setStoryView]=useState(false);

  return (
    <div className={styles.storyContainer} style={{backgroundImage:`url(${slides[0].imageUrl})`}} onClick={()=>setStoryView(true)}>
        <h3>{slides[0].header}</h3>
        <p>{slides[0].description.substring(0,80)}...</p>
      {
        storyView&&<Showstory slides={slides} setStoryView={setStoryView}/>
      }
    </div>
  )
}

export default StoryViewer