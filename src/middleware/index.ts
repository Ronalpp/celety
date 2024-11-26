import { Config, Context, Middleware } from '../types';

export const rateLimit = (config: Config): Middleware => {
  const requests = new Map<string, number[]>();

  return async (ctx: Context, next: () => Promise<void>) => {
    const ip = ctx.req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const windowStart = now - config.rateLimitWindow;

    const userRequests = requests.get(ip as string) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);

    if (recentRequests.length >= config.rateLimitRequests) {
      ctx.res.statusCode = 429;
      ctx.res.end('Too Many Requests');
      return;
    }

    recentRequests.push(now);
    requests.set(ip as string, recentRequests);
    await next();
  };
};