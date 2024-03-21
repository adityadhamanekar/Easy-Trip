import Item from "./Item";
import { useState } from "react";

export default function PackingList({
  items,
  onToggleItem,
  onDeleleteItem,
  onClearList,
}) {
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
