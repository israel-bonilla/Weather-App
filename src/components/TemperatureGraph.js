import { Line } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import { useSelector } from "react-redux";
import { selectTodaysWeather } from "../features/appSlice";
import { formatHours } from '../lib/formatTime';

const chartOptions = {
    elements: {
        point: {
            pointStyle: 'line',
        },
        line: {
            tension: 0.5,
        },
    },
    plugins: {
        tooltip: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        datalabels: {
            display: true,
            color: '#000'
        },
    },
    maintainAspectRatio: false,
    scales: {
        y: {
            // beginAtZero: true,
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                display: false,
            },
            // max: 120,
        },
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
        },
    },
};

const TemperatureGraph = () => {
    const todaysData = useSelector(selectTodaysWeather);
    const emptyData = ['--', '--', '--', '--', '--', '--', '--', '--'];
    const temperatureData = todaysData?.temps?.map(temp => Math.round(temp)) || emptyData;

    const hours = todaysData?.hours?.map(hour => formatHours(hour)) || emptyData;

    const chartData = {
        labels: hours,
        datasets: [{
            label: 'temperature in degrees Fahrenheit',
            data: temperatureData,
            fill: true,
            backgroundColor: '#887630',
            borderColor: 'orange',
            borderWidth: 3,
        }]
    };

    if(temperatureData !== emptyData) {
        chartOptions.scales.y.min = Math.min(...temperatureData) - 15;
        chartOptions.scales.y.max = Math.max(...temperatureData) + 15;
    }

    return (
        <div>
            <div className="flex justify-between mt-4">
                {temperatureData.map((item, i) => (
                        <p key={i} className="text-xs text-gray-300">{item}</p>
                ))}
            </div>
            <div>
                <Line
                    data={chartData}
                    options={chartOptions}
                    height={150}
                    width={600}
                />
            </div>
        </div>
    )
}

export default TemperatureGraph
