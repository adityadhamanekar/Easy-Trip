import { useState } from "react";

export default function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!description) return;
    const newItem = {
      description,
      quantity,
      id: Date.now(),
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😊</h3>
      <div>
        <select
          value={quantity}
          className='u-ml'
          onChange={e => setQuantity(e.target.value)}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          className='u-ml'
          type='text'
          placeholder='Item...'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className='u-ml'>Add</button>
      </div>
    </form>
  );
}
