type MessageHandler = (event: MessageEvent) => void;
type StatusChangeHandler = (status: WsStatus) => void;

export type WsStatus = "connecting" | "open" | "closed" | "error";

interface WsClientOptions {
  /** Called whenever a message is received. */
  onMessage?: MessageHandler;
  /** Called when the connection status changes. */
  onStatusChange?: StatusChangeHandler;
  /** Reconnect interval in ms. Set to 0 to disable auto-reconnect. Default: 3000 */
  reconnectInterval?: number;
  /** Maximum reconnect attempts. Default: 5 */
  maxReconnectAttempts?: number;
}

// ---------------------------------------------------------------------------
// Singleton WebSocket client
// ---------------------------------------------------------------------------
class WsClient {
  private socket: WebSocket | null = null;
  private url: string = "";
  private options: Required<WsClientOptions> = {
    onMessage: () => undefined,
    onStatusChange: () => undefined,
    reconnectInterval: 3_000,
    maxReconnectAttempts: 5,
  };
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  connect(url: string, options: WsClientOptions = {}): void {
    this.url = url;
    this.options = { ...this.options, ...options };
    this.reconnectAttempts = 0;
    this._open();
  }

  private _open(): void {
    if (typeof window === "undefined") return; // SSR guard

    this._setStatus("connecting");

    try {
      this.socket = new WebSocket(this.url);
    } catch {
      this._setStatus("error");
      this._scheduleReconnect();
      return;
    }

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      this._setStatus("open");
    };

    this.socket.onmessage = (event) => {
      this.options.onMessage(event);
    };

    this.socket.onerror = () => {
      this._setStatus("error");
    };

    this.socket.onclose = () => {
      this._setStatus("closed");
      this._scheduleReconnect();
    };
  }

  private _setStatus(status: WsStatus): void {
    this.options.onStatusChange(status);
  }

  private _scheduleReconnect(): void {
    const { reconnectInterval, maxReconnectAttempts } = this.options;
    if (reconnectInterval === 0) return;
    if (this.reconnectAttempts >= maxReconnectAttempts) return;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this._open();
    }, reconnectInterval);
  }

  send(data: string | object): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn("[WsClient] Cannot send – socket is not open.");
      return;
    }
    const payload = typeof data === "string" ? data : JSON.stringify(data);
    this.socket.send(payload);
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.socket?.close();
    this.socket = null;
  }

  get status(): WsStatus {
    if (!this.socket) return "closed";
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        return "connecting";
      case WebSocket.OPEN:
        return "open";
      default:
        return "closed";
    }
  }
}

// Export a single shared instance
export const wsClient = new WsClient();
