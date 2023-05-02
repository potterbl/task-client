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
    const [avatar, setAvatar] = useState(null) // добавляем состояние для фото

    const handleCreate = () => {
        if(fullName !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password === passVerify){
            const formData = new FormData(); // создаем экземпляр FormData
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('tasks', JSON.stringify({"id": "create-task", "task": "create task", "priority": "high", "done": false}));
            formData.append('avatar', avatar); // добавляем фото в FormData

            axios
                .post('https://task-euo4.onrender.com/auth/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // указываем тип содержимого как multipart/form-data
                    }
                })
                .then((response) => {
                    props.setToken(response.data.token);
                    props.setIsLoggedIn(true)
                    navigate('/');
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleFileSelect = (event) => {
        setAvatar(event.target.files[0]);
    };

    return (
        <div>
            <div className="registration">
                <div className="registration__form">
                    <input
                        value={fullName}
                        type="text"
                        placeholder={'Enter your name...'}
                        onInput={(e) => {setFullName(e.target.value)}}
                    />
                    <input
                        value={email}
                        type="email"
                        placeholder={'Enter email...'}
                        onInput={(e) => {setEmail(e.target.value)}}
                    />
                    <input
                        value={password}
                        type="password"
                        placeholder={'Enter password...'}
                        onInput={(e) => {setPassword(e.target.value)}}
                    />
                    <input
                        value={passVerify}
                        type="password"
                        placeholder={'Verify password...'}
                        onInput={(e) => {setPassVerify(e.target.value)}}
                    />
                    <input type="file" onChange={handleFileSelect} />
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
