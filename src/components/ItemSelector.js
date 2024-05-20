import React from "react";

const ItemSelector = ({ items, selectedItem, handleItemChange }) => {
  return (
    <div>
      <label htmlFor="itemSelect">Select Item</label>
      <select id="itemSelect" value={selectedItem} onChange={handleItemChange}>
        <option value="">Select an Item</option>
        {items.map((item) => (
          <option key={item.id} value={item.item_name}>
            {item.item_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemSelector;
