import React, { useState } from 'react';
import VendingPage from './page/VendingPage';
import SetupPage from './page/SetupPage';
import {generateDefaultItems, type ItemVendingStock} from "./item/VendingItems.tsx";


const App: React.FC = () => {

  const [items, setItems] = useState<ItemVendingStock[]>(generateDefaultItems);
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
