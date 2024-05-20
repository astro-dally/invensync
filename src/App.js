import { useState, useEffect } from "react";
import "./App.css";
import ItemSelector from "./components/ItemSelector";
import QuantityInput from "./components/QuantityInput";
import QRScanner from "./components/QRScanner";
import { ToWords } from "to-words";
import QRCodeGenerator from "./components/QRCodeGenerator";

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [units, setUnits] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityInWords, setQuantityInWords] = useState("");

  const toWords = new ToWords();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://api-staging.inveesync.in/test/get-items"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Fetch Items Error:", error.message);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (event) => {
    const selectedItem = event.target.value;
    const selectedUnit =
      items.find((item) => item.item_name === selectedItem)?.unit || "";
    setSelectedItem(selectedItem);
    setUnits(selectedUnit);
  };

  const handleQuantityChange = (event) => {
    const input = event.target.value.trim();
    if (!input) {
      setQuantityInWords("");
      setQuantity("");
    } else {
      const newQuantity = parseInt(input, 10);
      setQuantity(newQuantity);
      setQuantityInWords(toWords.convert(newQuantity));
    }
  };

  return (
    <div className="container">
      <h1>InveeSync</h1>
      <ItemSelector
        items={items}
        selectedItem={selectedItem}
        handleItemChange={handleItemChange}
      />
      <QuantityInput
        quantity={quantity}
        quantityInWords={quantityInWords}
        handleQuantityChange={handleQuantityChange}
        units={units}
      />
      <QRScanner
        selectedItem={selectedItem} // Passing the item name directly
        items={items} // Passing all items to QRScanner
      />
      <QRCodeGenerator />
    </div>
  );
};

export default App;
