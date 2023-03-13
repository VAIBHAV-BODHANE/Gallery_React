import React from "react";

import classes from './ConfirmModal.module.css';
import Card from "./Card";
import config from "../../config";


const ConfirmModal = (props) => {

  const confirmDelete = async(post_id) => {
    const requestOptions = {
      'method': 'DELETE',
      'headers': {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('authorization')}
    }
    const response = await fetch(config.baseUrl + '/gallery/' + post_id + '/', requestOptions)
    const data = await response.json()
    console.log(data);
    if (response.status === 200) {
      props.isDelete(data)
      props.onConfirm()
    }else {
      props.isDelete(data)
      props.onConfirm()
    }
  }

  return (
    <React.Fragment>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>Confirm to delete the post!</p>
        </div>
        <footer className={classes.actions}>
          <div className={`${classes['user-form__button']}`}>
            <button type='button' className={classes} onClick={props.onConfirm}>Cancel</button>
            <button type='button' className={classes} onClick={() => confirmDelete(props.post.id)}>Confirm</button>
          </div>
        </footer>
      </Card>
    </React.Fragment>
  );
};

export default ConfirmModal;