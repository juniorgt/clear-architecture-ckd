// src/modules/orders/application/dtos/CreateOrderResponse.ts

export interface CreateOrderResponse {
	id: string;
	userId: string;
	items: string[];
	total: number;
	createdAt: string; // Formato ISO
}
