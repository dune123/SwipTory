import React from 'react'
import styles from "./StoryViewer.module.css"

const StoryViewer = ({slideData}) => {
  const slides=slideData.slides
  
  return (
    <div className={styles.storyContainer} style={{backgroundImage:`url(${slides[0].imageUrl})`}}>
        <h3>{slides[0].header}</h3>
        <p>{slides[0].description}</p>
    </div>
  )
}

export default StoryViewer