import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        axios
            .post('https://task-euo4.onrender.com/auth/login', {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                props.setToken(response.data.token);
                props.setIsLoggedIn(true)
                navigate('/');
                localStorage.setItem('token', JSON.stringify(response.data.token))
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }
    return (
        <div>
            <div className="login">
                <div className="login__form">
                    <input onInput={(e) => {setEmail(e.target.value)}} type="email" placeholder={'Enter Email...'}/>
                    <input onInput={(e) => {setPassword(e.target.value)}} type="password" placeholder={'Enter Password...'}/>
                    <button onClick={login}>Log In</button>
                    <div className="register">
                        <p>Doesn't have an account?</p>
                        <span onClick={() => {navigate('/registration')}}>Register</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
