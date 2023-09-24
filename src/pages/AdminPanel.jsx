import { useState, useEffect } from 'react';
import {
    useAccount,
    useContractWrite,
    useContractRead
} from 'wagmi';
import { Button, TextField, Container, Typography } from '@mui/material';
import VERSE_LEARN_ABI from '../abi/VerseLearnABI.json';

const contractAddress = '0xbFE1f83D7314f284E79AFF4D9d43fc834f5389B2';

function AdminPanel() {
    const [userAddress, setUserAddress] = useState('');
    const [shouldRead, setShouldRead] = useState(false);
    const [checkpoint, setCheckpoint] = useState(0);
    const [depositAmount, setDepositAmount] = useState('');  // Amount of ETH to deposit

    const { isConnecting, isDisconnected } = useAccount({
        onConnect: ({ address, connector, isReconnected }) => {
            console.log('Connected', { address, connector, isReconnected });
        },
        onDisconnect: () => {
            console.log('Disconnected');
        }
    });

    // Register user
    const { data: writeData, isLoading, isSuccess, write } = useContractWrite({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'registerUser',
        args: [userAddress]
    });

    const isValidAddress = userAddress.length === 42;

    // Current User Checkpoint
    const { data: readData, isError, isLoading: isReading } = useContractRead({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'currentCheckPoint',
        args: isValidAddress ? [userAddress] : []
    });

    // Add a checkpoint
    const { write: saveCheckpoint } = useContractWrite({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'checkpointSave',
        args: [checkpoint + 1]
    });

    // Claim from Faucet
    const { write: claimETH } = useContractWrite({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'claimETH'
    });

    // Hook for depositETH function
    const { write: depositETH, isLoading: isDepositing } = useContractWrite({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'depositETH',
        args: [],
        value: depositAmount
    });

    useEffect(() => {
        if (readData) {
            setCheckpoint(Number(readData));
        }
    }, [readData]);

    const handleIncrementCheckpoint = () => {
        if (isValidAddress) {
            saveCheckpoint();
        }
    };

    const handleClaimETH = () => {
        if (isValidAddress) {
            claimETH();
        }
    };

    const handleDepositETH = () => {
        if (parseFloat(depositAmount) > 0) {
            depositETH();
        } else {
            console.log('Invalid deposit amount');
        }
    };

    // User claims VERSE reward
    const { write: claimReward, isLoading: isClaiming, isSuccess: rewardSuccess } = useContractWrite({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'receiveReward',
        args: [],
        value: depositAmount
    });

    const handleClaimReward = () => {
        if (String(checkpoint) >= 5) {
            claimReward();
        } else {
            console.log(`User has only reached ${String(checkpoint)} checkpoints`);
        }
    };


    if (isConnecting) return <div>Connecting…</div>;
    if (isDisconnected) return <div>Disconnected</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>

            <Typography variant="h6" gutterBottom>
                Register a User
            </Typography>
            <TextField
                fullWidth
                label="User Address"
                variant="outlined"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Enter Ethereum address"
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={() => write()}>
                Register User
            </Button>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(writeData)}</div>}

            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Check a User's Checkpoint for address: {userAddress}
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => setShouldRead(true)}>
                Check Address
            </Button>
            {isReading && <div>Loading checkpoint...</div>}
            {readData && <div>Checkpoint: {String(readData)}</div>}

            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Increment Checkpoint for {userAddress}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleIncrementCheckpoint}>
                Increase Checkpoint by +1
            </Button>
            <Button variant="contained" color="primary" onClick={handleClaimETH}>
                Claim ETH
            </Button>

            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Deposit ETH
            </Typography>
            <TextField
                fullWidth
                label="Amount (ETH)"
                variant="outlined"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount of ETH"
                margin="normal"
                type="number"
            />
            <Button variant="contained" color="primary" onClick={handleDepositETH}>
                Deposit ETH to Contract
            </Button>
            {isDepositing && <div>Depositing...</div>}

            <Button sx={{marginTop: '20px'}} variant="contained" color="primary" onClick={handleClaimReward}>
                Claim Reward
            </Button>
            {isClaiming && <div>Claiming...</div>}
            {rewardSuccess && <div>Transaction: {JSON.stringify(claimReward)}</div>}
        </Container>
    );
}

export default AdminPanel;