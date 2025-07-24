import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: process.env.LAMBDA_TASK_ROOT
    ? winston.format.json()
    : winston.format.json({ space: 2 }),
  transports: [new winston.transports.Console()],
});
