import React from "react";
// import { Chart } from "react-charts";
import { Reading, useSetPlantAutoStatusMutation, useWaterPlantMutation } from "../generated/graphql";
import Button from "./Button";

import "./Plant.css";

interface Props {
    id: number,
    title: string,
    readings?: Pick<Reading, "id" | "createdAt" | "value">[] | null,
    waterAutomatically?: boolean,
}

const Plant: React.FC<Props> = ({
    id,
    title,
    readings,
    waterAutomatically,
}) => {

    const [,waterPlant] = useWaterPlantMutation();
    const [,setAutoStatus] = useSetPlantAutoStatusMutation();

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

    // const latestReadings = readings?.length
    //     ? [...readings]
    //         .sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
    //         .slice(0, 5)
    //         // .map(r => r.value)
    //         // .join(", ")
    //     : null;//"N/A";

    const latestReading = readings?.[0] ?? { value: null };
    const average = Math.round((readings?.reduce((total, reading) => total + (reading?.value ?? 0), 0) ?? 0) / Math.max(readings?.length ?? 0, 1));
    const needsWater = average < 30;

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
            <div className="info">
                <h1>{title}</h1>
                <div className={`readings ${needsWater ? "needs-water" : ""}`}>
                    <p>{latestReading.value ?? "N/A"}</p>
                    <p><span>Avg: {average ?? "N/A"}</span></p>
                </div>
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
                <Button
                    title={waterAutomatically ? "AUTO ON" : "AUTO OFF"}
                    color={waterAutomatically ? "green" : "red"}
                    onClick={async () => {
                        await setAutoStatus({ id, auto: !waterAutomatically });
                    }}
                />
            </div>
        </div>
    );
}

export default Plant;