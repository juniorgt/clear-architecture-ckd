// src/modules/orders/adapters/controllers/CreateOrderController.ts

import type { APIGatewayProxyHandler } from "aws-lambda";
import logger from "../../../../shared/logger";
import { validateCreateOrder } from "../../../../shared/validators/OrderValidator";
import type { CreateOrderRequest } from "../../application/dtos/CreateOrderRequest";
import { ValidationError } from "../../application/errors/ValidationError";
import { CreateOrderUseCase } from "../../application/use-cases/CreateOrderUseCase";
import { OrderRepositoryDynamo } from "../../infrastructure/persistence/OrderRepositoryDynamo";
import { createOrderRequestToCreateOrderDTO } from "../mappers/OrderMapper";
import { orderToResponseDTO } from "../presenters/OrderPresenter";

// Inicializar dependencias
const orderRepository = new OrderRepositoryDynamo();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);

/**
 * Handler Lambda para crear una orden.
 */
export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		logger.info("Received CreateOrder request", { event });

		// Adaptar la solicitud HTTP al DTO de solicitud
		const request: CreateOrderRequest = JSON.parse(event.body || "{}");

		// Validar la solicitud en el controlador (validaciones básicas)
		validateCreateOrder(request.userId, request.items, request.total);

		// Mapear el DTO de solicitud a un DTO de creación de orden
		const orderDTO = createOrderRequestToCreateOrderDTO(request);

		// Ejecutar el caso de uso
		const createdOrder = await createOrderUseCase.execute(orderDTO);

		// Transformar la entidad de dominio a DTO de respuesta
		const response = orderToResponseDTO(createdOrder);

		logger.info("Order created successfully", { orderId: createdOrder.id });

		return {
			statusCode: 201,
			body: JSON.stringify(response),
		};
	} catch (error) {
		logger.error("Error creating order", { error });
		const statusCode = error instanceof ValidationError ? 400 : 500;
		const message =
			error instanceof Error ? error.message : "Internal Server Error";

		return {
			statusCode,
			body: JSON.stringify({ error: message }),
		};
	}
};
