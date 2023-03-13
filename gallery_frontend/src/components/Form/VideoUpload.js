import React from "react";
import { useState, useRef } from "react";
import config from "../../config";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import classes from './VideoUpload.module.css';


const VideoUpload = (props) => {
  let formdata = new FormData();
  const captionRef = useRef()

  const [error, setError] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0].name);
      formdata.append('video_post', e.target.files[0]);
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault()
    
    formdata.append("post_caption",captionRef.current.value)
    // }
    const requestOptions = {
      'credentials': 'same-origin',
      'method': 'POST',
      'headers': {
        'Authorization': localStorage.getItem('authorization')
      },
      'body': formdata
    }
    const response = await fetch(config.baseUrl + '/gallery/', requestOptions)
    const data = await response.json()
    console.log('data================', data);
    console.log('response================', response);
    if (response.status === 201) {
			captionRef.current.value = ''
      // setBase(null)
    } else {
      let key = Object.keys(data)[0]
      setError({
        title: 'Invalid Data',
        message: data[key]
      })
    }
    props.onConfirm()

  }

  const confirmHandler = () => {
    setError(null)
  }

  return (
    <Card>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={confirmHandler}/>}
      <form className={`${classes['form']}`} onSubmit={submitHandler}>
        <div className={`${classes['user-form']}`}>
          <div className={`${classes['user-form__label']}`}>
            <label htmlFor='attachment'>Upload Video</label>
          </div>
          <div className={`${classes['user-form__input']}`}>
            <input id="fileInput" name='attachment' type="file" onChange={handleFileChange} required/>
            {/* <FileBase type='file' multiple={false} onDone={(base64)=>setBase(base64)} /> */}
          </div>
          <div className={`${classes['user-form__label']}`}>
            <label htmlFor='reason'>Caption</label>
          </div>
          <div className={`${classes['user-form__input']}`}>
            <input name='reason' type="text" ref={captionRef} required/>
          </div>
          <div className={`${classes['user-form__button']}`}>
            <button type='button' className={`${classes['user-form__cancel']}`} onClick={props.onConfirm}>Cancel</button>
            <button type='submit'>Add</button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default VideoUpload;