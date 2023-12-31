import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Vimeo from '@u-wave/react-vimeo';
import Confetti from 'react-confetti';
import courses from '../components/courses';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, Typography, CircularProgress, Modal, LinearProgress } from '@mui/material';
import Lottie from "lottie-react";
import successAnimation from '../components/animations/successAnimation.json'
import failAnimation from '../components/animations/failAnimation.json'
import rewardAnimation from '../components/animations/rewardAnimation.json'
import communityAnimation from '../components/animations/communityAnimation.json'
import {
    useAccount,
    useContractWrite,
    useContractRead
} from 'wagmi';
import VERSE_LEARN_ABI from '../abi/VerseLearnABI.json';

const contractAddress = '0xbFE1f83D7314f284E79AFF4D9d43fc834f5389B2';

function Lesson() {
    const [checkpoint, setCheckpoint] = useState(0);
    const [depositAmount, setDepositAmount] = useState('');  



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
    const [ethClaimed, setEthClaimed] = useState(false);

    // Check if last lesson
    const isLesson5 = parseInt(lessonId, 10) === 5;


    const [showRewardModal, setShowRewardModal] = useState(false);
    

    // Web3 Functions

    const { address } = useAccount({
        onConnect: ({ address, connector, isReconnected }) => {
            console.log('Connected', { address, connector, isReconnected });
        },
        onDisconnect: () => {
            console.log('Disconnected');
        }
    });

    // Current User Checkpoint
    const { data: readData, isLoading: isReading } = useContractRead({
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
            if (checkpoint < parseInt(lessonId, 10)) {
                saveCheckpoint();
            } else {
                console.log(`User has already incremented checkpoint for lesson ${lessonId}.`);
            }
        }
    };
    

    const handleClaimETH = async () => {
        if (address && !ethClaimed) { 
            try {
                await claimETH();
                setEthClaimed(true); 
            } catch (error) {
                console.error(error);
            }
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

    const handleClaimReward = async () => {
        if (String(checkpoint) >= 5) {
            await claimReward();
            setShowRewardModal(true);  
        } else {
            console.log(`User has only reached ${String(checkpoint)} checkpoints`);
        }
    };

    const course = courses.find(c => c.id === parseInt(courseId, 10));
    const lesson = course?.lessons.find(l => l.id === parseInt(lessonId, 10));

    const totalLessons = course.lessons.length;
    const userProgress = (checkpoint / totalLessons) * 100;



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

    const isRewardButtonEnabled = userProgress >= 100;
    
    

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
            <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '800px', color: 'white', backgroundColor: 'rgba(4, 12, 21, 0.7)', boxShadow: '0 0 10px 5px rgba(39, 147, 255, 0.2)' }}>            
                <div style={{ position: 'relative', marginBottom: '30px' }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={userProgress} 
                        style={{ marginBottom: '20px', padding: '10px', borderRadius: '7px' }}
                        sx={{ '& .MuiLinearProgress-barColorPrimary': { backgroundColor: '#2793FF' }}} 
                    />
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#2793FF', 
                            position: 'absolute', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            right: 0 
                        }}
                        onClick={handleClaimReward}
                        disabled={!isRewardButtonEnabled}
                    >
                        Claim Reward
                    </Button>
                </div>
                <Modal
                    open={showRewardModal}
                    onClose={() => setShowRewardModal(false)}
                    aria-labelledby="reward-modal-title"
                    aria-describedby="reward-modal-description"
                >
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Lottie 
                                animationData={rewardAnimation} 
                                loop={false}
                                style={{ width: lottieSize.width, height: lottieSize.height }}                            />
                            <Typography variant="h4" style={{ color: 'green' }}>
                                Congratulations!
                            </Typography>
                            <Typography variant="h6" style={{ color: 'black', marginBottom: '20px' }}>
                                You've claimed 15,000 VERSE!
                            </Typography>
                            <Typography variant="p" style={{ color: 'black', marginBottom: '20px' }}>
                                Confirm the transaction on your wallet to receive your reward
                            </Typography>
                            <Button variant="contained" size="large" sx={{ backgroundColor: '#2793FF', borderRadius: '12px' }} onClick={() => setShowRewardModal(false)} > Return to course </Button>
                        </div>
                    </div>
                </Modal>
                <Typography variant="h4">{lesson.title}</Typography>
                <Typography variant="body1" paragraph>{lesson.description}</Typography>
                <div style={{ flexBasis: '50%', overflow: 'hidden', width: '100%', position: 'relative', marginBottom: '60px' }}>
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
                {parseInt(lessonId, 10) === 2 && (
                    <Button 
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                        onClick={handleClaimETH}
                        disabled={ethClaimed} 
                    >
                        {ethClaimed ? "You've claimed your Gas" : "Claim Gas"}
                    </Button>
                    )}
                <div>
                    {lesson.quiz.map((q, index) => (
                <div 
                    key={index} 
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        margin: '5px 0'
                    }}
                >
        <Typography sx={{ fontWeight: '700' }} variant="h6" gutterBottom>{q.question}</Typography>
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
            control={
                <Radio 
                    sx={{
                        '&.Mui-checked': {
                            color: submittedAnswers && submittedAnswers[index] === q.correctAnswer ? 'lightgreen' : 
                                submittedAnswers && submittedAnswers[index] !== q.correctAnswer ? 'coral' : '#2793FF',
                        },
                        '&.MuiRadio-root': {
                            color: submittedAnswers && submittedAnswers[index] === q.correctAnswer ? 'lightgreen' : 
                                submittedAnswers && submittedAnswers[index] !== q.correctAnswer ? 'coral' : '#2793FF',
                        },
                    }}
                />
            }
            label={option}
        />
    ))}
</RadioGroup>

        </FormControl>
    </div>
))}
                <Button 
                    variant="contained"
                    sx={{ 
                        padding: '5px',
                        backgroundColor: '#2793FF',
                        borderRadius: '12px',
                        margin: '20px 0', 
                        width: '100%', 
                        '&:disabled': {
                            backgroundColor: 'transparent', 
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'rgba(255, 255, 255, 0.7)' 
                        }
                    }}
                    onClick={isLesson5 ? () => setShowModal(true) : handleSubmit}
                    disabled={isLesson5 ? false : (!isAllAnswered || !address)}
                >
                    {isLesson5 ? "Join community" : (isAllAnswered && !address ? "Connect your wallet" : "Submit Answers")}
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
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', color: 'black' }}>
        {isLesson5 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Congratulations!</h1>
                <Lottie 
                    animationData={communityAnimation} 
                    loop={false}
                    style={{ width: '300px', height: '300px', marginBottom: '20px' }}
                />
                <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Join thousands of people in our vibrant and passionate community!
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ backgroundColor: '#2793FF', borderRadius: '12px', marginRight: '12px' }}
                        onClick={() => window.open('https://t.me/GetVerse', '_blank')}
                    >
                        Telegram
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ backgroundColor: '#2793FF', borderRadius: '12px' }}
                        onClick={() => window.open('hhttps://discord.gg/7yHF65s7Z2', '_blank')}
                    >
                        Discord
                    </Button>
                </div>
            </div>
        ) : (
                        correctCount === lesson.quiz.length ? (
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
                                
                                <Lottie 
                                    animationData={failAnimation} 
                                    loop={false}
                                    style={{ width: lottieSize.width, height: lottieSize.height, marginBottom: '20px' }}  // Adjust the width and height as needed
                                />

                                <Typography>
                                    You got {correctCount} out of {lesson.quiz.length} questions correct.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    sx={{ backgroundColor: '#2793FF', borderRadius: '12px', marginTop: '20px' }} 
                                    onClick={() => setShowModal(false)}
                                >
                                    Try Again
                                </Button>
                            </div>

                        )
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Lesson;