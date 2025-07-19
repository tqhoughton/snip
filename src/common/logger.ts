import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json({ ...!process.env.LAMBDA_TASK_ROOT && { space: 2 }}),
  transports: [new winston.transports.Console()],
});
