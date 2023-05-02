import React, {useEffect, useState} from 'react';
import Container from "./Container";
import '../styles/UserInfo.css'
import axios from "axios";
const UserInfo = (props) => {
    const [fullName, setFullName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const token = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios
            .get(`https://task-euo4.onrender.com/auth/${token}`)
            .then((res) => {
                setFullName(res.data.fullName)
                setAvatarUrl(res.data.avatarUrl)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [token, setFullName])
    const userName = '{ ' + fullName + ' }'
    return (
        <div className={'userInfo'}>
            <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>{userName}</h2>
                <div className="avatar" style={{backgroundImage: `url("https://task-euo4.onrender.com/${avatarUrl}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>

                </div>
            </Container>
            <Container>
                <hr/>
            </Container>
        </div>
    );
};

export default UserInfo;