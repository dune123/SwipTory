import React, { useEffect, useState } from 'react';
import styles from "./Bookmark.module.css";
import axios from 'axios';
import StoryViewer from './subComponent/bookmarkStory';

const Bookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBookmark = async () => {
    axios.defaults.headers.common["Authorization"] = `${token}`;
    try {
      const res = await axios.get(`http://localhost:3000/api/slide/getallBookmark`);
      setBookmark(res.data.bookmarks);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    }
  };

  useEffect(() => {
    fetchBookmark();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Your Bookmarks</h1>
      <div className={styles.bookmarkContainer}>
        {bookmark.length > 0 ? (
          bookmark.map((data, index) => (
            <StoryViewer slide={data.slides} key={index} />
          ))
        ) : (
          <p>No bookmarks found.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
