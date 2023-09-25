import React from 'react';
import {Link} from  'react-router-dom';
import { Grid, Typography, Paper, Button, useMediaQuery, useTheme } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import heroImage from '../img/web-assets/1-web@2x.png'

function Hero() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ backgroundColor: '#000000', padding: '80px 40px'}}>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h1" gutterBottom style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>
                        Verse Academy
                    </Typography>
                    <Typography variant="h6"  sx={{color: 'rgba(255, 255, 255, 0.80)', lineHeight: '200%', marginBottom: '32px' }} paragraph>
                        Learn about DeFi with Verse and earn as you discover. A seamless way to navigate the world of decentralized finance.
                    </Typography>
                    {!isMobile && (
                        <Link to={`/courses/1`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large"
                                sx={{ backgroundColor: '#2793FF', borderRadius: '12px' }}
                            >
                                <PaymentsOutlinedIcon sx={{ marginRight: '15px' }} />
                                Start earning
                            </Button>
                        </Link>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={4}
                        sx={{
                            height: 360, 
                            backgroundImage: `url(${heroImage})`, // Set the image background
                            backgroundSize: 'cover', // Ensure the image covers the entire element
                            backgroundPosition: 'center', // Center the image
                            backgroundRepeat: 'no-repeat', // Prevent image from repeating
                            borderRadius: '8px',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {/* Optional: You can retain or remove the play icon depending on your design intentions */}
                        {/* <PlayCircleFilledWhiteIcon style={{ fontSize: 90, cursor: 'pointer' }} /> */}
                    </Paper>
                    {isMobile && (
                        <div style={{ marginTop: 25, textAlign: 'center' }}>
                            <Link to={`/courses/1`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    sx={{ backgroundColor: '#2793FF', borderRadius: '12px' }}
                                >
                                    <PaymentsOutlinedIcon sx={{ marginRight: '15px' }} />
                                    Start earning
                                </Button>
                            </Link>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Hero;
