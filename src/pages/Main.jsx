import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import PrevHeader from "../components/PrevHeader";
import UserInfo from "../components/UserInfo";
import Widgets from "../components/Widgets";
import MainTasks from "../components/MainTasks";

const Main = (props) => {
    const { setIsLoggedIn, setToken } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [setIsLoggedIn]);

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
    } else {
        navigate('/login');
        return;
    }
    return (
        <div>
            <Header
                isDarkMode={props.isDarkMode}
                setIsDarkMode={props.setIsDarkMode}
                isLoggedIn={props.isLoggedIn}
                setIsloggedIn={props.setIsLoggedIn}
                setUser={props.setUser}
                setToken={props.setToken}
            />
            <PrevHeader/>
            <UserInfo
                fullName={props.fullName}
            />
            <Widgets/>
            <MainTasks
                tasks={props.tasks}
                setUser={props.setUser}
                isDarkMode={props.isDarkMode}
            />
        </div>
    );
};

export default Main;