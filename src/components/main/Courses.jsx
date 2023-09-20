import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Paper, LinearProgress, Chip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Courses() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const courses = [
        {
            title: "Beginner",
            description: "What is DeFi?",
            imgSrc: '/path/to/beginner-course-image.jpg',
            earnings: "Earn $5",
            videoCount: "5 videos",
            difficulty: "Easy"
        },
        {
            title: "Intermediate",
            description: "DEX, NFTs, and Burns",
            imgSrc: '/path/to/intermediate-course-image.jpg',
            earnings: "Earn $10",
            videoCount: "8 videos",
            difficulty: "Medium"
        },
        {
            title: "Advanced",
            description: "Liquidity Pools and Staking",
            imgSrc: '/path/to/advanced-course-image.jpg',
            earnings: "Earn $15",
            videoCount: "10 videos",
            difficulty: "Advanced"
        }
    ];

    return (
        <div style={{ padding: isMobile ? '16px' : '40px' }}>
            <Typography variant="h3" align="center" gutterBottom>
                Explore Our Courses
            </Typography>
            <Typography variant="p" align="center" color="textSecondary" paragraph sx={{ marginBottom: '60px' }}>
                Dive into a wide range of topics and levels. There's something for everyone, whether you're just starting out or an expert.
            </Typography>

            <Grid container spacing={isMobile ? 2 : 4}>
                {courses.map((course, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                transition: '0.3s',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: theme.shadows[6]
                                }
                            }}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={course.imgSrc}
                                    alt={course.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" align="left" gutterBottom>
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body1" align="left" paragraph>
                                        {course.description}
                                    </Typography>
                                    <Grid container justifyContent="left" spacing={1} mb={2}>
                                        <Grid item>
                                            <Chip label={course.earnings} size="small" variant="outlined" />
                                        </Grid>
                                        <Grid item>
                                            <Chip label={course.videoCount} size="small" variant="outlined" />
                                        </Grid>
                                        <Grid item>
                                            <Chip label={course.difficulty} size="small" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="caption" display="block" align="center" gutterBottom>
                                        Progress
                                    </Typography>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={0} 
                                        sx={{
                                            height: '8px',
                                            borderRadius: '4px',
                                            bgcolor: theme.palette.grey[300],
                                            mb: 1
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Courses;
