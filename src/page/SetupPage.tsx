import React, { useState } from 'react';
import type {ItemVendingStock} from "../item/VendingItems.tsx";

interface Props {
  items: ItemVendingStock[];
  onSave: (items: ItemVendingStock[]) => void;
}

const SetupPage: React.FC<Props> = ({ items, onSave }) => {
  const [editedItems, setEditedItems] = useState<ItemVendingStock[]>(items);

  // 재고(stock) 및 가격(가격) 변경 핸들러
  const handleChange = (id: number, field: 'stock' | 'price', value: number) => {
    setEditedItems(prev =>
        // id를 기준으로 map에 담겨있는 item을 찾고, 해당 item의 id와 같으면 field에 설정 된 값(value)을 수정
        prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        )
    );
  };

  // 가격이 0원인 항목을 확인하고 저장 여부를 묻는 함수
  const handleSave = () => {
    const hasZeroPrice = editedItems.some(item => item.price === 0);
    if (hasZeroPrice) {
      const confirmed = window.confirm('가격이 0원인 상품이 있습니다. 계속 저장하시겠습니까?');
      if (!confirmed) return;
    }
    onSave(editedItems);
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
                      style={{
                        borderColor: item.stock === 0 ? 'red' : undefined,
                        backgroundColor: item.stock === 0 ? '#ffe5e5' : undefined
                      }}
                  />

                </td>
                <td>
                  {/* step : 100원 단위 증가 */}
                  <input
                      type="number"
                      value={item.price}
                      min={0}
                      step={100}
                      onChange={e => handleChange(item.id, 'price', Number(e.target.value))}
                      style={{
                        borderColor: item.price === 0 ? 'red' : undefined,
                        backgroundColor: item.price === 0 ? '#ffe5e5' : undefined
                      }}
                  />
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <button
            onClick={() => handleSave()}
            style={{ marginTop: 20, padding: '10px 20px' }}
        >
          저장
        </button>
      </div>
  );
};

export default SetupPage;
