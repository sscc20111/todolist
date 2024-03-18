import React, { useEffect, useState } from 'react';

const API_KEY = "8e9220877c3c2baec33ccbf605141d1b";
const COORDS = "coords";

const Weather = () => {
    const [todayTemp, todayTempset] = useState('');
    const [place, placeset] = useState('');
    const [icon, iconset] = useState('10n');
    const [description, descriptionset] = useState('');

    const askForCoords = () => {
        navigator.geolocation.getCurrentPosition(
        handleGeoSuccess,
        handleGeoError
        );
    };

    const saveCoords = (coordsObj) => {
        localStorage.setItem(COORDS, JSON.stringify(coordsObj));
        showWeather();
    };

    const showWeather = () => {
        const loadedCoords = localStorage.getItem(COORDS);
        const parsedCoords = JSON.parse(loadedCoords);

        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    };

    const getWeather = (lat, long) => {
        fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        )
        .then((response) => response.json())
        .then((json) => {
            todayTempset(json.main.temp);
            placeset(json.name);
            iconset(json.weather[0].icon);
            descriptionset(json.weather[0].description);

        });
    };

    const handleGeoSuccess = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
        latitude,
        longitude,
        };
        saveCoords(coordsObj);
    };

    const handleGeoError = () => {
        console.log("can't access geo location");
    };

    useEffect(() => {
        askForCoords();
    }, []);

    return (
        <div className='weather p-3'>
            <div md={12}>
                <h4>{place}</h4>
            </div>
            <div md={12} className='mt-2'>
                <p className='temperature'>{todayTemp}℃</p>
            </div>
            <div className='ms-auto' style={{display:'flex'}}>
                <p className='sp' style={{marginTop:'auto', marginLeft:'auto'}}>{description}</p>
                <img src={require(`../img/${icon}.png`)}></img>
            </div>
        </div>
    );
};

export default Weather;
