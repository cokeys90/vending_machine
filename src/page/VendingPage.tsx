// 기존 import 유지
import React, {useEffect, useRef, useState} from 'react';
import type {ItemStock} from '../App';
import '../App.css';

interface Props {
  items: ItemStock[];
  onGoToSetup: () => void;
}

const VendingPage: React.FC<Props> = ({items, onGoToSetup}) => {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [cash, setCash] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  // 랜덤 하이라이트 interval 참조용
  const highlightIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (cash > 0) {
      setHighlightIndex(null); // 하이라이트도 제거
      return
    };

    const interval = setInterval(() => {
      const inStockItems = items.filter(item => item.stock > 0);
      const randomItem = inStockItems[Math.floor(Math.random() * inStockItems.length)];
      setHighlightIndex(randomItem?.id ?? null);
    }, 1000);
    return () => clearInterval(interval);
  }, [items, cash]);

  const handleCashInsert = (amount: number) => {
    setCash(prev => {
      const nextCash = prev + amount;

      // 현금 투입 시 랜덤 하이라이트 종료
      if (nextCash > 0 && highlightIntervalRef.current) {
        clearInterval(highlightIntervalRef.current);
        highlightIntervalRef.current = null;
        setHighlightIndex(null); // 하이라이트도 제거
      }

      return nextCash;
    });
  };


  return (
      <div style={styles.container}>
        {/* 음료 자판기 영역 */}
        <div style={styles.vendingArea}>
          <div style={{padding: 10, textAlign: 'right'}}>
            <button onClick={onGoToSetup}>수량 설정</button>
          </div>
          <div className="vending-machine">
            {items.map((item) => (
                <div key={item.id} className="vending-slot">
                  <img src={item.imageUrl} alt={item.name} style={styles.drinkImage}/>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{item.price.toLocaleString()}원</div>
                  </div>
                  <button
                      className={`select-button ${
                          item.stock <= 0 ? 'disabled'
                              : highlightIndex === item.id ? 'highlight'
                                  : item.price <= cash ? 'highlight-buy'
                                      : ''
                      }`}
                      disabled={item.stock <= 0 || item.price > cash}
                  >
                    선택
                  </button>
                </div>
            ))}
          </div>
        </div>

        {/* 우측 현금 투입 영역 */}
        <div style={styles.sidePanel}>
          <div style={styles.cashDisplay}>
            {cash.toLocaleString()}원
          </div>
          <button onClick={() => setShowModal(true)} style={styles.insertButton}>
            💰 현금 투입
          </button>

          {/* 잔돈 반환 버튼 */}
          {cash > 0 && (
              <button
                  onClick={() => setCash(0)}
                  style={styles.refundButton}
              >
                💸 잔돈 반환
              </button>
          )}
        </div>


        {/* 모달 */}
        {showModal && (
            <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                <h3>현금 투입</h3>
                <div style={styles.buttonGroup}>
                  {[100, 500, 1000, 5000, 10000].map(amount => (
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
                <button onClick={() => setShowModal(false)} style={styles.cancelButton}>취소</button>
              </div>
            </div>
        )}
      </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'flex-start',
    padding: 20,
  },
  vendingArea: {
    flex: 1,
    marginRight: 40,
  },
  sidePanel: {
    width: 200,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 20,
    padding: 10,
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
  cashButtonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120, // 버튼 2개 높이 고정
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
