import React from 'react';
import { Grid, Typography, Paper, Button, useMediaQuery, useTheme } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

function Hero() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ padding: '80px 40px', background: '#f4f4f4' }}>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h1" gutterBottom style={{ fontSize: '2.5rem' }}>
                        Verse Academy
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Learn about DeFi with Verse and earn as you discover. A seamless way to navigate the world of decentralized finance.
                    </Typography>
                    {!isMobile && (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            // Add an onClick handler or a link here if needed
                        >
                            <PaymentsOutlinedIcon sx={{ marginRight: '15px' }} />
                            Start earning
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={4}
                        sx={{
                            height: 360, // Moderately sized placeholder
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            backgroundColor: '#ddd', // Placeholder background color
                            borderRadius: '8px'
                        }}
                    >
                        <PlayCircleFilledWhiteIcon style={{ fontSize: 90, cursor: 'pointer' }} /> 
                        {/* Moderately sized icon */}
                    </Paper>
                    {isMobile && (
                        <div style={{ marginTop: 25, textAlign: 'center' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large"
                                // Add an onClick handler or a link here if needed
                            >
                                Start earning
                            </Button>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Hero;
