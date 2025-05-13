import React, { useState } from 'react';
import VendingPage from './page/VendingPage';
import SetupPage from './page/SetupPage';

export interface ItemStock {
  id: number;
  name: string;
  imageUrl: string;
  stock: number;
  price: number;
}

const defaultItems: ItemStock[] = [
  {
    id: 1,
    name: '콜라',
    imageUrl: '/machine/coke_big.jpg',
    stock: 5,
    price: 2000,
  },
  {
    id: 2,
    name: '콜라',
    imageUrl: '/machine/coke_big.jpg',
    stock: 5,
    price: 2000,
  },
  {
    id: 3,
    name: '콜라',
    imageUrl: '/machine/coke_big.jpg',
    stock: 5,
    price: 2000,
  },
  {
    id: 4,
    name: '콜라',
    imageUrl: '/machine/coke_big.jpg',
    stock: 5,
    price: 2000,
  },
  {
    id: 5,
    name: '콜라',
    imageUrl: '/machine/coke_big.jpg',
    stock: 5,
    price: 2000,
  },
  {
    id: 6,
    name: '콜라',
    imageUrl: '/machine/coke.png',
    stock: 5,
    price: 1500,
  },
  {
    id: 7,
    name: '콜라',
    imageUrl: '/machine/coke.png',
    stock: 5,
    price: 1500,
  },
  {
    id: 8,
    name: '콜라',
    imageUrl: '/machine/coke.png',
    stock: 5,
    price: 1500,
  },
  {
    id: 9,
    name: '콜라',
    imageUrl: '/machine/coke.png',
    stock: 5,
    price: 1500,
  },
  {
    id: 10,
    name: '콜라',
    imageUrl: '/machine/coke.png',
    stock: 5,
    price: 1500,
  },
  {
    id: 11,
    name: '사이다',
    imageUrl: '/machine/cider.png',
    stock: 3,
    price: 1200,
  },
  {
    id: 12,
    name: '사이다',
    imageUrl: '/machine/cider.png',
    stock: 3,
    price: 1200,
  },
  {
    id: 13,
    name: '사이다',
    imageUrl: '/machine/cider.png',
    stock: 3,
    price: 1200,
  },
  {
    id: 14,
    name: '오렌지 주스',
    imageUrl: '/machine/orange.png',
    stock: 0,
    price: 1500,
  },
  {
    id: 15,
    name: '오렌지 주스',
    imageUrl: '/machine/orange.png',
    stock: 0,
    price: 1500,
  },
  {
    id: 16,
    name: '커피',
    imageUrl: '/machine/coffee_1.png',
    stock: 7,
    price: 800,
  },
  {
    id: 17,
    name: '커피',
    imageUrl: '/machine/coffee_1.png',
    stock: 7,
    price: 800,
  },
  {
    id: 18,
    name: '커피',
    imageUrl: '/machine/coffee_2.png',
    stock: 7,
    price: 800,
  },
  {
    id: 19,
    name: '커피',
    imageUrl: '/machine/coffee_2.png',
    stock: 7,
    price: 800,
  },
];


const App: React.FC = () => {

  const [items, setItems] = useState<ItemStock[]>(defaultItems);
  const [isSetupMode, setIsSetupMode] = useState(false);

  return isSetupMode ? (
      <SetupPage
          items={items}
          onSave={(updatedItems) => {
            setItems(updatedItems);
            setIsSetupMode(false);
          }}
      />
  ) : (
      <VendingPage
          items={items}
          onGoToSetup={() => setIsSetupMode(true)}
      />
  );
};

export default App;
