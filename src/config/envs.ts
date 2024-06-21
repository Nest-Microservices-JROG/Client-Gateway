import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
   PORT: number;
   PRODUCT_SERVICE_NAME: string;
   PRODUCT_SERVICE_HOST: string;
   PRODUCT_SERVICE_PORT: number;
}

const envVarsSchema = joi.object({
   PORT: joi.number().required(),
   PRODUCT_SERVICE_NAME: joi.string().required(),
   PRODUCT_SERVICE_HOST: joi.string().required(),
   PRODUCT_SERVICE_PORT: joi.number().required(),
}).unknown(true);


const { error, value } = envVarsSchema.validate(process.env);

if (error) {
   throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
   port: envVars.PORT,
   productServiceName: envVars.PRODUCT_SERVICE_NAME,
   productServiceHost: envVars.PRODUCT_SERVICE_HOST,
   productServicePort: envVars.PRODUCT_SERVICE_PORT,
}

