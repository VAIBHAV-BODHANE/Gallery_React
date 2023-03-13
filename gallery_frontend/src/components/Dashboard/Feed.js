import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Feed.module.css';
import Card from '../UI/Card';
import PostTab from './PostTab';
import config from '../../config'
import ErrorModal from '../UI/ErrorModal';
import InfoModal from '../UI/InfoModal';
import ConfirmModal from '../UI/ConfirmModal';


const Feed = () => {

  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated'));
  const [token, setToken] = useState(localStorage.getItem('authorization'));
  const [dataList, setDataList] = useState([]);
  const [upload, setUpload] = useState(false);
  const [error, setError] = useState();
  const [option, setOption] = useState(false);
  const [info, setInfo] = useState();
  const [deleteOption, setDeleteOption] = useState(false);
  const [del, setDel] = useState();


  const navigate = useNavigate();

  useEffect(()=>{
    setAuthenticated(localStorage.getItem('authenticated'))
    setToken(localStorage.getItem('authorization'))

    async function postList() {
      const requestOptions = {
        'credentials': 'same-origin',
        'method': 'GET',
        'headers': {'Content-Type': 'application/json', 'Authorization': token}
      }
      const response = await fetch(config.baseUrl + '/gallery/', requestOptions)
      const data = await response.json()
      console.log(data);
      if (response.status === 200) {
        console.log('ok');
        setDataList(data.data);
      }
       else {
        let key = Object.keys(data)[0]
        setError({
          title: 'Invalid Data',
          message: data[key]
        })
        localStorage.removeItem("authorization")
        localStorage.removeItem("authenticated")
      }
    }  
    postList();  
  }, [token, error, upload]);

  const postHandler = () => {
    setUpload(!upload);
  };

  const confirmHandler = () => {
    setError(null);
  };

  const optionHandler = () => {
    setOption(!option);
  };

  const infoHandler = (post) => {
    setOption(!option);
    setInfo(post);
  };

  const delOptionHandler = () => {
    setDeleteOption(!deleteOption);
  };

  const delHandler = (post) => {
    setDeleteOption(!deleteOption);
    setDel(post);
  };
  
  const isDeleteHandler = (res) => {
    let key = Object.keys(res)[0]
    if (key === 'detail') {
      setError({
        title: 'Failed',
        'message': res.detail
      })
    } else {
      setError({
        title: 'Success',
        'message': res.message
      })
    }
  }

  const logoutHandler = async() => {
    const requestOptions = {
      'credentials': 'same-origin',
      'method': 'POST',
      'headers': {'Content-Type': 'application/json', 'Authorization': token}
    }
    const response = await fetch(config.baseUrl + '/logout/', requestOptions)
    const data = await response.json()
    console.log(data);
    if (response.status === 200) {
      localStorage.removeItem("authorization")
      localStorage.removeItem("authenticated")
      navigate('/login')
    }
     else {
      let key = Object.keys(data)[0]
      setError({
        title: 'Invalid Data',
        message: data[key]
      })
    
    }
  }

  console.log("authenticated",authenticated);
	if (!authenticated===true || authenticated === null) {
		console.log('here', token);
		navigate('/login')
	} else {
		return (
      <React.Fragment>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={confirmHandler}/>}
        {upload && <PostTab onConfirm={postHandler} token={token} authenticated={authenticated} />}
        {option && <InfoModal onConfirm={optionHandler} title='Post Details' post={info} />}
        {deleteOption && <ConfirmModal onConfirm={delOptionHandler} title='Delete Confirm' post={del} isDelete={(res) => isDeleteHandler(res)} />}
        <Card>
          <div className={`${styles['gallery-list']}`}>
            <div className={`${styles['upload__button']}`}>
              <button type='button' onClick={postHandler}>Upload</button>
              <button type='button' onClick={logoutHandler}>Logout</button>
              {/* <button type='button' onClick={applyLeaveHanlder}>Apply Leave</button>
              <button type='button'>Penfing Requests</button> */}
            </div>

            {dataList.map((post)=>
            (<div key={post.id} className={`${styles['gallery-list__container']}`}>
              <div className={`${styles['gallery-list__container__header']}`}>
                <h3 align='left'>{post.created_by}</h3>
                <div className={`${styles['dropdown']}`}>
                  <a href='#' className={`${styles['option__button']}`}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                  {/* <div className={`${option[post.id] === true ? styles['dropdown-display']:styles["dropdown-content"]}`}> */}
                  <div className={`${styles["dropdown-content"]}`}>
                    <a onClick={() => infoHandler(post)} style={{color: "#17a2b8"}}><i className={`fa fa-info-circle ${styles["dropdown__about"]}`} aria-hidden="true"></i>About</a>
                    <a onClick={() => delHandler(post)} style={{color: "#dc3545"}}><i className={`fa fa-trash ${styles["dropdown__delete"]}`} aria-hidden="true"></i>Delete</a>
                  </div>
                </div>
              </div>
              <div className={`${styles['gallery-list__container__video']}`}>
                {post.image_post &&
                  <img src={config.baseUrl + post.image_post} />
                }
                {post.video_post &&
                  <video controls>
                    <source src={config.baseUrl + post.video_post} type="video/mp4" />
                  </video>
                }
              </div>  
              <div className={styles.post__caption}>{post.post_caption}</div>          
            </div>))}

            {/* {dataList.map((emp)=>
              (<div key={emp.id} className={`${styles['leave-list__list']}`}>
                <EmployeeBox empid={emp.id} uid = {emp.id} />
                <div className={`${styles['leave-list__description']}`}>
                  <h2>{emp.first_name + ' ' + emp.last_name}</h2>
                </div>
                <div className={`${styles['leave-list__description']}`}>
                  <h4>{emp.designation}</h4>
                </div>
                <div className={`${styles['leave-list__description']}`}>
                  {emp.jod}
                </div>
              </div>
            ))} */}
          </div>
        </Card>
      </React.Fragment>
		)
	}
}

export default Feed;