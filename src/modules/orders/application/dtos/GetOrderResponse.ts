// src/modules/orders/application/dtos/GetOrderResponse.ts

export interface GetOrderResponse {
	id: string;
	userId: string;
	items: string[];
	total: number;
	createdAt: string;
}
