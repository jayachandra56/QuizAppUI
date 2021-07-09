import React, { useContext, useEffect, useState } from 'react'
import { QuestionsContext } from '../App'
import QuestionCompo from '../components/QuestionCompo'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { green, red } from '../colors';
import { BASE_URL } from '../constants';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 30,
    },
    timer: {
        fontSize: 18,
        color: green,
    },
    pos: {
        marginBottom: 12,
    },
    successText: {
        color: green,
        fontSize: 18,
    },
    failureText: {
        color: red,
        fontSize: 18,
    },
    timerWarning: {
        fontSize: 20,
        color: red,
    }
});


let secends = 60;
let minutes = 0;
let id;
let count = 0;
const userAnswers = [];

function Dashboard(props) {
    const questionContext = useContext(QuestionsContext)
    const [timerStarted, setTimerStarted] = useState(false)
    const [buttonText, setButtonText] = useState("Next")
    const [serverMessage, setServerMessage] = useState("")
    const [serverBtnText, setserverBtnText] = useState("Check Server Status")
    const [serverStatus, setserverStatus] = useState(false)
    const [positive, setPositive] = useState(false)
    const classes = useStyles();
    const [mins, setmins] = useState(minutes)
    const [secs, setsecs] = useState(secends)

    const nextQuestion = () => {

        //if user did not selected any option and going to next question
        if (count === userAnswers.length) {
            let dummy = {
                question: questionContext.questions[count].question,
                userAnswer: "Not Answered",
                correctAnswer: questionContext.questions[count].correctAnswer,
                result: false
            }
            userAnswers[count] = dummy;
        }
        if (count < questionContext.questions.length - 1) {
            count = count + 1;
            if (count === questionContext.questions.length - 1) {
                setButtonText("Submit")
            } else {
                setButtonText("Next")
            }
        } else {
            console.log("submit clicked")
            submitAnswers();
        }

    }


    const saveAnswer = (answer) => {
        let dummy = {
            question: questionContext.questions[count].question,
            userAnswer: answer,
            correctAnswer: questionContext.questions[count].correctAnswer,
            result: answer === questionContext.questions[count].correctAnswer
        }

        //Checking if question is last question or not
        if (count < questionContext.questions.length - 1) {
            if (count === userAnswers.length) {
                userAnswers[count] = dummy;
            } else if (count < userAnswers.length) {
                userAnswers[count] = dummy;
            }
        } else {
            if (count === userAnswers.length) {
                userAnswers[count] = dummy;
            } else if (count < userAnswers.length) {
                userAnswers[count] = dummy;
            }

        }
    }

    const prevQuestion = () => {
        if (count > 0) {
            count = count - 1;
        }
        if (count === questionContext.questions.length - 1) {
            setButtonText("Submit")
        } else {
            setButtonText("Next")
        }
    }





    const startTimer = () => {
        console.log("timer started")
        id = setInterval(timer, 1000);
        function timer() {
            if (minutes === 0 && secends === 0) {
                clearInterval(id)
            }
            else if (secends === 0) {
                secends = 60;
                if (minutes > 0) {
                    minutes = minutes - 1;
                }
                setsecs(secends)
                setmins(minutes)
            } else {
                secends = secends - 1;
                setsecs(secends)
            }

        }
    }


    const stopTimer = () => {
        console.log("Timer stoped")
        clearInterval(id)
    }


    const handleStatusCheck = () => {
        setserverBtnText("Checking...")
        fetch(BASE_URL + "status", {
            method: 'GET'
        })
            .then(result => {
                if (result.status === 200) {
                    setServerMessage("Server is running...")
                    setserverBtnText("Check Server Status")
                    setserverStatus(true)
                    setPositive(true)
                    setTimeout(() => {
                        setserverStatus(false)
                    }, 4000);
                } else {
                    setServerMessage("There is some issue with server...")
                    setserverBtnText("Check Server Status")
                    setserverStatus(true)
                    setPositive(false)
                    setTimeout(() => {
                        setserverStatus(false)
                    }, 7000);
                }

            })

            .catch(error => {
                setServerMessage("Server is not running...")
                setserverBtnText("Check Server Status")
                setserverStatus(true)
                setPositive(false)
                setTimeout(() => {
                    setserverStatus(false)
                }, 5000);
            })
    }

    useEffect(() => {
        if(props.history.action==="POP"){
            props.history.replace('/')
        }else{
            startTimer();
        }
    }, [])

    const submitAnswers = () => {
        stopTimer();
        // setButtonText("Please Wait...")
        const obj = {
            mailid: questionContext.mailID,
            answers: userAnswers
        }
        fetch(BASE_URL + "submitResult", {
            method: 'POST',
            body: JSON.stringify(obj)
        })
            .then(result => result.json())
            .then(response => {
                questionContext.updateResult(response)
                // setButtonText("Done")
                props.history.push('/result', { UserResult: response })
            })
            .catch(error => {
                console.log(error);
                // setButtonText("error")
            })
    }




    const autoSubmit = () => {
        stopTimer();
        let dummySize = userAnswers.length
        if (dummySize < questionContext.questions.length) {
            while (dummySize < questionContext.questions.length) {
                let dummy = {
                    question: questionContext.questions[count].question,
                    userAnswer: "Not Answered",
                    correctAnswer: questionContext.questions[count].correctAnswer,
                    result: false
                }
                userAnswers[dummySize] = dummy;
                dummySize = dummySize + 1;
            }
        } else {
            setTimeout(() => {
                if (dummySize === questionContext.questions.length) {
                    const obj = {
                        mailid: questionContext.mailID,
                        answers: userAnswers
                    }
                    fetch(BASE_URL + "submitResult", {
                        method: 'POST',
                        body: JSON.stringify(obj)
                    })
                        .then(result => result.json())
                        .then(response => {
                            props.history.push('/result', { UserResult: response })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }, 1000);
        }



    }

    if (minutes === 0 && secends === 0) {
        autoSubmit();
    }


    return (
        <div className="dashboard">
            <Card className={classes.root}>
                <CardContent>
                    <div className="d-flex justify-content-end">
                        {serverStatus ?
                            <Typography className={positive ? classes.successText : classes.failureText} color="textPrimary" gutterBottom>
                                {serverMessage}
                            </Typography>
                            :
                            <Button variant="contained" color="secondary" onClick={handleStatusCheck}>
                                Check Server Status
                            </Button>
                        }
                    </div>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Question Number {count + 1} Out of {questionContext.questions.length}
                    </Typography>
                    <Typography className={secs <= 30 && mins < 1 ? classes.timerWarning : classes.timer} gutterBottom>
                        {`Time Left : 0${mins}:${secs >= 0 && secs <= 9 ? "0" : ""}${secs}`}
                    </Typography>
                </CardContent>
                <CardContent>
                    {questionContext.questions.length ?
                        <QuestionCompo key={questionContext.questions[count]._id} question={questionContext.questions[count].question} option1={questionContext.questions[count].option1}
                            option2={questionContext.questions[count].option2} option3={questionContext.questions[count].option3}
                            option4={questionContext.questions[count].option4} next={nextQuestion} saveAnswer={saveAnswer} prevQ={prevQuestion} text={buttonText}
                            selectedValue={userAnswers.length > count ? userAnswers[count].userAnswer : ""}
                        />
                        : ""}
                </CardContent>
            </Card>
        </div>
    )
}

export default React.memo(Dashboard)
