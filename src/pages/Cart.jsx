import Card from '../components/Card';
import { useCartContext } from '../context/CartContext';

const Cart = () => {
  const { items } = useCartContext();

  const total = () => {
    return items.reduce((acc, current) => {
      return acc + current.quantity * current.price;
    }, 0);
  };
  return (
    <div class='max-w-md my-8 mx-auto'>
      <Card title='Cart' rounded={true} flat={false}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. pora quis ea ratione atque incidunt.
        <For each={items}>
          {(item) => (
            <p>
              {item.title}, {item.price}
            </p>
          )}
        </For>
        <h2 class='font-bold'>Total : {total()}</h2>
      </Card>
    </div>
  );
};

export default Cart;
