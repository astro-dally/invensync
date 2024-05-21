import React, { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const QRScanner = ({ selectedItem, items }) => {
  const [qrData, setQrData] = useState("");
  const [showQrReader, setShowQrReader] = useState(false);
  const [isQrScanned, setIsQrScanned] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setIsQrScanned(false);
      setQrData("");
      toast.dismiss();
    }
  }, [selectedItem]);

  const handleScanQrCode = (data) => {
    if (data && !isQrScanned) {
      setQrData(data);
      setShowQrReader(false);
      setIsQrScanned(true);
      toast.success("QR Code scanned successfully!");
    }
  };

  const handleDestinationClick = () => {
    setQrData("");
    setShowQrReader(true);
    setIsQrScanned(false);
    toast.dismiss();
  };

  const handleSubmit = async () => {
    if (!qrData) {
      toast.error("Please scan the QR code for destination");
      return;
    }

    const selectedItemData = items.find(
      (item) => item.item_name === selectedItem
    );
    if (!selectedItemData) {
      toast.error("Invalid item selected");
      return;
    }

    if (!selectedItemData.allowed_locations.includes(qrData)) {
      toast.error(
        "Destination not allowed for selected item. Please try again."
      );
      setQrData("");
      setIsQrScanned(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api-staging.inveesync.in/test/submit",
        {
          id: selectedItemData.id,
          item_name: selectedItemData.item_name,
          location: qrData,
        }
      );

      if (response.status === 200) {
        toast.success("Item submitted successfully!", { id: "success-toast" });
      } else {
        throw new Error("Error submitting item");
      }
    } catch (error) {
      toast.error("Error submitting item. Please try again.");
      console.error("Submit Error:", error);
    }

    setQrData("");
    setIsQrScanned(false);
  };

  return (
    <div>
      <div>
        <label htmlFor="destinationInput">Destination</label>
        <input
          type="text"
          id="destinationInput"
          onClick={handleDestinationClick}
          value={qrData}
          readOnly
          placeholder="Click to scan QR code"
        />
      </div>
      {showQrReader && (
        <Scanner
          onResult={handleScanQrCode}
          onError={(error) => console.error("Scan Error:", error?.message)}
        />
      )}
      <Toaster />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QRScanner;
