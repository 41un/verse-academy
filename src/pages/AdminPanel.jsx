import React, { useState } from 'react';
import { useWallet } from '../WalletContext'
import { Button, TextField, Container, Typography } from '@mui/material';

const AdminPanel = () => {
    const [userAddress, setUserAddress] = useState('');
    const { registerUser } = useWallet();

    const handleRegisterUser = async () => {
        try {
            if (!userAddress) {
                alert('Please enter a valid address.');
                return;
            }

            const result = await registerUser.send({ args: [userAddress] });
            
            if (result && result.transactionHash) {
                alert('User successfully registered!');
                console.log(result.transactionHash)
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred. Please try again.');
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
        </Container>
    );
};

export default AdminPanel;
