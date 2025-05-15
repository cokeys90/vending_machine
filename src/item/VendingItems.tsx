export interface ItemVendingStock {
  id: number; // 식별 번호
  name: string; // 음료 이름
  imageUrl: string; // 음료 이미지 경로
  stock: number; // 재고 수량
  price: number; // 음료 가격
}


export function generateDefaultItems(): ItemVendingStock[] {
  return [
    {
      id: 1,
      name: '콜라',
      imageUrl: '/resource/drink_coke_big.jpg',
      stock: 5,
      price: 2000,
    },
    {
      id: 2,
      name: '콜라',
      imageUrl: '/resource/drink_coke_big.jpg',
      stock: 5,
      price: 2000,
    },
    {
      id: 3,
      name: '콜라',
      imageUrl: '/resource/drink_coke_big.jpg',
      stock: 5,
      price: 2000,
    },
    {
      id: 4,
      name: '콜라',
      imageUrl: '/resource/drink_coke_big.jpg',
      stock: 5,
      price: 2000,
    },
    {
      id: 5,
      name: '콜라',
      imageUrl: '/resource/drink_coke_big.jpg',
      stock: 5,
      price: 2000,
    },
    {
      id: 6,
      name: '콜라',
      imageUrl: '/resource/drink_coke.png',
      stock: 5,
      price: 1100,
    },
    {
      id: 7,
      name: '콜라',
      imageUrl: '/resource/drink_coke.png',
      stock: 5,
      price: 1100,
    },
    {
      id: 8,
      name: '콜라',
      imageUrl: '/resource/drink_coke.png',
      stock: 5,
      price: 1100,
    },
    {
      id: 9,
      name: '콜라',
      imageUrl: '/resource/drink_coke.png',
      stock: 5,
      price: 1100,
    },
    {
      id: 10,
      name: '콜라',
      imageUrl: '/resource/drink_coke.png',
      stock: 5,
      price: 1100,
    },
    {
      id: 11,
      name: '물',
      imageUrl: '/resource/drink_water.jpg',
      stock: 3,
      price: 600,
    },
    {
      id: 12,
      name: '물',
      imageUrl: '/resource/drink_water.jpg',
      stock: 3,
      price: 600,
    },
    {
      id: 13,
      name: '물',
      imageUrl: '/resource/drink_water.jpg',
      stock: 3,
      price: 600,
    },
    {
      id: 14,
      name: '물',
      imageUrl: '/resource/drink_water.jpg',
      stock: 0,
      price: 600,
    },
    {
      id: 15,
      name: '물',
      imageUrl: '/resource/drink_water.jpg',
      stock: 0,
      price: 600,
    },
    {
      id: 16,
      name: '커피',
      imageUrl: '/resource/drink_coffee_1.png',
      stock: 7,
      price: 700,
    },
    {
      id: 17,
      name: '커피',
      imageUrl: '/resource/drink_coffee_1.png',
      stock: 7,
      price: 700,
    },
    {
      id: 18,
      name: '커피',
      imageUrl: '/resource/drink_coffee_2.png',
      stock: 7,
      price: 700,
    },
    {
      id: 19,
      name: '커피',
      imageUrl: '/resource/drink_coffee_2.png',
      stock: 7,
      price: 700,
    },
  ];
}
