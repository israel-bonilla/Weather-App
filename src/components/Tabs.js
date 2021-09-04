import { useDispatch, useSelector } from "react-redux";
import { selectGraphMode, setGraphMode } from "../features/appSlice";

const Tabs = () => {
    const dispatch = useDispatch();
    const graphMode = useSelector(selectGraphMode);

    return (
        <div className="flex self-start mt-8">
            <button
                className={`${graphMode === 'temperature' ? 'bg-yellow-300' : 'bg-gray-400'} py-2 px-3 rounded-full mr-2`}
                onClick={() => dispatch(setGraphMode('temperature'))}
            >Temperature</button>
            <button
                className={`${graphMode === 'precipitation' ? 'bg-blue-500' : 'bg-gray-400'} py-2 px-3 rounded-full mr-2`}
                onClick={() => dispatch(setGraphMode('precipitation'))}
            >Precipitation</button>
            <button
                className={`${graphMode === 'wind' ? 'bg-purple-500' : 'bg-gray-400'} py-2 px-3 rounded-full mr-2`}
                onClick={() => dispatch(setGraphMode('wind'))}
            >Wind</button>
        </div>
    )
}

export default Tabs
