import { useState, useEffect } from 'react';
import {
    useAccount,
    useContractWrite,
    useContractRead
} from 'wagmi';
import { waitForTransaction } from '@wagmi/core';
import { Button, TextField, Container, Typography } from '@mui/material';
import VERSE_LEARN_ABI from '../abi/VerseLearnABI.json';

const contractAddress = '0xbFE1f83D7314f284E79AFF4D9d43fc834f5389B2';

function AdminPanel() {
    const [userToRegister, setUserToRegister] = useState(''); 
    const [shouldRead, setShouldRead] = useState(false);
    const [checkpoint, setCheckpoint] = useState(0);
    const [depositAmount, setDepositAmount] = useState(''); 

    const { address, isConnecting, isDisconnected } = useAccount({
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
        args: [address]
    });

    // Current User Checkpoint
    const { data: readData, isError, isLoading: isReading } = useContractRead({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'currentCheckPoint',
        args: [address]
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

    const handleRegisterUser = async () => {
        try {
            if (!userToRegister) {
                console.log("Please provide an address to register.");
                return;
            }
            console.log("Calling registerUser...");
            const response = await write({ args: [userToRegister] }); 
            console.log("Response from registerUser:", response);
    
            if (response && response.hash) {
                console.log("Waiting for transaction to complete...");
                const data = await waitForTransaction({ hash: response.hash });
                console.log("Response from waitForTransaction:", writeData);
                
                if (data) {
                    console.log("User registered successfully!");
                } else {
                    console.error("No data received after waiting for transaction.");
                }
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };
    

    useEffect(() => {
        if (readData) {
            setCheckpoint(Number(readData));
        }
    }, [readData]);

    const handleIncrementCheckpoint = async () => {
        try {
            console.log("Calling saveCheckpoint...");
            const response = await saveCheckpoint();
            console.log("Response from saveCheckpoint:", response);
            
            if (response && response.hash) {
                console.log("Waiting for transaction to complete...");
                const data = await waitForTransaction({ hash: response.hash });
                console.log("Response from waitForTransaction:", data);
                
                if (data) {
                    setCheckpoint(prevCheckpoint => prevCheckpoint + 1);
                    console.log("Checkpoint incremented successfully!");
                } else {
                    console.error("No data received after waiting for transaction.");
                }
            } else {
                console.error("No transaction hash received from saveCheckpoint.");
            }
        } catch (error) {
            console.error("Error incrementing checkpoint:", error);
        }
    };
    
    

    const handleClaimETH = () => {
        claimETH();
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
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Register a New User Address
            </Typography>
            <TextField
                fullWidth
                label="User Address"
                variant="outlined"
                value={userToRegister}
                onChange={(e) => setUserToRegister(e.target.value)}
                placeholder="Enter address to register"
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleRegisterUser}>
                Register User
            </Button>


            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Check a User's Checkpoint for address: {address}
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => setShouldRead(true)}>
                Check Address
            </Button>
            {isReading && <div>Loading checkpoint...</div>}
            {readData && <div>Checkpoint: {String(readData)}</div>}

            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Increment Checkpoint for {address}
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
