import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

import Card from '../UI/Card';
import Register from './Register';
import ErrorModal from '../UI/ErrorModal';
import config from '../../config';
// import Cookies from 'universal-cookie';


const Login = () => {

  const emailRef = useRef()
	const passwordRef = useRef()

  // const [loginData, setLoginData] = useState({})
	const [login, setLogin] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState();
  // const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

  // useEffect(() => {
  //   // POST request using fetch inside useEffect React hook


  // // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, [loginData]);
  const navigate = useNavigate()

	const submitHandler = async(event) => {
		event.preventDefault()
    const loginData = {'email': emailRef.current.value, 'password': passwordRef.current.value}
    console.log({'email': emailRef.current.value});
    // setLoginData(prevState => {
    //   return { ...prevState, 'email': emailRef.current.value, 'password': passwordRef.current.value}
    // })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    };
    console.log(config);
    const response = await fetch(config.baseUrl + '/login/', requestOptions)
    const data = await response.json()
    const status = response.status
    console.log(response.status);
    console.log(data);
    // console.log(authenticated);
    // setAuthenticated(true)
    if (status === 200) {
      emailRef.current.value = ''
      passwordRef.current.value = ''
      localStorage.setItem("authenticated", true)
      localStorage.setItem("authorization", data.jwt)
      // const cookies = new Cookies();
      // let expires = new Date()
      // expires.setTime(expires.getTime() + (3600 * 1000))
      // cookies.set('jwt', data.jwt, { path: '/'})
      // if (JSON.parse(data.role).includes("Admin")){
      //   localStorage.setItem("role", 'Admin')
      // } else {
      //   localStorage.setItem("role", 'Employee')
      // }
      navigate("/feed")
    } else {
      passwordRef.current.value = ''
      let key = Object.keys(data)[0]
      setIsValid(false)
      setError({
        title: 'Invalid Data',
        message: data[key]
      })
      localStorage.removeItem("authorization")
    }
	}

  const onChangeHandler = (e) => {
    if (e.target.value.length > 0){
      setIsValid(true)
    }
  }

	const loginHandler = () => {
		setLogin(false)
	}

  const confirmHandler = () => {
    setError(null)
  }

	return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={confirmHandler}/>}
      <Card>
        {login === true ? 
        <form onSubmit={submitHandler}>
          <div className={`${styles['user-form']} ${!isValid && styles.invalid}`}>
            <h1>Login</h1>
            <div className={`${styles['user-form__label']}`}>
              <label>Email</label>
            </div>
            <div className={`${styles['user-form__input']}`}>
              <input type="email" ref={emailRef}/>
            </div>
            <div className={`${styles['user-form__label']}`}>
              <label>Password</label>
            </div>
            <div className={`${styles['user-form__input']}`}>
              <input type="password" onChange={onChangeHandler} ref={passwordRef} required />
            </div>
            <div className={`${styles['user-form__button']}`}>
              <button type='button' onClick={loginHandler}>Sign Up</button>
              <button type='submit'>Login</button>
            </div>
            {/* <div className={`${styles['user-form__button']}`}>
            </div> */}
          </div>
        </form>
      : <Register/>}
      </Card>
    </div>
	);

};

export default Login;