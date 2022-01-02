import React from "react";
// import { Chart } from "react-charts";
import { Reading, useWaterPlantMutation } from "../generated/graphql";
import Button from "./Button";

import "./Plant.css";

interface Props {
    id: number,
    title: string,
    readings?: Pick<Reading, "id" | "createdAt" | "value">[] | null
}

const Plant: React.FC<Props> = ({
    id,
    title,
    readings,
}) => {

    const [,waterPlant] = useWaterPlantMutation();

    // const series = React.useMemo(
    //     () => ({
    //         showPoints: false,
    //     }),
    //     []
    // );
    
    // const axes = React.useMemo(
    //     () => [
    //         {
    //             primary: true,
    //             type: "time",
    //             position: "bottom",
    //         },
    //         {
    //             type: "linear",
    //             position: "left"
    //         },
    //     ],
    //     []
    // );

    const latestReadings = readings?.length
        ? readings
            .sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
            .slice(0, 5)
            // .map(r => r.value)
            // .join(", ")
        : null;//"N/A";

    const latestReading = latestReadings?.[0] ?? { value: null };


    console.log("latestReadings", latestReadings);

    // const data = React.useMemo(
    //     () => [
    //         {
    //             label: "Moisture",
    //             data: latestReadings?.map(reading => {
    //                 return { primary: reading.createdAt, secondary: reading.value };
    //             }),
    //         }
    //     ],
    //     [latestReadings]
    // );

    return (
        <div className="plant card-2">
            <div className="logo"></div>
            <div className="info">
                <h1>{title}</h1>
                <p>{latestReading.value ?? "N/A"}</p>
                {/* <Chart
                    data={data}
                    series={series}
                    axes={axes}
                    tooltip
                    dark
                /> */}
                
            </div>

            <div className="controls">
                <Button
                    title="Water once"
                    onClick={async () => {
                        await waterPlant({ id });
                    }}
                />
            </div>
        </div>
    );
}

export default Plant;