import pino from "pino";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

const logger = pino(
  isProd
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
            singleLine: false,
          },
        },
      }
);

export default logger;