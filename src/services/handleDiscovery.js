import { discoverESP32 } from "./udpDiscovery.js";
import { connectToESP } from "./wsClientConnection.js";

export const stopDiscovery = (intervalRef) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
};

export const runDiscovery = async ({
  espName,
  storage,
  discoveryDoneRef,
  intervalRef,
  setFoundDevices,
  setConnectedDevice,
  setStoredName,
}) => {
  if (discoveryDoneRef.current) return;

  try {
    const device = await discoverESP32(espName);

    discoveryDoneRef.current = true;
    stopDiscovery(intervalRef);

    setFoundDevices(prev =>
      prev.some(d => d.ip === device.ip) ? prev : [...prev, device]
    );

    await storage.setItem("ESP_Name", espName);
    connectToESP(device);

    setStoredName(espName);
    setConnectedDevice(device);

  } catch (err) {
    console.log("Discovery failed:", err.message);
  }
};

export const handleStartDiscovery = async ({
  searchEspName,
  storage,
  intervalRef,
  discoveryDoneRef,
  callCountRef,
  setFoundDevices,
  setConnectedDevice,
  setStoredName,
  setDiscoveryError,
}) => {
  if (intervalRef.current) return;

  discoveryDoneRef.current = false;
  callCountRef.current = 0;
  setFoundDevices([]);
  setConnectedDevice(null);
  setDiscoveryError(false);

  await runDiscovery({ espName: searchEspName, storage, discoveryDoneRef, intervalRef, setFoundDevices,setConnectedDevice, setStoredName});

  intervalRef.current = setInterval(async () => {
    if (callCountRef.current >= 2 || discoveryDoneRef.current) {
      setDiscoveryError(true);
      stopDiscovery(intervalRef);
      return;
    }

    callCountRef.current++;
    await runDiscovery({ espName: searchEspName, storage, discoveryDoneRef, intervalRef, setFoundDevices, setConnectedDevice, setStoredName, });
  }, 20000);
};
