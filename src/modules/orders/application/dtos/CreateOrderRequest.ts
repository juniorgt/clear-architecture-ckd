// src/modules/orders/application/dtos/CreateOrderRequest.ts

export interface CreateOrderRequest {
	userId: string;
	items: string[];
	total: number;
}
