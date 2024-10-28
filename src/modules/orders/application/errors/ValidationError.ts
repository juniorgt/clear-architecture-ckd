// src/modules/orders/application/errors/ValidationError.ts

export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}