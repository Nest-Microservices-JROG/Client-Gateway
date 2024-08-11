import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
   PORT: number;
   PRODUCT_SERVICE_NAME: string;
   PRODUCT_SERVICE_HOST: string;
   PRODUCT_SERVICE_PORT: number;
   ORDER_SERVICE_NAME: string;
   ORDER_SERVICE_HOST: string;
   ORDER_SERVICE_PORT: number;
   NATS_SERVICE_NAME: string;
   NATS_SERVERS: [string];
}

const envVarsSchema = joi.object({
   PORT: joi.number().required(),
   PRODUCT_SERVICE_NAME: joi.string().required(),
   PRODUCT_SERVICE_HOST: joi.string().required(),
   PRODUCT_SERVICE_PORT: joi.number().required(),
   ORDER_SERVICE_NAME: joi.string().required(),
   ORDER_SERVICE_HOST: joi.string().required(),
   ORDER_SERVICE_PORT: joi.number().required(),
   NATS_SERVICE_NAME: joi.string().required(),
   NATS_SERVERS: joi.array().items(joi.string()).required()
}).unknown(true);


const { error, value } = envVarsSchema.validate({
   ...process.env,
   NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {
   throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
   port: envVars.PORT,
   productServiceName: envVars.PRODUCT_SERVICE_NAME,
   productServiceHost: envVars.PRODUCT_SERVICE_HOST,
   productServicePort: envVars.PRODUCT_SERVICE_PORT,
   orderServiceName: envVars.ORDER_SERVICE_NAME,
   orderServiceHost: envVars.ORDER_SERVICE_HOST,
   orderServicePort: envVars.ORDER_SERVICE_PORT,
   natsServiceName: envVars.NATS_SERVICE_NAME,
   natsServers: envVars.NATS_SERVERS
}

