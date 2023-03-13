import { useRef, useState } from 'react';

import styles from './Register.module.css'
import Card from '../UI/Card';

import Login from './Login';
import ErrorModal from '../UI/ErrorModal';
import config from '../../config';

const Register = () => {

	const emailRef = useRef()
	const nameRef = useRef()
	const passwordRef = useRef()

	const [login, setLogin] = useState(false)
	const [isValid, setIsValid] = useState(true)
	// const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
	const [error, setError] = useState();

	const submitHandler = async(event) => {
		event.preventDefault()
		const regiData = {
			'email': emailRef.current.value,
			'name': nameRef.current.value,
			'password': passwordRef.current.value,
		}
		const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regiData)
    };
    const response = await fetch(config.baseUrl + '/register/', requestOptions)
    const data = await response.json()
    const status = response.status
    console.log(response.status);
    console.log(data);
    // console.log(authenticated);
		if (status === 201) {
			emailRef.current.value = ''
			nameRef.current.value = ''
			passwordRef.current.value = ''
			// setAuthenticated(true)
			// localStorage.setItem("authenticated", true)
			// localStorage.setItem("authorization", data.token)
			setError({
				title: 'Success',
				message: data.message
			})
    } else {
      passwordRef.current.value = ''
	  let key = Object.keys(data)[0]
      setIsValid(false)
	  setError({
        title: 'Invalid Data',
        message: data[key]
      })
    }
	}

	const onChangeHandler = (e) => {
		if (e.target.value.length > 0) {
			setIsValid(true)
		}
	}

	const loginHandler = () => {
		setLogin(true)
	}

	const confirmHandler = () => {
		setError(null)
	}

	return (
		<div>
			{error && <ErrorModal title={error.title} message={error.message} onConfirm={confirmHandler}/>}			
			<Card>
				{!login === true ?
				<form onSubmit={submitHandler}>
					<div className={`${styles['user-form']}`}>
						<h1>Sign Up</h1>
						<div className={`${styles['user-form__label']}`}>
							<label>Email</label>
						</div>
						<div className={`${styles['user-form__input']}`}>
							<input type="email" ref={emailRef} required />
						</div>
						<div className={`${styles['user-form__label']}`}>
							<label>Name</label>
						</div>
						<div className={`${styles['user-form__input']}`}>
							<input type="text" ref={nameRef} required />
						</div>
						<div className={`${styles['user-form__label']} ${!isValid && styles.invalid}`}>
							<label>Password</label>
						</div>
						<div className={`${styles['user-form__input']} ${!isValid && styles.invalid}`}>
							<input type="password" onChange={onChangeHandler} ref={passwordRef} required />
						</div>
						<div className={`${styles['user-form__button']}`}>
							<button type='submit'>Sign Up</button>
							<button type='button' onClick={loginHandler}>Login</button>
						</div>
						{/* <div className={`${styles['user-form__button']}`}>
						</div> */}
					</div>
				</form>
			: <Login/>}
			</Card>
		</div>
	);
};

export default Register;