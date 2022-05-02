import { useSelector } from "react-redux";
import { selectDailyForecast } from "../features/appSlice";

const DayCards = () => {
    const dailyData = useSelector(selectDailyForecast);

    return (
        <div className="w-full p-5 bg-gray-800 rounded-2xl mt-10 shadow-xl">
            <div className="flex w-full justify-between">
                {dailyData.map(({ day, hi, lo, icon }, i) => (
                    <div key={i} className="flex flex-col items-center text-white">
                        <p>{day}</p>
                        {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />}
                        <div className="flex w-full justify-evenly">
                            <p className="text-sm text-gray-300">{hi}°</p>
                            <p className="text-sm font-semibold">{lo}°</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DayCards
