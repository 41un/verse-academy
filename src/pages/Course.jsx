import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Button, useMediaQuery, useTheme } from '@mui/material';
import courses from '../components/courses';
import imgSource from '../components/img/course-images/1.png'

function Course() {
    const { courseId } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const selectedCourse = courses.find(course => course.id === parseInt(courseId));

    // handle case when course is not found
    if (!selectedCourse) return <div>Course not found</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '40px 40px' }}>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h1" gutterBottom style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>
                        {selectedCourse.title}
                    </Typography>
                    <Typography variant="h6" sx={{color: 'rgba(255, 255, 255, 0.80)', lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '24px' }} paragraph>
                        {selectedCourse.description}
                    </Typography>
                    {!isMobile && (
                        <Link to={`/courses/${courseId}/lessons/1`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large"
                                sx={{ backgroundColor: '#2793FF', borderRadius: '12px' }}
                            >
                                Start course
                            </Button>
                        </Link>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={4}
                        sx={{
                            height: 360, 
                            backgroundImage: `url(${imgSource})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '8px',
                            backgroundColor: 'transparent'
                        }}
                    />
                    {isMobile && (
                        <div style={{ marginTop: 25, textAlign: 'center' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large"
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

export default Course;
