import { useState } from "react";

export default function App() {
  const itemsList = JSON.parse(localStorage.getItem("items")) || [];
  const [items, setItems] = useState(itemsList);

  function handleAddItem(item) {
    setItems(items => {
      return [...items, item];
    });
  }

  function setItemsToLocalStorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
    console.log(items);
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id == id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleleItem(id) {
    setItems(items => items.filter(item => item.id != id));
  }

  function handleClearList() {
    const confirmed = window.confirm("do you want to clear the list ?");

    if (confirmed) setItems([]);
  }
  setItemsToLocalStorage(items);

  return (
    <div className='app'>
      <Header />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleleteItem={handleDeleleItem}
        onClearList={handleClearList}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return <h1>🌴 EASY TRIP 🌴</h1>;
}

function Form({ onAddItem }) {
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

function PackingList({ items, onToggleItem, onDeleleteItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;

  if (sortBy === "input") sortedItem = items;
  if (sortBy === "description") {
    sortedItem = items.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  }
  if (sortBy === "packed") {
    sortedItem = items.slice().sort((a, b) => {
      return Number(a.packed) - Number(b.packed);
    });
  }

  return (
    <div className='list'>
      <ul>
        {sortedItem.map(item => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            key={item.id}
            onDeleleteItem={onDeleleteItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onToggleItem, onDeleleteItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleleteItem(item.id)}>❌</button>
    </li>
  );
}

function Footer({ items }) {
  if (!items.length) {
    return (
      <p className='stats'>
        <em>Start Adding Items. </em>
        <span style={{display:'block'}}className='copyright'>&copy;copyright Aditya Dhamanekar 2024.</span>
      </p>
    );
  }
  const numItems = items.length;
  const numPackedItems = items.filter(item => item.packed).length;
  const percentage = Math.round((numPackedItems / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? "You have packed everything 👍. Ready to go ✈️"
          : `You have ${numItems} item in you List and you have packed ${percentage}% Items 💼.`}
        <span style={{display:'block'} }className='copyright'>&copy;copyright Aditya Dhamanekar 2024.</span>
      </em>
    </footer>
  );
}
