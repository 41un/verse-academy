// Import necessary libraries
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnectProvider } from '@web3modal/wagmi';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";

const projectId = process.env.REACT_APP_PROJECT_ID;

const { chains, publicClient } = configureChains([mainnet], [walletConnectProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ options: { projectId, showQrModal: false } }),
    new InjectedConnector({ options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ options: { appName: 'Web3Modal' } })
  ],
  publicClient
});

// Initialize the Web3Modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
        </Routes>
      </Router>
    </WagmiConfig>
  );
}

export default App;
