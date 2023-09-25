    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { useParams } from 'react-router-dom';
    import Vimeo from '@u-wave/react-vimeo';
    import Confetti from 'react-confetti';
    import courses from '../components/courses';
    import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, Typography, CircularProgress, Modal } from '@mui/material';
    import Lottie from "lottie-react";
    import successAnimation from '../components/animations/successAnimation.json'
    import {
        useAccount,
        useContractWrite,
        useContractRead
    } from 'wagmi';
    import { waitForTransaction } from '@wagmi/core';
    import VERSE_LEARN_ABI from '../abi/VerseLearnABI.json';

    const contractAddress = '0xbFE1f83D7314f284E79AFF4D9d43fc834f5389B2';

    function Lesson() {
        const [checkpoint, setCheckpoint] = useState(0);
        const [depositAmount, setDepositAmount] = useState('');  // Amount of ETH to deposit



        const { courseId, lessonId } = useParams();
        const [isLoadingVideo, setIsLoadingVideo] = useState(true);
        const [answers, setAnswers] = useState({});
        const [correctCount, setCorrectCount] = useState(0);
        // const [isLoading, setIsLoading] = useState(true);
        const [showConfetti, setShowConfetti] = useState(false);
        const [isAllAnswered, setIsAllAnswered] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const [dimensions, setDimensions] = useState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        const [progress, setProgress] = useState(0);
        const [showNextButton, setShowNextButton] = useState(false);
        const [submittedAnswers, setSubmittedAnswers] = useState(null);
        const [lottieSize, setLottieSize] = useState({ width: 400, height: 400 });

        // Web3 Functions

        const { address, isConnecting, isDisconnected } = useAccount({
            onConnect: ({ address, connector, isReconnected }) => {
                console.log('Connected', { address, connector, isReconnected });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            }
        });

        // Current User Checkpoint
        const { data: readData, isError, isLoading: isReading } = useContractRead({
            address: contractAddress,
            abi: VERSE_LEARN_ABI,
            functionName: 'currentCheckPoint',
            args: [address]
        });

        // Add a checkpoint
        const { write: saveCheckpoint } = useContractWrite({
            address: contractAddress,
            abi: VERSE_LEARN_ABI,
            functionName: 'checkpointSave',
            args: [checkpoint + 1]
        });

        // Claim from Faucet
        const { write: claimETH } = useContractWrite({
            address: contractAddress,
            abi: VERSE_LEARN_ABI,
            functionName: 'claimETH'
        });

        useEffect(() => {
            if (readData) {
                setCheckpoint(Number(readData));
            }
        }, [readData]);
        


        useEffect(() => {
            if (readData) {
                setCheckpoint(Number(readData));
            }
        }, [readData]);

        const handleIncrementCheckpoint = () => {
            if (address) {
                // Increment the checkpoint only if it's less than the current lessonId.
                // Note: This assumes that lessons are taken in sequence (i.e., a user can't skip from lesson 1 to lesson 3 without taking lesson 2).
                if (checkpoint < parseInt(lessonId, 10)) {
                    saveCheckpoint();
                } else {
                    console.log(`User has already incremented checkpoint for lesson ${lessonId}.`);
                }
            }
        };
        

        const handleClaimETH = () => {
            if (address) {
                claimETH();
            }
        };


        // User claims VERSE reward
        const { write: claimReward, isLoading: isClaiming, isSuccess: rewardSuccess } = useContractWrite({
            address: contractAddress,
            abi: VERSE_LEARN_ABI,
            functionName: 'receiveReward',
            args: [],
            value: depositAmount
        });

        const handleClaimReward = () => {
            if (String(checkpoint) >= 5) {
                claimReward();
            } else {
                console.log(`User has only reached ${String(checkpoint)} checkpoints`);
            }
        };

        const course = courses.find(c => c.id === parseInt(courseId, 10));
        const lesson = course?.lessons.find(l => l.id === parseInt(lessonId, 10));


        useEffect(() => {
            let progressTimer;
            const targetProgress = correctCount === lesson.quiz.length ? 100 : ((correctCount / lesson.quiz.length) * 100);
            
            progressTimer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= targetProgress) {
                        clearInterval(progressTimer);
                        if (correctCount === lesson.quiz.length) {
                            setShowNextButton(true);
                        }
                        return targetProgress;
                    }
                    return Math.min(prevProgress + 3, targetProgress);
                });
            }, 75);
        
            return () => {
                clearInterval(progressTimer);
            };
        }, [correctCount, lesson.quiz.length, showNextButton]);
        
        

        useEffect(() => {
            const handleResize = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        useEffect(() => {
            const handleResize = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
        
                if(window.innerWidth < 768) {
                    setLottieSize({ width: 200, height: 200 }); 
                } else {
                    setLottieSize({ width: 400, height: 400 });
                }
            };
        
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        

        const handleOptionChange = (questionIndex, event) => {
            setAnswers(prev => {
                const updatedAnswers = {
                    ...prev,
                    [questionIndex]: event.target.value
                };
                setIsAllAnswered(Object.keys(updatedAnswers).length === lesson.quiz.length);
                return updatedAnswers;
            });
        };

        const handleSubmit = () => {
            let count = 0;
            lesson.quiz.forEach((q, index) => {
                if (answers[index] === q.correctAnswer) {
                    count++;
                }
            });
        
            setCorrectCount(count);
            setSubmittedAnswers(answers);
        
            if (count === lesson.quiz.length) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
                handleIncrementCheckpoint(); 
            }
        
            setShowModal(true);
        };
        

        const modalStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'slideIn 0.5s forwards',
        };

        const nextLessonId = lesson.id + 1;
        const nextLessonExists = course.lessons.some(l => l.id === nextLessonId);
        const nextLesson = course.lessons.find(l => l.id === nextLessonId);


        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', padding: '20px' }}>
                {showConfetti && (
                    <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={1000} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }} />
                )}
                <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '800px' }}>
                    <Typography variant="h4">{lesson.title}</Typography>
                    <Typography variant="body1" paragraph>{lesson.description}</Typography>
                    <div style={{ flexBasis: '50%', overflow: 'hidden', width: '100%', position: 'relative' }}>
                        {isLoadingVideo && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <CircularProgress />
                            </div>
                        )}
                        <Vimeo 
                            video={lesson.vimeoId.toString()}
                            autoplay
                            responsive={true}
                            title={false}
                            byline={false}
                            portrait={false}
                            onReady={() => setIsLoadingVideo(false)}
                            onStart={() => setIsLoadingVideo(false)}
                        />
                    </div>
                    {parseInt(lessonId, 10) === 1 && (
                            <Button 
                                variant="contained"
                                color="secondary"
                                sx={{ marginTop: '10px', marginBottom: '20px' }}
                                onClick={handleClaimETH}
                            >
                                Claim ETH from Faucet
                            </Button>
                        )}
                    <div>
                        <Typography variant="h5" gutterBottom>Quiz</Typography>
                        {lesson.quiz.map((q, index) => (
                            <div 
                                key={index} 
                                style={{
                                    backgroundColor: submittedAnswers && submittedAnswers[index] === q.correctAnswer ? 'lightgreen' : 
                                                    submittedAnswers && submittedAnswers[index] !== q.correctAnswer ? 'lightcoral' : 'transparent',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    margin: '5px 0'
                                }}
                            >
                                <Typography variant="h6" gutterBottom>{q.question}</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label={`q${index}`}
                                        name={`q${index}`}
                                        value={answers[index] || ''}
                                        onChange={(event) => handleOptionChange(index, event)}
                                    >
                                        {q.options.map((option, i) => (
                                            <FormControlLabel 
                                                key={i}
                                                value={option}
                                                control={<Radio color="primary" />}
                                                label={option}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        ))}
                        <Button 
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '40px', width: '100%' }}
                            onClick={handleSubmit}
                            disabled={!isAllAnswered || !address}
                        >
                            {isAllAnswered && !address ? "Connect your wallet" : "Submit Answers"}
                        </Button>
                    </div>
                </Paper>

                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    style={modalStyle}
                >
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
                        {correctCount === lesson.quiz.length ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Lottie 
                                animationData={successAnimation} 
                                loop={false}
                                style={{ width: lottieSize.width, height: lottieSize.height }}
                            />
                                <Typography variant="h4" style={{ color: 'green' }}>
                                    100%
                                </Typography>
                                <Typography variant="h6">
                                    Congratulations! You can proceed to {nextLessonExists ? `"${nextLesson?.title}"` : 'the next lesson'}.
                                </Typography>
                                {!showNextButton && <CircularProgress variant="determinate" value={progress} />}
                                {showNextButton && (
                                <Link to={`/courses/${courseId}/lessons/${nextLessonId}`}>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => {
                                            setShowModal(false);
                                            setSubmittedAnswers(null);
                                            setAnswers({});
                                            setCorrectCount(0);
                                            setIsAllAnswered(false);
                                            setShowConfetti(false);
                                            setProgress(0);
                                            setShowNextButton(false);
                                        }}
                                    >
                                        Next Lesson
                                    </Button>
                                </Link>
                            )}

                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography>
                                    You got {correctCount} out of {lesson.quiz.length} questions correct.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    sx={{ marginTop: '20px' }} 
                                    onClick={() => setShowModal(false)}
                                >
                                    Try Again
                                </Button>
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        );
    }

    export default Lesson;