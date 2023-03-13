import React from "react";
import { useState } from "react";

import Card from "../UI/Card";
import classes from './PostTab.module.css'
import ImageUpload from "../Form/ImageUpload";
import VideoUpload from "../Form/VideoUpload";


const PostTab = (props) => {

  const [isImage, setIsImage] = useState(true);
  const [isVideo, setIsVideo] = useState(false);

  const imageHandler = () =>{
    setIsVideo(false)
    setIsImage(true)
  }

  const videoHandler = () => {
    setIsImage(false)
    setIsVideo(true);
  }


  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Upload Post</h2>
        </header>
        <div className={classes.tab__group}>
          <button className={isImage === true ? classes.tab__group__active : classes.tab__group__button} onClick={imageHandler}>Image</button>
          <button className={isVideo === true ? classes.tab__group__active : classes.tab__group__button} onClick={videoHandler}>Video</button>
        </div>
        {isImage && <ImageUpload onConfirm={props.onConfirm} />}
        {isVideo && <VideoUpload onConfirm={props.onConfirm} />}
        
      </Card>
    </div>
  );
};

export default PostTab;