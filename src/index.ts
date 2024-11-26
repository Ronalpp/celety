import { Config } from "./types";
import { createServer } from "./server";

export async function celety(config: Config) {
  return createServer(config);
}

export * from "./types";
