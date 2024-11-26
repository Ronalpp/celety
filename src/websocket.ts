import { WebSocket } from 'ws';
import { Context } from './types';

export interface WebSocketHandler {
  onMessage?: (ws: WebSocket, message: string) => void;
  onConnect?: (ws: WebSocket) => void;
  onClose?: (ws: WebSocket) => void;
}

export class WebSocketManager {
  private handlers: WebSocketHandler[] = [];

  public addHandler(handler: WebSocketHandler) {
    this.handlers.push(handler);
  }

  public handleConnection(ws: WebSocket, ctx: Context) {
    this.handlers.forEach(handler => {
      handler.onConnect?.(ws);
    });

    ws.on('message', (data) => {
      const message = data.toString();
      this.handlers.forEach(handler => {
        handler.onMessage?.(ws, message);
      });
    });

    ws.on('close', () => {
      this.handlers.forEach(handler => {
        handler.onClose?.(ws);
      });
    });
  }
}