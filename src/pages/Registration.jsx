import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../styles/Registration.css'
import {useNavigate} from "react-router-dom";
import noPic from '../images/noPic.jpg';

const Registration = (props) => {
    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passVerify, setPassVerify] = useState('')
    const [avatar, setAvatar] = useState(null);


    const [passDirty, setPassDirty] = useState('')
    // const [emailDirty, setEmailDirty] = useState('')

    const handleCreate = () => {
        if (fullName !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password === passVerify) {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('password', password);

            // Если пользователь загрузил аватар, добавляем его в formData
            if (avatar) {
                formData.append('avatar', avatar);
            } else {
                // Если пользователь не загрузил аватар, используем noPic.jpg из локального хранилища
                fetch(noPic)
                    .then(response => response.blob())
                    .then(blob => {
                        formData.append('avatar', blob, 'noPic.jpg');
                        // Отправляем данные на сервер
                        sendFormData(formData);
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке файла noPic.jpg: ', error);
                    });
            }

            // Отправляем данные на сервер
            sendFormData(formData);
        }
    }

    const sendFormData = (formData) => {
        axios
            .post('https://task-euo4.onrender.com/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                props.setToken(response.data.token);
                props.setIsLoggedIn(true);
                axios
                    .post(`https://task-euo4.onrender.com/task/create/${response.data.token}`, {
                        task: "create task",
                        priority: "high",
                        done: false
                    })
                    .then(res => {})
                    .catch(err => {
                        console.log(err)
                    })
                localStorage.setItem('token', JSON.stringify(response.data.token))
                setTimeout(() => {
                    navigate('/');
                }, 100)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleFileSelect = (event) => {
        setAvatar(event.target.files[0]);
    };

    useEffect(() => {
        if(password.length < 6 && password !== ''){
            setPassDirty('Password length must be more or equal to 6 symbols')
        } else if(password !== passVerify && passVerify !== ''){
            setPassDirty('Password verify must be equal to password')
        } else {
            setPassDirty('')
        }
    }, [password, passVerify])

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
                    <p style={{color: 'red', wordBreak: 'break-word', maxWidth: '300px'}}>{passDirty}</p>
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
                        onInput={(e) => {setPassVerify(e.target.value);}}
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
