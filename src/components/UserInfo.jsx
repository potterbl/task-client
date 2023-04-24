import React, {useEffect, useState} from 'react';
import Container from "./Container";
import '../styles/UserInfo.css'
import axios from "axios";
const UserInfo = (props) => {
    const [fullName, setFullName] = useState('')
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios
            .post(`https://task-euo4.onrender.com/auth/${token}`)
            .then((res) => {
                setFullName(res.data.fullName)
            })
    }, [token, setFullName])
    const userName = '{ ' + fullName + ' }'
    const userAvatar = 'https://th.bing.com/th/id/OIP.vBovwYsKrGLBskjH1UKNiwAAAA?pid=ImgDet&rs=1'
    return (
        <div className={'userInfo'}>
            <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>{userName}</h2>
                <div className="avatar" style={{backgroundImage: `url(${userAvatar})`}}>

                </div>
            </Container>
            <Container>
                <hr/>
            </Container>
        </div>
    );
};

export default UserInfo;