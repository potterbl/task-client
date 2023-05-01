import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/Widgets.css'
import Container from "./Container";

import weatherSun from '../images/weatherSun.png'
import weatherCloud from '../images/weatherCloudly.png'
import weatherRain from '../images/weatherRain.png'
import weatherThunderstorm from '../images/weatherThunderstorm.png'
import weatherSnow from '../images/weatherSnow.png'
const Widgets = () => {
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [city, setCity] = useState('');
    const [time, setTime] = useState(new Date());
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [day, setDay] = useState(new Date().getDay());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date())
            setDay(new Date().getDay())
        }, 1000);

        const successCallback = async (position) => {
            const {latitude, longitude} = position.coords;
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c10561076069d6292ed48934a94279ce`);
                const data = response.data;
                setWeather(data.weather[0].main);
                const tempCelsius = data.main.temp - 273.15;
                setTemp(tempCelsius.toFixed(2));
                setCity(data.name);
            } catch (error) {
                console.log(error);
            }
        }

        const errorCallback = (error) => {
            console.log(error);
        }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

        return () => clearInterval(intervalID);
    }, [setWeather, setTemp, setCity, setTime, setDay]);

    return (
        <div>
            <Container>
                <div className="widgets">
                    <div className="widget">
                        {/*<div className="total__widget">*/}
                        {/*    <div className="score__line">*/}
                        {/*        <div className="score">*/}
                        {/*        </div>*/}
                        {/*        <p>Year</p>*/}
                        {/*    </div>*/}
                        {/*    <div className="score__line">*/}
                        {/*        <div className="score">*/}
                        {/*        </div>*/}
                        {/*        <p>Week</p>*/}
                        {/*    </div>*/}
                        {/*    <div className="score__line">*/}
                        {/*        <div className="score">*/}
                        {/*        </div>*/}
                        {/*        <p>Day</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="widget" id={'widget__weather'}>
                        <div className="weather">
                            <div className="city">
                                <h2>{city.toUpperCase()}</h2>
                                <p>WEATHER</p>
                            </div>
                            {weather === 'Clear' ? (
                                    <img src={weatherSun} alt=""/>
                                ) : weather === 'Rain' ? (
                                    <img src={weatherRain} alt=""/>
                                ) : weather === 'Clouds' ? (
                                    <img src={weatherCloud} alt=""/>
                                ) : weather === 'Snow' ? (
                                    <img src={weatherSnow} alt=""/>
                                ) : weather === 'Thunderstorm' ? (
                                    <img src={weatherThunderstorm} alt=""/>
                                ) : <img src={weatherCloud} alt=""/>
                            }
                            <div className="temp">
                                <h3>{temp} C</h3>
                                <p>{weather}</p>
                            </div>
                        </div>
                    </div>
                    <div className="widget">
                        <div className="time">
                            <h2>{time.toLocaleTimeString()}</h2>
                            <p>{daysOfWeek[day]}</p>
                        </div>
                    </div>
                </div>
                <hr/>
            </Container>
        </div>
    );
};

export default Widgets;