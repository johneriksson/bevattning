import React from "react";
import Plant from "../components/Plant";
import { usePlantsQuery } from "../generated/graphql";

function Plants() {
	const [{ data: plantsData }] = usePlantsQuery({
		pollInterval: 30 * 1000,
		requestPolicy: "cache-and-network",
	});

	return (
		<div>
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
