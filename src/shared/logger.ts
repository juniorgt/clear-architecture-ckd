// src/shared/logger.ts

import { createLogger, format, transports } from "winston";

const logger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp(),
		format.errors({ stack: true }),
		format.splat(),
		format.json(),
	),
	defaultMeta: { service: "order-service" },
	transports: [
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		}),
		// Puedes agregar más transports como archivos o servicios de logging
	],
});

export default logger;
