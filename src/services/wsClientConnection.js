let ws;

export function connectToESP(device) {
  ws = new WebSocket(`ws://${device.ip}:${device.port}`);
  ws.binaryType = "arraybuffer";

  ws.onopen = () => console.log("WS connected");
  ws.onmessage = e => console.log("Správa z ESP:", e.data);
  ws.onerror = e => console.log("WS error:", e);
  ws.onclose = () => console.log("WS closed");
}

export function sendJsonToESP(json) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.log("WS nie je pripojený");
    return;
  }
  ws.send(JSON.stringify({ type: "json", payload: json }));
}

// Chunkované odosielanie obrázku
export async function sendImageToESP(bytes, filename = "image.rgb565") {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.log("WS nie je pripojený");
    return;
  }

  ws.send(JSON.stringify({
    type: "image_start",
    filename,
    size: bytes.length
  }));

  const chunkSize = 4 * 1024;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, bytes.length);
    ws.send(bytes.slice(offset, end));
    await new Promise(r => setTimeout(r, 30));
  }

  ws.send(JSON.stringify({ type: "image_end" }));
  console.log("Odosielanie dokončené");
}

