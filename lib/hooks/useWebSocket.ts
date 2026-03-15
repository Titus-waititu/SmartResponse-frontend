import { useEffect, useState } from "react";
import { wsClient, WsStatus } from "@/lib/ws/wsClient";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:3001";

interface UseWebSocketOptions {
  /** Only open the socket when this is true. Useful for auth-gated pages. */
  enabled?: boolean;
  onMessage?: (event: MessageEvent) => void;
}

/**
 * Hook that manages a WebSocket connection tied to the component lifecycle.
 * Uses the shared wsClient singleton.
 */
export function useWebSocket({
  enabled = true,
  onMessage,
}: UseWebSocketOptions = {}) {
  const [status, setStatus] = useState<WsStatus>("closed");

  useEffect(() => {
    if (!enabled) return;

    wsClient.connect(WS_URL, {
      onMessage,
      onStatusChange: setStatus,
    });

    return () => {
      wsClient.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { status, send: wsClient.send.bind(wsClient) };
}
