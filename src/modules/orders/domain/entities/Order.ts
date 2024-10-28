// src/modules/orders/domain/entities/Order.ts

export class Order {
	constructor(
		public id: string,
		public userId: string,
		public items: string[],
		public total: number,
		public createdAt: Date = new Date(),
	) {
		// Validaciones básicas para asegurar la integridad del dominio
		if (!id) throw new Error("El ID es requerido");
		if (!userId) throw new Error("El ID de usuario es requerido");
		if (!items || items.length === 0)
			throw new Error("Se requiere al menos un artículo");
		if (total <= 0) throw new Error("El total debe ser mayor que cero");
	}
}
