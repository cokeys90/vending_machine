import React, { useState } from 'react';
import type { ItemStock } from '../App';

interface Props {
  items: ItemStock[];
  onSave: (items: ItemStock[]) => void;
}

const SetupPage: React.FC<Props> = ({ items, onSave }) => {
  const [editedItems, setEditedItems] = useState<ItemStock[]>(items);

  const handleChange = (id: number, field: 'stock' | 'price', value: number) => {
    setEditedItems(prev =>
        prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        )
    );
  };

  return (
      <div style={{ padding: 20 }}>
        <h2>수량 및 가격 설정</h2>
        <table>
          <thead>
          <tr>
            <th>상품</th>
            <th>재고</th>
            <th>가격</th>
          </tr>
          </thead>
          <tbody>
          {editedItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <input
                      type="number"
                      value={item.stock}
                      min={0}
                      onChange={e => handleChange(item.id, 'stock', Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                      type="number"
                      value={item.price}
                      min={0}
                      step={100}
                      onChange={e => handleChange(item.id, 'price', Number(e.target.value))}
                  />
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <button
            onClick={() => onSave(editedItems)}
            style={{ marginTop: 20, padding: '10px 20px' }}
        >
          저장
        </button>
      </div>
  );
};

export default SetupPage;
