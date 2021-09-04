import { useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import Tabs from './components/Tabs';
import Graph from './components/Graph';
import DayCards from './components/DayCards';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnits, setCurrentWeather, setDailyForecast, setTodaysWeather } from './features/appSlice';
import useGeolocation from './useGeolocation';
import { formatDay } from './lib/formatTime';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const dispatch = useDispatch();
  const location = useGeolocation();
  const units = useSelector(selectUnits);

  useEffect(() => {
    const requestData = async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location ? location?.coords?.lat : 33.44}&lon=${location ? location?.coords?.lon : -94.04}&exclude=minutely&appid=${API_KEY}&units=${units}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setCurrentWeather({
          time: data.current.dt,
          temp: data.current.temp,
          pop: data.hourly[0].pop,
          humidity: data.current.humidity,
          wind: data.current.wind_speed,
          desc: data.current.weather[0].description,
          icon: data.current.weather[0].icon,
        }));

        const temps = [];
        const hours = [];
        const pops = [];
        const wind = {
          dirs: [],
          speeds: [],
        };

        for(let i = 1; i <= 22; i += 3) {
          temps.push(data.hourly[i].temp);
          hours.push(data.hourly[i].dt);
          pops.push(data.hourly[i].pop);
          wind.dirs.push(data.hourly[i].wind_deg);
          wind.speeds.push(data.hourly[i].wind_speed);
        }

        dispatch(setTodaysWeather({ temps, hours, pops, wind }));

        const dailyTemps = [];

        for(let i = 0; i < 8; i++) {
          dailyTemps.push({
            day: formatDay(data.daily[i].dt).split('').slice(0, 3).join(''),
            hi: Math.round(data.daily[i].temp.max),
            lo: Math.round(data.daily[i].temp.min),
            icon: data.daily[i].weather[0].icon,
          });
        }

        dispatch(setDailyForecast(dailyTemps));
      })
      .catch(err => console.log(err.message));
    }
    requestData();
  }, [location, units]);

  return (
    <div className="flex flex-col items-center bg-gray-900 h-[100vh] w-full">
      <div className="flex flex-col items-center w-3/4 max-w-5xl bg-gray-600 rounded-2xl p-5 mt-10 shadow-xl">
        <Header location={location} />
        <Tabs />
        <Graph />
        <DayCards />
        <div className="flex w-full justify-end text-gray-300 pt-3 pr-3">
          <a href="https://openweathermap.org/" target="_blank" className="underline">openweathermap.org</a>
        </div>
      </div>
    </div>
  );
}

export default App;