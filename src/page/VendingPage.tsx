import React, {useEffect, useRef, useState} from 'react';
import type {ItemVendingStock} from "../item/VendingItems.tsx";
import '../App.css';

interface Props {
  items: ItemVendingStock[];
  onGoToSetup: () => void;
}

const VendingPage: React.FC<Props> = ({items, onGoToSetup}) => {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [cash, setCash] = useState<number>(0);
  const [card, setCard] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [availableItems, setAvailableItems] = useState<ItemVendingStock[]>(items); // 재고가 변경될 때마다 업데이트

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (cash > 0 || card) {
      setHighlightIndex(null); // 하이라이트 제거
      return;
    }

    const interval = setInterval(() => {
      const inStockItems = availableItems.filter(item => item.stock > 0);
      const randomItem = inStockItems[Math.floor(Math.random() * inStockItems.length)];
      setHighlightIndex(randomItem?.id ?? null);
    }, 1000);
    return () => clearInterval(interval);
  }, [availableItems, cash, card]);

  // 현금 투입 시 타임아웃 시작
  const handleCashInsert = (amount: number) => {
    if (card) {
      alert('카드가 투입 되어 있습니다. 반환 후 사용해 주세요.');
      return;
    }

    setCash(prev => {
      const nextCash = prev + amount;

      if (nextCash > 0 && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (timeoutRef.current === null) {
        // 20초 타임아웃 설정
        timeoutRef.current = window.setTimeout(() => {
          alert('장시간 동작 하지 않아 잔돈이 반환 됩니다.');
          setCash(0);
        }, 20000); // 20초 타이머
      }

      setMessage('');
      return nextCash;
    });
  };

  // 카드 투입 시 타임아웃 시작
  const handleCardInsert = () => {
    if (cash > 0) {
      alert('현금이 투입 되어 있습니다. 반환 후 사용해 주세요.');
      return;
    }

    setCard(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 20초 타임아웃 설정
    timeoutRef.current = window.setTimeout(() => {
      alert('장시간 동작 하지 않아 카드 결제가 중단 됩니다 카드 반환 후 다시 투입 해 주세요.');
      setCard(false);
    }, 20000); // 20초 타이머
  };

  // 현금 반환
  const handleRefund = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMessage('');
    setCash(0);
  };

  // 음료수 선택 후 결제 및 배출
  const handleItemSelect = (item: ItemVendingStock) => {
    if (item.stock <= 0) {
      alert('해당 음료수는 품절입니다.');
      return;
    }

    if (item.price > cash && !card) {
      alert('잔액이 부족합니다. 현금을 추가하거나 카드를 이용해 주세요.');
      return;
    }

    // 카드가 투입되어 있으면 현금 잔액을 고려하지 않고 카드로 결제
    if (item.price <= cash || card) {
      // 음료수 배출 처리
      const remainingCash = cash - item.price;

      // 현금에서 음료수 가격 차감
      setCash(remainingCash >= 0 ? remainingCash : 0);

      // 재고에서 1 차감
      setAvailableItems(prevItems =>
          prevItems.map(i =>
              i.id === item.id ? { ...i, stock: i.stock - 1 } : i
          )
      );

      // 음료수 배출 메시지
      setMessage(`${item.name} 음료수가 배출되었습니다.`);

      // 5초 후 메시지 제거
      setTimeout(() => setMessage(''), 5000);
    } else {
      alert('잔액이 부족합니다. 현금을 추가하거나 카드를 이용해 주세요.');
    }
  };

  return (
      <div style={styles.container}>
        <div style={styles.vendingArea}>
          <div style={{ padding: 10, textAlign: 'right' }}>
            <button onClick={onGoToSetup}>수량 설정</button>
          </div>
          <div className="vending-machine">
            {availableItems.map((item) => (
                <div key={item.id} className="vending-slot">
                  <img src={item.imageUrl} alt={item.name} style={styles.drinkImage} />
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{item.price.toLocaleString()}원</div>
                  </div>
                  <button
                      className={`select-button ${
                          item.stock <= 0
                              ? 'disabled'
                              : highlightIndex === item.id
                                  ? 'highlight'
                                  : item.price <= cash || card
                                      ? 'highlight-buy'
                                      : ''
                      }`}
                      disabled={item.stock <= 0 || item.price > cash && !card}
                      onClick={() => handleItemSelect(item)}
                      title={item.stock <= 0 ? '매진' : ''}
                  >
                    {item.stock <= 0 ? '매진' : '선택'}
                  </button>
                </div>
            ))}
          </div>
        </div>

        {/* 수정된 중앙 정렬 부분 */}
        <div>
          <div style={styles.sidePanel}>
            <div style={styles.cashDisplay}>{cash.toLocaleString()}원</div>

            <button onClick={() => setShowModal(true)} style={styles.insertButton}>
              💰 현금 투입
            </button>
            {cash > 0 && (
                <button onClick={handleRefund} style={styles.refundButton}>
                  💸 잔돈 반환
                </button>
            )}
            <button
                onClick={() => (card ? setCard(false) : handleCardInsert())}
                style={card ? styles.refundButton : styles.insertButton}
            >
              {card ? '💳 카드 반환' : '💳 카드 투입'}
            </button>

            {message && <div style={styles.message}>{message}</div>}
          </div>
        </div>

        {showModal && (
            <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h3>현금 투입</h3>
                <div style={styles.buttonGroup}>
                  {[100, 500, 1000, 5000, 10000].map((amount) => (
                      <button
                          key={amount}
                          onClick={() => {
                            handleCashInsert(amount);
                            setShowModal(false);
                          }}
                          style={styles.cashOption}
                      >
                        {amount.toLocaleString()}원
                      </button>
                  ))}
                </div>
                <button onClick={() => setShowModal(false)} style={styles.cancelButton}>
                  취소
                </button>
              </div>
            </div>
        )}
      </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const, // 가로로 배치
    alignItems: 'flex-end', // 세로 방향으로 밑단을 맞추기 위해 'flex-end' 사용
    padding: 20,
  },
  vendingArea: {
    flex: 1,
    marginRight: 40,
  },
  // 오른쪽 하단에 위치하게 하는 스타일
  sidePanelContainer: {
    display: 'flex',
    flexDirection: 'column', // 세로로 배치
    justifyContent: 'flex-end', // 세로 하단 맞춤
    alignItems: 'center', // 수평 중앙 정렬
    height: '100%', // 부모 영역에 맞춰서 높이를 100%로 설정
    position: 'relative', // 위치를 부모 기준으로 설정
  },
  sidePanel: {
    width: 200,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 10,
    padding: 10,
    marginRight: 10,
    border: '2px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  cashDisplay: {
    fontSize: '36px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#688',
    letterSpacing: '2px',
    textAlign: 'center' as const,
  },
  message: {
    marginTop: 20,
    fontSize: '18px',
    color: '#e74c3c',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    textAlign: 'center' as const,
    minWidth: 300,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    marginBottom: 20,
  },
  cashOption: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelButton: {
    marginTop: 10,
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#aaa',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  insertButton: {
    fontSize: '16px',
    padding: '12px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.3s ease',
  },
  refundButton: {
    fontSize: '16px',
    padding: '12px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.3s ease',
  },
  drinkImage: {
    width: 100,
    height: 100,
    objectFit: 'contain' as const,
    marginBottom: 8,
  },
};

export default VendingPage;
