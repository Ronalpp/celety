import { IncomingMessage, ServerResponse } from 'http';

export interface Request extends IncomingMessage {}
export interface Response extends ServerResponse {}

export interface Context {
  req: Request;
  res: Response;
  params: Record<string, string>;
}

export type Handler = (ctx: Context) => Promise<any> | any;

export interface Route {
  path: string;
  method: string;
  handler: Handler;
}

export interface Config {
  port: number;
}