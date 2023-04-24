import React, {useState} from 'react';
import axios from "axios";
import '../styles/Registration.css'
import {useNavigate} from "react-router-dom";
const Registration = (props) => {
    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passVerify, setPassVerify] = useState('')

    const handleCreate = () => {
        if(fullName !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password === passVerify){
            axios
                .post('https://task-euo4.onrender.com/auth/register', {
                    fullName: fullName,
                    email: email,
                    password: password,
                    tasks: [{"id": "create-task", "task": "create task", "priority": "high", "done": false}]
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
    }
    return (
        <div>
            <div className="registration">
                <div className="registration__form">
                    <input
                        type="text"
                        placeholder={'Enter your name...'}
                        onInput={(e) => {setFullName(e.target.value)}}
                    />
                    <input
                        type="email"
                        placeholder={'Enter email...'}
                        onInput={(e) => {setEmail(e.target.value)}}
                    />
                    <input
                        type="password"
                        placeholder={'Enter password...'}
                        onInput={(e) => {setPassword(e.target.value)}}
                    />
                    <input
                        type="password"
                        placeholder={'Verify password...'}
                        onInput={(e) => {setPassVerify(e.target.value)}}
                    />
                    <button onClick={handleCreate}>Create account</button>
                    <div className="authorization">
                        <p>Already have an account?</p>
                        <span onClick={() => {navigate('/login')}}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;