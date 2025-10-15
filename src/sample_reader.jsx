import React, { useEffect, useRef, useState } from "react";

export default function SerialBarcodeScanner() {
  const [port, setPort] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [baudRate, setBaudRate] = useState(9600);
  const [scans, setScans] = useState([]);
  const decoderRef = useRef(new TextDecoder());
  const readerRef = useRef(null);
  const bufferRef = useRef("");

  async function connectPort() {
    console.log("Requesting serial port...");
    try {
      const requestedPort = await navigator.serial.requestPort();
      console.log("Port selected:", requestedPort.getInfo ? requestedPort.getInfo() : requestedPort);
      if (!requestedPort.readable && !requestedPort.writable) {
        await requestedPort.open({ baudRate: Number(baudRate) });
        console.log("Port opened at baud rate:", baudRate);
      } else {
        console.log("Port is already open.");
      }
      setPort(requestedPort);
    } catch (err) {
      console.error("Failed to open port:", err);
      alert("Could not open serial port. Make sure your browser supports Web Serial and the device is connected.");
    }
  }

  async function disconnectPort() {
    console.log("Disconnecting port...");
    stopReading();
    if (port) {
      try {
        await port.close();
        console.log("Port closed successfully.");
      } catch (e) {
        console.warn("Error closing port:", e);
      }
      setPort(null);
    }
  }

  async function startReading() {
    if (!port) return alert("Open a port first.");
    if (!port.readable) return alert("Port is not readable.");
    console.log("Starting to read from port...");
    setIsReading(true);
    const reader = port.readable.getReader();
    readerRef.current = reader;
    try {
      while (true) {
        const { value, done } = await reader.read();
        console.log("Read chunk:", value, "done:", done);
        if (done) break;
        if (value) {
          const chunk = decoderRef.current.decode(value);
          console.log("Decoded chunk:", chunk);
          handleIncomingChunk(chunk);
        }
      }
    } catch (err) {
      console.error("Read loop error:", err);
    } finally {
      console.log("Stopping read loop.");
      reader.releaseLock();
      readerRef.current = null;
      setIsReading(false);
    }
  }

  async function stopReading() {
    console.log("Stopping reading...");
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
        console.log("Reader cancelled.");
      } catch {}
      try {
        readerRef.current.releaseLock();
        console.log("Reader lock released.");
      } catch {}
      readerRef.current = null;
    }
    setIsReading(false);
  }

  function handleIncomingChunk(chunk) {
    console.log("Handling chunk:", chunk);
    bufferRef.current += chunk;
    const normalized = bufferRef.current.replace(/\r\n/g, "\n");
    const parts = normalized.split("\r");
    console.log("Buffer normalized:", normalized);
    console.log("Split parts:", parts);
    for (let i = 0; i < parts.length - 1; i++) {
      const line = parts[i].trim();
      console.log("Complete line detected:", line);
      if (line) {
        addScan(line);
      }
    }
    bufferRef.current = parts[parts.length - 1];
    console.log("Remaining buffer:", bufferRef.current);
  }
  function addScan(value) {
    console.log("Adding scan:", value);
    setScans((s) => [{ id: Date.now() + Math.random(), value }, ...s].slice(0, 200));
  }
  function clearScans() {
    console.log("Clearing scans...");
    setScans([]);
  }

  async function copyLatest() {
    if (!scans.length) return;
    try {
      await navigator.clipboard.writeText(scans[0].value);
      console.log("Copied latest barcode:", scans[0].value);
      alert("Copied latest barcode to clipboard.");
    } catch (e) {
      console.warn("Copy failed:", e);
      alert("Copy failed. Try manually selecting the value.");
    }
  }

  useEffect(() => {
    return () => {
      console.log("Cleaning up component, stopping reading and closing port...");
      stopReading();
      if (port && port.readable) {
        try { port.close(); console.log("Port closed on cleanup."); } catch (e) {}
      }
    };
  }, []);
  
  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1rem" }}>Serial Barcode Scanner</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label>Baud rate</label><br />
          <input
            type="number"
            value={baudRate}
            onChange={(e) => setBaudRate(Number(e.target.value))}
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <div style={{ fontSize: "12px", color: "gray" }}>Common values: 9600, 115200</div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
          <button onClick={connectPort}>Open Port</button>
          <button onClick={disconnectPort} disabled={!port}>Close Port</button>
          {!isReading ? (
            <button onClick={startReading} disabled={!port}>Start Reading</button>
          ) : (
            <button onClick={stopReading}>Stop Reading</button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button onClick={copyLatest} disabled={!scans.length}>Copy Latest</button>
        <button onClick={clearScans} disabled={!scans.length}>Clear</button>
        <div style={{ flex: 1, background: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
          <div>Port: {port ? (port.getInfo ? JSON.stringify(port.getInfo()) : 'connected') : 'not connected'}</div>
          <div>Status: {isReading ? 'reading' : 'idle'}</div>
        </div>
      </div>
      <div style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "0.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Scanned values (most recent first)</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {scans.length === 0 ? (
            <div style={{ color: "gray" }}>No scans yet.</div>
          ) : (
            <ul>
              {scans.map((s) => (
                <li key={s.id} style={{ borderBottom: "1px solid #eee", padding: "0.25rem 0" }}>
                  <div>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>{new Date(s.id).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "gray", marginTop: "0.5rem" }}>
        Notes: This uses the browser Web Serial API. Run on <strong>https</strong> or <strong>localhost</strong>. The barcode scanner should be set to serial/USB COM mode. If your scanner sends HID keyboard input instead of serial bytes, this will not capture it.
      </div>
    </div>
  );
}