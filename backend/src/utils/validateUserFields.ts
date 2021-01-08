import { FieldError } from "src/resolvers/user";

export function validateNewUsername(username: string): FieldError[] {
	if (username?.length <= 2) {
		return  [
			{ field: "username", message: "Username length must be greater than 2." }
		]
	}

	return []
}

export function validateNewPassword(password: string, fieldName?: string): FieldError[] {
	if (password?.length <= 6) {
		return [
			{ field: fieldName ?? "password", message: "Password length must be greater than 6." }
		]
	}

	return [];
}