import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Weather() {
    let [country, setCountry] = useState('');
    let [weatherData, setWeatherData] = useState(null);
    let [loader, setLoader] = useState(false);

    function GetCountry(country) {
        setLoader(true);
        axios
            .get(`https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${country}&aqi=no`)
            .then((res) => {
                setWeatherData(res.data);
            })
            .then(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        GetCountry('Baku');
    }, []);

    function handleGetCountry(e) {
        e.preventDefault();
        if (country.trim()) {
            GetCountry(country);
            setCountry('');
        }
    }

    return (
        <div>
            <div className="form">
                <form onSubmit={(e) => handleGetCountry(e)}>
                    <input type="text" placeholder="ForeCast..." required value={country} onChange={(e) => setCountry(e.target.value)} />
                    <button type="submit">Get ForeCast</button>
                </form>
                {loader ? (
                    <div class="loader"></div>
                ) : weatherData ? (
                    <div className="content">
                        <h2>{weatherData.location.name}</h2>
                        <img src={weatherData.current.condition.icon} alt="" />
                        <span>Condition: {weatherData.current.condition.text}</span>
                        <span>Cloud: {weatherData.current.cloud}</span>
                        <span>Local Time: {weatherData.location.localtime}</span>
                        <span>Country: {weatherData.location.country}</span>
                    </div>
                ) : (
                    <p>Belə ölkə yoxdur!</p>
                )}
            </div>
        </div>
    );
}

export default Weather;
