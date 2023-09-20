import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz'; // This is a placeholder, MUI might not have an icon named 'QuizIcon'. Please replace with an appropriate one.
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function HowItWorks() {
    return (
        <Box style={{ padding: '60px 40px', background: '#f9f9f9' }}>
            <Typography variant="h3" align="center" gutterBottom>
                How It Works
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Discover the process in three simple steps.
            </Typography>

            <Grid container spacing={6} justifyContent="center">
                {/* Step 1 */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <PlayCircleOutlineIcon style={{ fontSize: 60, color: '#333' }} />
                    <Typography variant="h5" gutterBottom>
                        Watch & Learn
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Begin by watching our detailed tutorials on DeFi.
                    </Typography>
                </Grid>

                {/* Step 2 */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <QuizIcon style={{ fontSize: 60, color: '#333' }} />
                    <Typography variant="h5" gutterBottom>
                        Complete Challenges
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Test your understanding by completing challenges.
                    </Typography>
                </Grid>

                {/* Step 3 */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <MonetizationOnIcon style={{ fontSize: 60, color: '#333' }} />
                    <Typography variant="h5" gutterBottom>
                        Earn Rewards
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Successfully completed challenges earn you rewards!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HowItWorks;
