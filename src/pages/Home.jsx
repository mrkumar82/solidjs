import { createResource } from 'solid-js';
import Card from '../components/Card';
import { A } from '@solidjs/router';

const fetchProduct = async () => {
  const resp = await fetch('https://fakestoreapi.com/products');
  return resp.json();
};

const Home = () => {
  const [products] = createResource(fetchProduct);

  return (
    <Show when={products()} fallback={<p>Loading...</p>}>
      <div class='grid grid-cols-4 gap-10 my-4'>
        <For each={products()}>
          {(product) => (
            <Card title={product.title} price={product.price} img={product.image} rounded={true} flat={true}>
              <A href={'/product/' + product.id}>
                <div class='img'>
                  <img src={product.image} alt={product.title} />
                </div>
                <h2 class='text-2xl title font-bold'>{product.title}</h2>
                <p class='desc'>{product.description}</p>
                <h4 class='font-bold'>${product.price}</h4>
                <button class='btn'>Click me</button>
              </A>
            </Card>
          )}
        </For>
      </div>
    </Show>
  );
};

export default Home;
