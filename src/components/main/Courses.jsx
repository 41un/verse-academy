import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Paper, LinearProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import courses from '../courses';
import coursesImage from '../img/web-assets/2-web@2x.png';
import brainBook from '../img/brain-book/4-web@2x.png';

function Courses() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const displayedCourses = courses.slice(0, 3);

    return (
        <div style={{ padding: isMobile ? '16px' : '80px 40px' }}>
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
                        Explore Our Courses
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: '18px', color: 'rgba(255, 255, 255, 0.80)', lineHeight: '37.44px', marginBottom: '32px' }} paragraph>
                        Dive into a wide range of topics and levels. There's something for everyone, whether you're just starting out or an expert.
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={isMobile ? 2 : 4}>
                {displayedCourses.map((course) => (
                    <Grid item xs={12} sm={4} key={course.id}>
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
                            <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card sx={{ boxShadow: '0 0 10px 2px #2793FF', transition: '0.3s', '&:hover': { boxShadow: '0 0 20px 4px #2793FF' } }}>                                    
                            <CardMedia
                                        component="img"
                                        height="140"
                                        image={brainBook}
                                        alt={course.title}
                                    />
                                    <CardContent sx={{ backgroundColor: '#040B13', color: '#fff' }}>
                                        <Typography variant="h5" align="left" gutterBottom>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body1" align="left" paragraph>
                                            {course.description}
                                        </Typography>
                                        <Grid container justifyContent="left" spacing={1} mb={2}>
                                            <Grid item>
                                                <Chip sx={{ background: 'white' }} label={course.earnings ? course.earnings : "Placeholder earnings"} size="small" variant="outlined" />
                                            </Grid>
                                            <Grid item>
                                                <Chip sx={{ background: 'white' }} label={`${course.lessons.length} videos`} size="small" variant="outlined" />
                                            </Grid>
                                            <Grid item>
                                                <Chip sx={{ background: 'white' }} label={course.difficulty ? course.difficulty : "Placeholder difficulty"} size="small" variant="outlined" />
                                            </Grid>
                                        </Grid>
                                        <Button 
                                            variant="contained" 
                                            sx={{ width: '100%', backgroundColor: '#2793FF'}}
                                        >
                                            Start course
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" sx={{ backgroundColor: '#2793FF'}} > 
                View all
            </Button>
            </div> */}
        </div>
    );
}

export default Courses;
