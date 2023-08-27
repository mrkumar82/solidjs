import { Routes, Route, A } from '@solidjs/router';
import { createSignal } from 'solid-js';
import styles from './App.module.css';
import banner from './assets/banner.jpg';
import { useCartContext } from './context/CartContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  const [darkTheme, setDarkTheme] = createSignal(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }
  const { items } = useCartContext();
  const quantity = () => {
    return items.reduce((acc, current) => {
      return acc + current.quantity;
    }, 0);
  };

  return (
    <div class='container m-auto'>
      <header class='my-4 p-2 text-xl  items-center gap-4'>
        <div class='flex justify-between p-2' classList={{ 'bg-neutral-900': darkTheme(), 'text-white': darkTheme() }}>
          <h1>Site logo</h1>
          <div>
            <A href='/'>Home </A> |<A href='/cart'> Cart</A>
          </div>
          <div class='flex'>
            <button onClick={toggleTheme}>theme</button> <div class='pl-3'>Cart {quantity()}</div>
          </div>
        </div>

        <img class='w-full' src={banner} alt='banner' />
      </header>
      <Routes>
        <Route path='/' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/product/:id' component={Product} />
      </Routes>
    </div>
  );
}

export default App;
