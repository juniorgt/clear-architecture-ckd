// src/modules/orders/domain/repositories/IOrderRepository.ts

import type { Order } from "../entities/Order";

export interface IOrderRepository {
	save(order: Order): Promise<void>;
	getById(id: string): Promise<Order | null>;
}
