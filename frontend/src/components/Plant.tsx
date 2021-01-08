import React from "react";
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

    const latestReadings = readings?.length
        ? readings
            .sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
            .slice(0, 5)
            .map(r => r.value)
            .join(", ")
        : "N/A";

    return (
        <div className="plant card-2">
            <div className="logo"></div>
            <div className="info">
                <h1>{title}</h1>
                <p>Latest readings: {latestReadings}</p>
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