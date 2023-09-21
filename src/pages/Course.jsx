import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Paper, Button } from '@mui/material';
import courses from '../components/courses';

function Course() {
    // Get course ID from URL params
    const { courseId } = useParams();
    
    // For programmatic navigation
    const navigate = useNavigate();

    // Find the specific course
    const course = courses.find(c => c.id === parseInt(courseId, 10));

    // Return null if course not found
    if (!course) return <Typography variant="h5">Course not found</Typography>;

    const startCourse = () => {
        // Navigate to the first lesson of the course
        navigate(`/courses/${courseId}/lessons/${course.lessons[0].id}`);
    };

    return (
        <div style={{ padding: '40px' }}>
            <Typography variant="h3" align="center" gutterBottom>
                {course.title}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" paragraph sx={{ marginBottom: '60px' }}>
                {course.description}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={course.imgSrc ? course.imgSrc : "/path/to/placeholder-image.jpg"}
                                alt={course.title}
                            />
                            <CardContent>
                                <Typography variant="h5" align="left" gutterBottom>
                                    Course Content
                                </Typography>

                                {course.lessons.map((lesson) => (
                                    <div key={lesson.id}>
                                        <Typography variant="h6">
                                            {lesson.title}
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            {lesson.description}
                                        </Typography>
                                    </div>
                                ))}

                                {/* Start Course Button */}
                                <Button variant="contained" color="primary" onClick={startCourse}>
                                    Start Course
                                </Button>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Course;
