import { useEffect, useRef } from "react";

const DEFAULT_SCAN_TIMEOUT = 50;
const DEFAULT_MIN_LENGTH = 4;

/**
 * Listens to keyboard events and attempts to match rapid sequences against a data source.
 * Invokes callbacks when a matching barcode is found or when a scan does not match anything.
 */
const useBarcodeScanner = ({
  enabled = true,
  items = [],
  getBarcode = (item) => item?.product_barcode,
  onScanSuccess,
  onScanFailure,
  scanTimeout = DEFAULT_SCAN_TIMEOUT,
  minBarcodeLength = DEFAULT_MIN_LENGTH,
} = {}) => {
  const bufferRef = useRef("");
  const lastKeyTimeRef = useRef(0);
  const itemsRef = useRef(items);
  const getBarcodeRef = useRef(getBarcode);
  const onScanSuccessRef = useRef(onScanSuccess);
  const onScanFailureRef = useRef(onScanFailure);
  const optionsRef = useRef({ scanTimeout, minBarcodeLength });

  const resetBuffer = () => {
    bufferRef.current = "";
    lastKeyTimeRef.current = 0;
  };

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    getBarcodeRef.current = getBarcode;
  }, [getBarcode]);

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
  }, [onScanSuccess]);

  useEffect(() => {
    onScanFailureRef.current = onScanFailure;
  }, [onScanFailure]);

  useEffect(() => {
    optionsRef.current = { scanTimeout, minBarcodeLength };
  }, [scanTimeout, minBarcodeLength]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleKeyDown = (event) => {
      const now = Date.now();
      const { scanTimeout: timeout, minBarcodeLength: minLength } =
        optionsRef.current;

      if (event.key === "Enter") {
        const isPotentialScan =
          bufferRef.current.length >= minLength &&
          now - lastKeyTimeRef.current <= timeout;

        if (isPotentialScan) {
          event.preventDefault();
          const scannedBarcode = bufferRef.current;
          const matchedItem = itemsRef.current.find(
            (item) => getBarcodeRef.current?.(item) === scannedBarcode
          );

          if (matchedItem) {
            onScanSuccessRef.current?.(matchedItem, scannedBarcode);
          } else if (scannedBarcode) {
            onScanFailureRef.current?.(scannedBarcode);
          }
        }

        resetBuffer();
        return;
      }

      if (event.key === "Backspace") {
        resetBuffer();
        return;
      }

      if (now - lastKeyTimeRef.current > timeout) {
        resetBuffer();
      }

      if (
        event.key &&
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        bufferRef.current += event.key;
        lastKeyTimeRef.current = now;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      resetBuffer();
    };
  }, [enabled]);

  return { reset: resetBuffer };
};

export default useBarcodeScanner;
