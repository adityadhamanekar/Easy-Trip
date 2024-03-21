export default function Footer({ items }) {
  if (!items.length) {
    return (
      <p className='stats'>
        <em>Start Adding Items. </em>
        <span style={{ display: "block" }} className='copyright'>
          &copy;copyright Aditya Dhamanekar 2024.
        </span>
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
        <span style={{ display: "block" }} className='copyright'>
          &copy;copyright Aditya Dhamanekar 2024.
        </span>
      </em>
    </footer>
  );
}
