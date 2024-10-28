// src/modules/orders/infrastructure/persistence/OrderRepositoryDynamo.ts

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
} from "@aws-sdk/lib-dynamodb";
import config from "../../../../shared/config";
import logger from "../../../../shared/logger";
import { Order } from "../../domain/entities/Order";
import type { IOrderRepository } from "../../domain/repositories/IOrderRepository";

export class OrderRepositoryDynamo implements IOrderRepository {
	private dynamoDb: DynamoDBDocumentClient;
	private tableName: string;

	constructor(dynamoDbClient?: DynamoDBDocumentClient) {
		const client = dynamoDbClient || new DynamoDBClient({});
		this.dynamoDb = DynamoDBDocumentClient.from(client);
		this.tableName = config.dynamoDb.ordersTableName;
	}

	/**
	 * Guarda una orden en DynamoDB.
	 * @param order Entidad de dominio Order.
	 */
	async save(order: Order): Promise<void> {
		logger.info("Saving order to DynamoDB", { orderId: order.id });

		const putCommand = new PutCommand({
			TableName: this.tableName,
			Item: {
				id: order.id,
				userId: order.userId,
				items: order.items,
				total: order.total,
				createdAt: order.createdAt.toISOString(),
			},
		});

		await this.dynamoDb.send(putCommand);

		logger.info("Order saved in DynamoDB", { orderId: order.id });
	}

	/**
	 * Recupera una orden por su ID desde DynamoDB.
	 * @param id ID de la orden.
	 * @returns Orden encontrada o null.
	 */
	async getById(id: string): Promise<Order | null> {
		logger.info("Fetching order from DynamoDB", { orderId: id });

		const getCommand = new GetCommand({
			TableName: this.tableName,
			Key: { id },
		});

		const result = await this.dynamoDb.send(getCommand);

		if (result.Item) {
			const order = new Order(
				result.Item.id,
				result.Item.userId,
				result.Item.items,
				result.Item.total,
				new Date(result.Item.createdAt),
			);
			logger.info("Order retrieved from DynamoDB", { orderId: id });
			return order;
		}

		logger.warn("Order not found in DynamoDB", { orderId: id });
		return null;
	}
}
