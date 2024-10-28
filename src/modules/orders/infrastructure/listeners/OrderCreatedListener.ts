// src/modules/orders/infrastructure/listeners/OrderCreatedListener.ts

import { eventBus } from "../../../../shared/event";
import logger from "../../../../shared/logger";
import type { IEmailService } from "../../../../shared/services/IEmailService";

export class OrderCreatedListener {
	constructor(private emailService: IEmailService) {
		// Registrar el listener al instanciar la clase
		eventBus.on("OrderCreatedEvent", this.handleOrderCreated.bind(this));
	}

	/**
	 * Maneja el evento OrderCreatedEvent.
	 * @param event Datos del evento.
	 */
	async handleOrderCreated(event: { orderId: string; userId: string }) {
		logger.info("Handling OrderCreatedEvent", {
			orderId: event.orderId,
			userId: event.userId,
		});

		// Aquí podrías obtener el email del usuario a partir del userId
		const userEmail = "user@example.com"; // Simulación

		try {
			await this.emailService.sendEmail(
				userEmail,
				"Orden Creada",
				`Tu orden con ID ${event.orderId} ha sido creada exitosamente.`,
			);
			logger.info("Correo de confirmación enviado", { orderId: event.orderId });
		} catch (error) {
			logger.error("Error al enviar el correo de confirmación", {
				error,
				orderId: event.orderId,
			});
		}
	}
}
