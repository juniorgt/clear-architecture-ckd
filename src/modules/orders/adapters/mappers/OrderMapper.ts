// src/modules/orders/adapters/mappers/OrderMapper.ts

import type { CreateOrderDTO } from "../../application/dtos/CreateOrderDTO";
import type { CreateOrderRequest } from "../../application/dtos/CreateOrderRequest";
import type { CreateOrderResponse } from "../../application/dtos/CreateOrderResponse";
import type { Order } from "../../domain/entities/Order";

/**
 * Convierte un CreateOrderRequest en un CreateOrderDTO.
 * @param request DTO de solicitud para crear una orden.
 * @returns CreateOrderDTO.
 */
export function createOrderRequestToCreateOrderDTO(
	request: CreateOrderRequest,
): CreateOrderDTO {
	return {
		userId: request.userId,
		items: request.items,
		total: request.total,
	};
}

/**
 * Convierte una entidad Order en un CreateOrderResponse.
 * @param order Entidad de dominio Order.
 * @returns CreateOrderResponse.
 */
export function orderToCreateOrderResponseDTO(
	order: Order,
): CreateOrderResponse {
	return {
		id: order.id,
		userId: order.userId,
		items: order.items,
		total: order.total,
		createdAt: order.createdAt.toISOString(),
	};
}
