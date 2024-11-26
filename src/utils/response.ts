import { Context } from '../types';

export function sendJson(ctx: Context, data: any, status = 200) {
  ctx.res.statusCode = status;
  ctx.res.setHeader('Content-Type', 'application/json');
  ctx.res.end(JSON.stringify(data));
}

export function sendError(ctx: Context, message: string, status = 500) {
  sendJson(ctx, { error: message }, status);
}

export function notFound(ctx: Context) {
  sendError(ctx, 'Not Found', 404);
}