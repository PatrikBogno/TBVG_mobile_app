let ws;

//Pripojenie
export function connectToESP(device) {
  ws = new WebSocket(`ws://${device.ip}:${device.port}`);
  ws.binaryType = "arraybuffer";

  ws.onopen = () => console.log("WS pripojeny");
  ws.onclose = () => console.log("WS ukonceny");
  ws.onerror = e => console.error("WS error:", e);
  ws.onmessage = e => {
    // ACK spracováva waitForAck()
    if (typeof e.data !== "string") {
      console.log("BIN sprava bola ignorovana");
    }
  };
}

//odoslanie JSON spravy
export function sendJsonToESP(json) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.log("WS nie je pripojený");
    return;
  }

  ws.send(JSON.stringify({
    type: "json",
    payload: json
  }));
}

// spracovanie ACK
function waitForAck(timeout = 3000) {
  return new Promise((resolve, reject) => {
    if (!ws) return reject("WS nie je pripojeny");

    const timer = setTimeout(() => {
      ws.removeEventListener("message", handler);
      reject(new Error("Vyprsanie ACK"));
    }, timeout);

    const handler = e => {
      if (e.data === "ACK") {
        clearTimeout(timer);
        ws.removeEventListener("message", handler);
        resolve();
      }
    };

    ws.addEventListener("message", handler);
  });
}

//odoslanie obrazku
export async function sendImageToESP(bytes, filename = "image.bin") {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.log("WS nie je pripojený");
    return;
  }

  console.log("Posielam obrázok:", filename);
  console.log("Veľkosť:", bytes.length);

  //zaciatok obrazku
  ws.send(JSON.stringify({
    type: "image_start",
    filename,
    size: bytes.length
  }));

  const chunkSize = 1024;

  //binarne chunky
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, bytes.length);
    const chunk = bytes.slice(offset, end);

    ws.send(chunk);
    await waitForAck();
  }

  //koniec obrazku
  ws.send(JSON.stringify({ type: "image_end" }));

  console.log("Odosielanie obrázka dokončené");
}
