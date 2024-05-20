import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQRValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const generateQRCode = () => {
    setQRValue(inputValue);
  };

  return (
    <div id="qrCodeGeneratorContainer">
      <label>QR Code Generator</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter value"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrValue && (
        <div>
          <h2>Generated QR Code:</h2>
          <QRCodeCanvas value={qrValue} style={{ padding: "20px" }} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
