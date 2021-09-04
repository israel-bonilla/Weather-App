import { useState } from "react";
import { useSelector } from "react-redux";
import { selectGraphMode } from "../features/appSlice";
import PercipitationGraph from "./PercipitationGraph";
import TemperatureGraph from "./TemperatureGraph";
import WindGraph from "./WindGraph";

const Graph = () => {
    const graphMode = useSelector(selectGraphMode);

    return (
        <div className="w-full bg-gray-800 mt-10 rounded-2xl p-5 shadow-xl">
            {graphMode === "temperature" ? <TemperatureGraph />
            : graphMode === "precipitation" ? <PercipitationGraph />
            : <WindGraph />}
        </div>
    )
}

export default Graph
