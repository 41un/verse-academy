import { useState, useEffect } from 'react';
import {
    useAccount,
    useContractWrite,
    useContractRead
} from 'wagmi';
import { Button, TextField, Container, Typography } from '@mui/material';
import VERSE_LEARN_ABI from '../abi/VerseLearnABI.json';

const contractAddress = '0xbFE1f83D7314f284E79AFF4D9d43fc834f5389B2';

function AdminPanel () {
    const [userAddress, setUserAddress] = useState('');
    const [shouldRead, setShouldRead] = useState(false);

    const { isConnecting, isDisconnected } = useAccount({
        onConnect: ({ address, connector, isReconnected }) => {
            console.log('Connected', { address, connector, isReconnected });
        },
        onDisconnect: () => {
            console.log('Disconnected');
        }
    });

    const { data: writeData, isLoading, isSuccess, write } = useContractWrite({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'registerUser',
        args: [userAddress]
    });

    const isValidAddress = userAddress.length === 42;

    const { data: readData, isError, isLoading: isReading } = useContractRead({
        address: contractAddress,
        abi: VERSE_LEARN_ABI,
        functionName: 'currentCheckPoint',
        args: isValidAddress ? [userAddress] : []
    });

    console.log(Number(readData));

    useEffect(() => {
        if (isReading || isError || readData) {
            setShouldRead(false);
        }
    }, [isReading, isError, readData]);

    const handleCheckAddress = () => {
        if (isValidAddress) {
            setShouldRead(true);
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
            <Button variant="contained" color="secondary" onClick={handleCheckAddress}>
                Check Address
            </Button>
            {isReading && <div>Loading checkpoint...</div>}
            {readData && <div>Checkpoint: {String(readData)}</div>}
        </Container>
    );
};

export default AdminPanel;
