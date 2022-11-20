import React from "react";
// import AllPlantsChart from "../components/AllPlantsChart";
import Plant from "../components/Plant";
import { usePlantsQuery } from "../generated/graphql";

import "./Plants.css";

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


	

	return (
		<div className="plants-wrapper">
			{/* <AllPlantsChart
				plants={plants}
			/> */}
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
