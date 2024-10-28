// src/modules/orders/adapters/presenters/OrderPresenter.ts

import type { CreateOrderResponse } from "../../application/dtos/CreateOrderResponse";
import type { Order } from "../../domain/entities/Order";

/**
 * Transforma una entidad Order en un DTO de respuesta.
 * @param order Entidad de dominio Order.
 * @returns DTO de respuesta CreateOrderResponse.
 */
export function orderToResponseDTO(order: Order): CreateOrderResponse {
	return {
		id: order.id,
		userId: order.userId,
		items: order.items,
		total: order.total,
		createdAt: order.createdAt.toISOString(), // Formateo específico de presentación
	};
}
