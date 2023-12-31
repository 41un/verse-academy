import React, { createContext, useContext, useState } from 'react';
import VERSE_LEARN_ABI from './abi/VerseLearnABI.json';
import { useContractRead } from 'wagmi';
import { useContractWrite } from 'wagmi';
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


  // Smart contract data
  const contractAddress = "0xbFE1f83D7314f284E79AFF4D9d43fc834f5389B2";
  const contractABI = VERSE_LEARN_ABI;
  const tokenAddress = "0x37d4203fae62ccd7b1a78ef58a5515021ed8fd84"; 

  // Read
  // const currentCheckpoint = useContractRead({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: 'currentCheckPoint',
  //   args: [walletState.account],
  // });

  // const userPasswords = useContractRead({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: 'passwords',
  //   args: [walletState.account],
  // });

  const userHasClaimedETH = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'hasClaimedETH',
    args: [walletState.account],
  });

  const erc20Balance = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getERC20Balance',
  });

  const ethBalance = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getETHBalance',
  });


  // Write
    const registerUserWrite = useContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: 'registerUser',
    });

  const claimETHWrite = useContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: 'claimETH',
    });

  const checkpointSaveWrite = useContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: 'checkpointSave',
    });

  const receiveRewardWrite = useContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: 'receiveReward',
    });


  return (
    <WalletContext.Provider value={{ 
      ...walletState, 
      connectWallet, 
      disconnectWallet,
      // currentCheckpoint: currentCheckpoint,
      // userPasswords: userPasswords,
      userHasClaimedETH: userHasClaimedETH,
      erc20Balance: erc20Balance,
      ethBalance: ethBalance,
      registerUserWrite,
      claimETHWrite,
      checkpointSaveWrite,
      receiveRewardWrite,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
