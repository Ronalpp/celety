import { Context } from '../types';
import { Config } from '../types';

export function setupCors(ctx: Context, config: Config) {
  if (config.cors) {
    const { res } = ctx;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

export function handleCorsPreFlight(ctx: Context): boolean {
  if (ctx.req.method === 'OPTIONS') {
    ctx.res.writeHead(200);
    ctx.res.end();
    return true;
  }
  return false;
}