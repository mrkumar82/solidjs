import { useParams } from '@solidjs/router';
import { createResource, Show } from 'solid-js';
import Card from '../components/Card';
import { useCartContext } from '../context/CartContext';

const fetchProduct = async (id) => {
  const resp = await fetch('https://fakestoreapi.com/products/' + id);
  return resp.json();
};

const Product = () => {
  const params = useParams();
  const { items, setItems } = useCartContext();
  const [product] = createResource(params.id, fetchProduct);

  const addToCart = () => {
    const exist = items.find((p) => p.id === product().id);

    if (exist) {
      setItems(
        (p) => p.id === product().id,
        'quantity',
        (q) => q + 1
      );
    } else {
      setItems([...items, { ...product(), quantity: 1 }]);
    }
  };

  return (
    <div>
      <Show when={product()} fallback={<p>Loading...</p>}>
        <Card>
          <div className='grid grid-cols-5 gap-7'>
            <div className='col-span-2'>
              <img src={product().image} alt={product().title} />
            </div>
            <div className='col-span-3 text-left'>
              <h2 class='text-2xl'>{product().title}</h2>
              <p>{product().description}</p>
              <h4>{product().price}</h4>
              <button class='btn' onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </Card>
      </Show>
    </div>
  );
};

export default Product;
