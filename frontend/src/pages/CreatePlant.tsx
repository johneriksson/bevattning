import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useCreatePlantMutation } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";

export const CreatePlant: React.FC = () => {
	useIsAuth();

	const history = useHistory();
	const [title, setTitle] = React.useState("");
	const [, createPlant] = useCreatePlantMutation();

	const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = async (e) => {
		e.preventDefault();

		const { error } = await createPlant({ input: { title }});
		if (!error) {
			history.push("/");
		}
	};

	return (
		<div className="form-page">
			<h1>Create plant</h1>
			<form onSubmit={onSubmit}>
				<Input
					name="title"
					type="text"
					label="Title"
					value={title}
					onChange={e => setTitle(e.target.value)}
					required
				/>

				<Button
					type="submit"
					title="Submit"
				/>
			</form>
		</div>
	);
}
