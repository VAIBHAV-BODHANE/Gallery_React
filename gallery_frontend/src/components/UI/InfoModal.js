import React from "react";

import classes from './InfoModal.module.css';
import Card from "./Card";


const InfoModal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>Created by: {props.post.created_by}</p>
          <p>Created datetime: {props.post.created}</p>
        </div>
        <footer className={classes.actions}>
          <div className={`${classes['user-form__button']}`}>
            <button type='button' className={classes} onClick={props.onConfirm}>Okay</button>
          </div>
        </footer>
      </Card>
    </React.Fragment>
  );
};

export default InfoModal;