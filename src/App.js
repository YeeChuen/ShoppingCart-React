import logo from './logo.svg';
import './App.css';
import Inventory from './components/inventory/Inventory';
import Cart from './components/cart/Cart';

function App() {
  return (
    <div className="App">
      <Inventory/>
      <Cart/>
    </div>
  );
}

export default App;
