import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import courses from '../components/courses';

function AllCourses() {
    return (
        <div style={{ padding: '40px' }}>
            <Typography variant="h3" align="center" gutterBottom>
                All Courses
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" paragraph sx={{ marginBottom: '60px' }}>
                Browse all available courses below:
            </Typography>

            <Grid container spacing={4}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={4} md={3} key={course.id}>
                        <Paper
                            elevation={3}
                            sx={{
                                transition: '0.3s',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.imgSrc ? course.imgSrc : "/path/to/placeholder-image.jpg"}
                                        alt={course.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" align="left" gutterBottom>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" align="left" paragraph>
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AllCourses;
