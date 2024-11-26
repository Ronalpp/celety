import { createServer as createHttpServer } from 'http';
import { Config, Context } from './types';
import { Router } from './router';

export function createServer(config: Config) {
  const router = new Router();
  
  const server = createHttpServer((req, res) => {
    const ctx: Context = {
      req,
      res,
      params: {}
    };

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    router.handle(ctx).catch(err => {
      console.error('Server error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    });
  });

  return {
    router,
    listen: (callback?: () => void) => {
      server.listen(config.port, () => {
        console.log(`🚀 Server running on port ${config.port}`);
        callback?.();
      });
    }
  };
}