import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWeather, selectUnits, setUnits } from "../features/appSlice";
import { formatDay, formatHours } from "../lib/formatTime";

const Header = ({ location }) => {
    const { time, temp, pop, humidity, wind, desc, icon } = useSelector(selectCurrentWeather);
    const description = desc ? [desc[0].toUpperCase(), ...desc.slice(1)].join('') : '--';
    const dispatch = useDispatch();
    const units = useSelector(selectUnits);

    const changeToImperial = () => {
        if(units === "imperial") return;
        dispatch(setUnits("imperial"));
    }

    const changeToMetric = () => {
        if(units === "metric") return;
        dispatch(setUnits("metric"));
    }

    return (
        <div className="flex w-full justify-between items-center bg-gray-800 rounded-2xl px-5 py-2 text-white shadow-xl">
            {location.loaded ? (location.coords ? (
            <>
                <div className="flex items-center">
                    {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />}
                    <h2 className="text-5xl font-semibold px-1">{temp ? Math.round(temp) : "Loading..."}</h2>
                    <div className="flex self-start px-1 pt-2 text-gray-500">
                        <p onClick={changeToImperial}
                            className={`${units === "imperial" && "text-gray-200"} cursor-pointer`}
                        >°F</p>
                        <p className="px-1">|</p>
                        <p onClick={changeToMetric}
                            className={`${units === "metric" && "text-gray-200"} cursor-pointer`}
                        >°C</p>
                    </div>
                    <div className="pl-2 text-gray-400">
                        <p className="text-xs">Precipitation: {Math.ceil(pop)}%</p>
                        <p className="text-xs">Humidity: {Math.round(humidity)}%</p>
                        <p className="text-xs">Wind: {Math.round(wind * (units === "metric" ? 3.6 : 1))} {units === "metric" ? "km/h" : "mph"}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end leading-5">
                    <h3 className="text-xl font-semibold">{location.name}</h3>
                    <p className="text-gray-300">{formatDay(time)}{' '}{formatHours(time)}</p>
                    <p className="text-gray-300">{description}</p>
                </div>
            </>
            ) : (<p>{location.error.message}.</p>)) : (<p className="pt-[100px]">Location data is not available.</p>)}
        </div>
    )
}

export default Header
