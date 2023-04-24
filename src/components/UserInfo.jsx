import React from 'react';
import Container from "./Container";
import '../styles/UserInfo.css'
const UserInfo = (props) => {
    const userName = '{ ' + props.fullName + ' }'
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