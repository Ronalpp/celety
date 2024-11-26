import { Context, Handler, Route } from './types';

export class Router {
  private routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.routes.push({ path, method: 'GET', handler });
    return this;
  }

  post(path: string, handler: Handler) {
    this.routes.push({ path, method: 'POST', handler });
    return this;
  }

  async handle(ctx: Context) {
    const route = this.findRoute(ctx.req.url!, ctx.req.method!);
    
    if (!route) {
      ctx.res.statusCode = 404;
      ctx.res.end(JSON.stringify({ error: 'Not Found' }));
      return;
    }

    try {
      const result = await route.handler(ctx);
      if (!ctx.res.writableEnded) {
        ctx.res.setHeader('Content-Type', 'application/json');
        ctx.res.end(JSON.stringify(result));
      }
    } catch (err) {
      console.error('Route handler error:', err);
      ctx.res.statusCode = 500;
      ctx.res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  }

  private findRoute(path: string, method: string): Route | undefined {
    const urlPath = new URL(path, 'http://localhost').pathname;
    return this.routes.find(route => 
      route.path === urlPath && route.method === method
    );
  }
}