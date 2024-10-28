// src/modules/orders/application/use-cases/CreateOrderUseCase.ts

import { v4 as uuidv4 } from "uuid";
import { eventBus } from "../../../../shared/event";
import logger from "../../../../shared/logger";
import { validateCreateOrder } from "../../../../shared/validators/OrderValidator";
import { Order } from "../../domain/entities/Order";
import type { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import type { CreateOrderDTO } from "../dtos/CreateOrderDTO.ts";

export class CreateOrderUseCase {
	constructor(private orderRepository: IOrderRepository) {}

	/**
	 * Ejecuta el caso de uso para crear una orden.
	 * @param orderData Datos necesarios para crear la orden.
	 * @returns La orden creada.
	 */
	async execute(orderData: CreateOrderDTO): Promise<Order> {
		const { userId, items, total } = orderData;
		logger.info("Ejecutando CreateOrderUseCase", { userId, items, total });

		// Validar reglas de negocio en el caso de uso
		validateCreateOrder(userId, items, total);

		// Crear la entidad Order con un ID único
		const orderId = uuidv4();
		const order = new Order(orderId, userId, items, total);

		try {
			// Persistir la orden en el repositorio
			await this.orderRepository.save(order);
			logger.info("Orden guardada exitosamente", { orderId });

			// Emitir un evento de dominio si es necesario
			eventBus.emit("OrderCreatedEvent", { orderId, userId });

			return order;
		} catch (error) {
			logger.error("Error al guardar la orden", { error });
			throw new Error("No se pudo crear la orden");
		}
	}
}
