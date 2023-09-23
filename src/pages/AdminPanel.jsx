import React, { useState } from 'react';
import { useWallet } from '../WalletContext';
import { Button, TextField, Container, Typography } from '@mui/material';

const AdminPanel = () => {
    const [userAddress, setUserAddress] = useState('');
    const [checkAddress, setCheckAddress] = useState('');
    const { registerUserWrite, currentCheckpoint } = useWallet();

    const handleRegisterUser = async () => {
        try {
            if (!userAddress) {
                alert('Please enter a valid address.');
                return;
            }

            const result = await registerUserWrite.write({ args: [userAddress] });

            if (result && result.transactionHash) {
                alert('User successfully registered!');
                console.log(result.transactionHash);
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleCheckAddress = () => {
        if (!checkAddress) {
            alert('Please enter a valid address to check.');
            return;
        }

        const checkpoint = currentCheckpoint.data;

        if (checkpoint > 0) {
            alert(`User ${checkAddress} has a checkpoint of ${checkpoint}.`);
        } else {
            alert(`User ${checkAddress} has no checkpoint.`);
        }
    };


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
        <Button variant="contained" color="primary" onClick={handleRegisterUser}>
            Register User
        </Button>

        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Check a User's Checkpoint
        </Typography>
        <TextField
            fullWidth
            label="Address to Check"
            variant="outlined"
            value={checkAddress}
            onChange={(e) => setCheckAddress(e.target.value)}
            placeholder="Enter Ethereum address to check"
            margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleCheckAddress}>
            Check Address
        </Button>
    </Container>
);
};

export default AdminPanel;