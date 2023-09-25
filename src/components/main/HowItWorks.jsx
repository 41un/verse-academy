import React from 'react';
import { Grid, Typography, Box, Paper, Button, useMediaQuery, useTheme } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz'; // This is a placeholder, MUI might not have an icon named 'QuizIcon'. Please replace with an appropriate one.
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import coursesImage from '../img/web-assets/3-web@2x.png';



function HowItWorks() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
<Grid container spacing={6} alignItems="center" sx={{ marginBottom: '60px' }}>
                {!isMobile && (
                    <Grid item md={6}>
                        <Paper 
                            elevation={4}
                            sx={{
                                height: 460, // Increased the height for a taller section
                                backgroundImage: `url(${coursesImage})`,
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center', 
                                backgroundRepeat: 'no-repeat', 
                                borderRadius: '8px',
                                backgroundColor: 'transparent'
                            }}
                        ></Paper>
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>
                        How it works
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: '18px', color: 'rgba(255, 255, 255, 0.80)', lineHeight: '37.44px', marginBottom: '32px' }} paragraph>
                    Dive into a wide range of topics and levels. There's something for everyone, whether you're just starting out or an expert.
                    </Typography>
                </Grid>
            </Grid>

            <Box style={{ padding: '60px 40px'}}>

            <Grid container spacing={6} justifyContent="center">
                {/* Step 1 */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <PlayCircleOutlineIcon style={{ fontSize: 120, marginBottom: '40px', color: '#2793FF' }} />
                    <Typography variant="h5" gutterBottom>
                        Watch & Learn
                    </Typography>
                    <Typography variant="body1">
                        Begin by watching our detailed tutorials on DeFi.
                    </Typography>
                </Grid>

                {/* Step 2 */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <QuizIcon style={{ fontSize: 120, marginBottom: '40px', color: '#2793FF' }} />
                    <Typography variant="h5" gutterBottom>
                        Complete Challenges
                    </Typography>
                    <Typography variant="body1">
                        Test your understanding by completing challenges.
                    </Typography>
                </Grid>

                {/* Step 3 */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <MonetizationOnIcon style={{ fontSize: 120, marginBottom: '40px', color: '#2793FF' }} />
                    <Typography variant="h5" gutterBottom>
                        Earn Rewards
                    </Typography>
                    <Typography variant="body1">
                        Successfully completed challenges earn you rewards!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        
        
        </>
    );
}

export default HowItWorks;
