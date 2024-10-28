import { ValidationError } from "../../modules/orders/application/errors/ValidationError";

export function validateUserId(userId: string): void {
	if (!userId) {
		throw new ValidationError("El ID de usuario es requerido");
	}
}

export function validateItems(items: string[]): void {
	if (!items || items.length === 0) {
		throw new ValidationError("Se requiere al menos un artículo");
	}
}

export function validateTotal(total: number): void {
	if (total <= 0) {
		throw new ValidationError("El total debe ser mayor que cero");
	}
}

export function validateCreateOrder(
	userId: string,
	items: string[],
	total: number,
): void {
	validateUserId(userId);
	validateItems(items);
	validateTotal(total);
}
