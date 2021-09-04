import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { useSelector } from 'react-redux';
import { selectTodaysWeather } from '../features/appSlice';
import { formatHours } from '../lib/formatTime';

const chartOptions = {
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
            beginAtZero: true,
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                display: false,
            },
            max: 100,
        },
        x: {
            grid: {
                display: false,
                drawBorder: true,
                borderWidth: 3,
            },
        },
    },
};

const PercipitationGraph = () => {
    const todaysData = useSelector(selectTodaysWeather);
    const emptyData = ['--', '--', '--', '--', '--', '--', '--', '--'];
    const popData = todaysData?.pops?.map(pop => Math.ceil(pop)) || emptyData;

    const hours = todaysData?.hours?.map(hour => formatHours(hour)) || emptyData;

    const chartData = {
        labels: hours,
        datasets: [{
            label: '% chance of percipitation',
            data: popData,
            backgroundColor: '#336ea5',
            borderColor: 'lightblue',
            borderWidth: {
                top: 3,
            },
            barPercentage: 1,
            categoryPercentage: 1,
        }]
    };

    return (
        <div>
            <div className="flex justify-around text-xs mt-4">
                {popData.map((item, i) => (
                    <p key={i} className="text-xs text-gray-300">{item}%</p>
                ))}
            </div>
            <div>
                <Bar
                    data={chartData}
                    options={chartOptions}
                    height={160}
                    width={600}
                />
            </div>
        </div>
    )
}

export default PercipitationGraph
