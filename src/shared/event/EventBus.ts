// src/shared/event/EventBus.ts

// biome-ignore lint/suspicious/noExplicitAny: For Example
type EventHandler = (event: any) => void;

class EventBus {
	private handlers: { [eventType: string]: EventHandler[] } = {};

	/**
	 * Registra un handler para un tipo de evento específico.
	 * @param eventType Tipo de evento.
	 * @param handler Función que maneja el evento.
	 */
	on(eventType: string, handler: EventHandler) {
		if (!this.handlers[eventType]) {
			this.handlers[eventType] = [];
		}
		this.handlers[eventType].push(handler);
	}

	/**
	 * Emite un evento, llamando a todos los handlers registrados.
	 * @param eventType Tipo de evento.
	 * @param event Datos del evento.
	 */

	// biome-ignore lint/suspicious/noExplicitAny: For example
	emit(eventType: string, event: any) {
		const eventHandlers = this.handlers[eventType];
		if (eventHandlers) {
			for (const handler of eventHandlers) {
				handler(event);
			}
		}
	}
}

const eventBus = new EventBus();
export default eventBus;
