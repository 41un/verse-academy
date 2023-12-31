import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { infuraProvider } from 'wagmi/providers/infura';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import { WalletProvider } from './WalletContext'; 
import AdminPanel from './pages/AdminPanel';

const chains = [goerli];
const projectId = '0f544cde3fa9f5283db4ebf52e37fe7f';

const { publicClient } = configureChains(
    chains, 
    [
        infuraProvider(
            {
                apiKey: 'b5cade57b5984317bf3ee8b17f841b4e'
            }
        ),
        // alchemyProvider(
        // {
        // apiKey: ALCHEMY_API_KEY
        // }
        // ),
        // publicProvider()
    ],
);
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
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Router>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WalletProvider>
    </WagmiConfig>
  );
}

export default App;






