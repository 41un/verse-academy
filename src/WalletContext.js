import React, { createContext, useContext, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';

const WalletContext = createContext({
  isConnected: false,
  account: null,
  connectWallet: async () => {},
  disconnectWallet: () => {}
});

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    account: null
  });

  const { open, close } = useWeb3Modal();

  const { account } = useAccount({
    onConnect({ address }) {
      console.log('Connected:', address);
      setWalletState({
        isConnected: true,
        account: address
      });
    },
    onDisconnect() {
      console.log('Disconnected');
      setWalletState({
        isConnected: false,
        account: null
      });
    }
  });

  const connectWallet = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnectWallet = () => {
    close();
  };

  return (
    <WalletContext.Provider value={{ ...walletState, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
