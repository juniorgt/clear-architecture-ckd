// src/modules/orders/infrastructure/services/EmailServiceSES.ts

import logger from "../../../../shared/logger";
import type { IEmailService } from "../../../../shared/services/IEmailService";

export class EmailServiceSES implements IEmailService {
	async sendEmail(to: string, subject: string, body: string): Promise<void> {
		// Simulación del envío de email
		logger.info("Enviando correo", { to, subject, body });
		// Aquí integrarías con AWS SES o cualquier otro servicio de email
	}
}
