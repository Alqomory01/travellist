import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "fan", quantity: 13, packed: false },
];
export default function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems (item){
    setItems(items => [...items, item])
  }
  function handleDelete (id){
    setItems(items.filter (item => item.id!==id))
  }
  function handleToggle(id){
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} :item))
  }
  
  return <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items} onToggleItems={handleToggle} onDeleteItems={handleDelete}/>
    <Stats/>
  </div>
}


function Logo() {
return <h1>🌴Far Away💼</h1>
}
function Form({onAddItems}) {
  const [description, setDescription] = useState('test');
  const [quantity, setQuantity] = useState(1);
  

  

  function handleSubmit (e){
    e.preventDefault();
    // console.log(e)
    if (!description) return;

    const newItem = { description, quantity, packed:false, id: Date.now()};
    console.log(newItem);
    onAddItems(newItem)

    setDescription('');
    setQuantity('');
  }
return <form className='add-form' onSubmit={handleSubmit}>
  <h3> What do you need for your 😍trip</h3>
  <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
    {/* <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option> */}

    {Array.from({length: 20},(_, i) => i + 1 ).map(num=><option value={num} key={num}>{num}</option>)}
  </select>
  <input type='text' placeholder='Item...' value={description} onChange={(e) => setDescription(e.target.value)}></input>
    <button >Add</button>
</form>
}
function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
  <div className='list'>
  <ul >
    {items.map(item=><Item item={item} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} key={item.id}/>)}
  </ul>

  </div>
  );
}
function Item({item, onDeleteItems, onToggleItems}){
  return <li>
    <input type="checkbox" value={item.packed}onChange={() => {onToggleItems(item.id)}}></input><span style={item.packed ? {textDecoration: "line-through"}: {}}>{item.quantity} {item.description}</span>
  <button onClick={() => onDeleteItems(item.id)}>❌</button></li>
  
}
function Stats( ) {
  return <footer className='stats'>
    <em>
    You have X items on your list, and you already packed X (X%)
    </em>
  </footer>
}