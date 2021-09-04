import { useSelector } from "react-redux";
import { selectTodaysWeather, selectUnits } from "../features/appSlice";
import { formatHours } from "../lib/formatTime";

const WindGraph = () => {
    const todaysData = useSelector(selectTodaysWeather);
    const units = useSelector(selectUnits);
    const emptyData = ['--', '--', '--', '--', '--', '--', '--', '--'];
    const directions = todaysData?.wind?.dirs?.map(dir => Math.round(dir)) || emptyData;
    const speeds = todaysData?.wind?.speeds?.map(speed => Math.round(speed * (units === "metric" ? 3.6 : 1))) || emptyData;
    
    const hours = todaysData?.hours?.map(hour => formatHours(hour)) || emptyData;

    const windData = {
        directions,
        time: hours,
        speeds,
    };

    const windItems = [];
    for(let i = 0; i < 8; i++) {
        windItems.push({
            direction: windData.directions[i],
            time: windData.time[i],
            speed: windData.speeds[i],
        });
    }

    return (
        <div className="w-full">
            <div className="flex w-full justify-around h-40">
                {windItems.map(({ direction, time, speed }, i) => (
                    <div key={i} className="flex flex-col h-full justify-between">
                        <p className="text-xs text-gray-300">{speed}{" "}{units === "metric" ? "km/h" : "mph"}</p>
                        {direction && <img
                            style={{
                                height: 40,
                                width: 40,
                                transform: `rotate(${direction + 90}deg) scale(${units === "metric" ? speed >= 12 ? 1 : 0.6 : speed >= 8 ? 1 : 0.6})`,
                            }}
                            key={i}
                            src='https://shaunseidman.net/static/back-f273e13d6919e0a2ddb94e6e4b9da499.png'
                            alt=""
                        />}
                        <p className="text-xs font-semibold text-gray-500">{time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WindGraph
