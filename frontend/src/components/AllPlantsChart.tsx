import React from "react";
import { Chart } from "react-charts";

import "./AllPlantsChart.css";

interface Props {
    plants?: {
        readings?: {
            id: number;
            value: number | null | undefined;
            createdAt: string;
        }[];
        id: number;
        title: string;
        createdAt: string;
        updatedAt: string;
    }[]
}

const AllPlantsChart: React.FC<Props> = ({
    plants,
}) => {

    const data = React.useMemo(
        () => plants?.map(plant => ({
            label: plant.title,
            data: plant.readings?.map(reading => {
                const time = new Date(parseInt(reading.createdAt));
                let seconds = 0;
                if (time.getSeconds() >= 45) seconds = 45;
                else if (time.getSeconds() >= 30) seconds = 30;
                else if (time.getSeconds() >= 15) seconds = 15;
                time.setSeconds(seconds);
                time.setMilliseconds(0);
                return {
                    primary: time, 
                    secondary: reading.value,
                };
            })
        })),
        [plants]
    );

    const series = React.useMemo(
        () => ({
            showPoints: false,
        }),
        []
    );
    
    const axes = React.useMemo(
        () => [
            {
                primary: true,
                type: "time",
                position: "bottom",
                innerPadding: 50,
                outerPadding: 50,
            },
            {
                type: "linear",
                position: "left",
                hardMax: 100,
                hardMin: 0,
            },
        ],
        []
    );

    console.log("data", data);

    // HACK: Resize container to "fix" react-charts bug where axes dont render initially
    // https://github.com/tannerlinsley/react-charts/issues/134
    const ref = React.useRef(null);
    React.useEffect(() => {
        setTimeout(() => {
            if (ref.current !== null) {
                // @ts-ignore: Object is possibly 'null'.
                ref.current.style.width = "99%";
            }
        }, 500);

        setTimeout(() => {

            if (ref.current !== null) {
                // @ts-ignore: Object is possibly 'null'.
                ref.current.style.width = "100%";
            }
        }, 550);
    }, [ref]);

    return (
        <div className="all-plants-chart card-2" ref={ref}>
            <div className="chart-wrapper">
                <Chart
                    data={data ?? []}
                    series={series}
                    axes={axes}
                    tooltip
                    dark
                />
            </div>
        </div>
    );
}

export default AllPlantsChart;