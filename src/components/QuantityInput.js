import React from "react";

const QuantityInput = ({
  quantity,
  quantityInWords,
  handleQuantityChange,
  units,
}) => {
  return (
    <div>
      <label htmlFor="quantityInput">Quantity</label>
      <input
        type="number"
        id="quantityInput"
        value={quantity}
        onChange={handleQuantityChange}
        placeholder="Enter the quantity"
      />
      <div>
        <label htmlFor="unitsInput">Unit</label>
        <input
          type="text"
          id="unitsInput"
          value={units}
          readOnly
          placeholder="Unit"
        />
      </div>
      <h4>Quantity in words: {quantityInWords}</h4>
    </div>
  );
};

export default QuantityInput;
