import { parse } from "yaml";
import { readFileSync } from "fs";
import { Config } from "./types";

const defaultConfig: Config = {
  port: 3000,
  routerMode: false,
  rateLimitRequests: 100,
  rateLimitWindow: 60000,
  cors: true,
  corsOrigin: ["*"],
};

export function loadConfig(overrides?: Partial<Config>): Config {
  let fileConfig: Partial<Config> = {};

  try {
    const configFile = readFileSync("celety.yaml", "utf8");
    fileConfig = parse(configFile);
  } catch (err) {
    // Config file is optional
  }

  return {
    ...defaultConfig,
    ...fileConfig,
    ...overrides,
  };
}
