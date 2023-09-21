import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Paper, LinearProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import courses from '../courses';

function Courses() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const displayedCourses = courses.slice(0, 3);

    return (
        <div style={{ padding: isMobile ? '16px' : '40px' }}>
            <Typography variant="h3" align="center" gutterBottom>
                Explore Our Courses
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" paragraph sx={{ marginBottom: '60px' }}>
                Dive into a wide range of topics and levels. There's something for everyone, whether you're just starting out or an expert.
            </Typography>

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
                                        <Typography variant="body1" align="left" paragraph>
                                            {course.description}
                                        </Typography>
                                        <Grid container justifyContent="left" spacing={1} mb={2}>
                                            <Grid item>
                                                <Chip label={course.earnings ? course.earnings : "Placeholder earnings"} size="small" variant="outlined" />
                                            </Grid>
                                            <Grid item>
                                                <Chip label={`${course.lessons.length} videos`} size="small" variant="outlined" />
                                            </Grid>
                                            <Grid item>
                                                <Chip label={course.difficulty ? course.difficulty : "Placeholder difficulty"} size="small" variant="outlined" />
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
                            </Link>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" component={Link} to="/courses/">
                    View All
                </Button>
            </div>
        </div>
    );
}

export default Courses;
