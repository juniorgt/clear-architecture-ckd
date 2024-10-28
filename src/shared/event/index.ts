// src/shared/event/index.ts

import { OrderCreatedListener } from "../../modules/orders/infrastructure/listeners/OrderCreatedListener";
import { EmailServiceSES } from "../../modules/orders/infrastructure/services/EmailServiceSES";
import eventBus from "./EventBus"; // Asegúrate de importar eventBus

const emailService = new EmailServiceSES();
new OrderCreatedListener(emailService); // Instanciamos el listener

export { eventBus };
