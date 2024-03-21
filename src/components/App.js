import { useState } from "react";

import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Footer from "./Footer";

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
