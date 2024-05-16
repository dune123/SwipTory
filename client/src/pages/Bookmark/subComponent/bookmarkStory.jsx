import React, { useEffect, useState } from 'react';
import styles from './StoryViewer.module.css';
import Showstory from '../../../components/StoryBoard/subcomponent2/Showstory';

const StoryViewer = ({ slide }) => {
  const [storyView, setStoryView] = useState(false);
  
  return (
    <div
      className={styles.storyContainer}
      onClick={() => setStoryView(true)}
      style={{backgroundImage: `url(${slide[0].imageUrl})`}}
    >
      <h3 style={{ color: 'white' }}>{slide[0].header}</h3>
      <p>{slide[0].description.substring(0,80)}...</p>
      {storyView && <Showstory slides={slide} setStoryView={setStoryView} />}
    </div>
  );
};

export default StoryViewer;
