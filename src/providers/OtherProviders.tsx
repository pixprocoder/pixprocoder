'use client';
import { createContext, useState } from 'react';

export const TransactionContext = createContext<any>(null);

const OtherProviders = ({ children }: any) => {
  const [transactionId, setTransactionId] = useState('');

  return (
    <TransactionContext.Provider value={{ transactionId, setTransactionId }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default OtherProviders;
