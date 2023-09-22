import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import { WalletProvider } from './WalletContext'; 

const chains = [arbitrum, mainnet, polygon];
const projectId = process.env.REACT_APP_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <WalletProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
          </Routes>
        </Router>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WalletProvider>
    </WagmiConfig>
  );
}

export default App;




