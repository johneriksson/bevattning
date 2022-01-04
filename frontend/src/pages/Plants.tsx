import React from "react";
// import AllPlantsChart from "../components/AllPlantsChart";
import Plant from "../components/Plant";
import Switch from "../components/Switch";
import { useLedQuery, usePlantsQuery, useSetLedMutation } from "../generated/graphql";

function Plants() {
	const [{ data: plantsData }] = usePlantsQuery({
		pollInterval: 15 * 1000,
		requestPolicy: "cache-and-network",
	});

	// const plants = React.useMemo(
	// 	() => plantsData?.plants.map(plant => ({
	// 		...plant,
	// 		readings: plant.readings
	// 			?.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
	// 			.slice(0, 10)
	// 			.map(reading => ({
	// 				id: reading.id,
	// 				value: reading.value,
	// 				createdAt: reading.createdAt,
	// 			}))
	// 	})),
	// 	[plantsData]
	// );


	const [{ data: ledStatus }] = useLedQuery();
	const [, setLED] = useSetLedMutation();

	const ledOn = ledStatus?.led?.on;
	const ledLoaded = !!ledStatus;

	return (
		<div>
			{/* <AllPlantsChart
				plants={plants}
			/> */}
			<Switch
				title="LED"
				disabled={!ledLoaded}
				onClick={async () => {
					await setLED({ on: !ledOn });
				}}
				active={ledOn}
			/>
			{!plantsData && <div>Loading plants...</div>}
			{plantsData?.plants.map(p => (
				<Plant
					key={p.id}
					{...p}
				/>
			))}
		</div>
	);
}

export default Plants;
