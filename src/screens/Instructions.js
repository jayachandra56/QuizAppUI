
import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { QuestionsContext } from '../App';
import { green, red } from '../colors';
import { BASE_URL } from '../constants';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        paddingBottom: 40
    },
    title: {
        fontSize: 20,
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

});

function Instructions(props) {
    const questionContext = useContext(QuestionsContext)
    const classes = useStyles();
    const [mail, setmail] = useState('')
    const [serverMessage, setServerMessage] = useState("")
    const [serverStatus, setserverStatus] = useState(false)
    const [serverBtnText, setserverBtnText] = useState("Check Server Status")
    const [positive, setPositive] = useState(false)


    const handleStart = () => {
        if (ValidateEmail(mail)) {
            questionContext.updateMail(mail);
            questionContext.getQuestions();
            props.history.push('/dashboard');
        }
    }

    function ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return true;
        }
        alert("You have entered an invalid email address!")
        return false;
    }

    const handleStatusCheck = () => {
        setserverBtnText("Checking...")
        fetch(BASE_URL+"status", {
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

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <div className="d-flex justify-content-end">
                        {serverStatus ?
                            <Typography className={positive ? classes.successText : classes.failureText} color="textPrimary" gutterBottom>
                                {serverMessage}
                            </Typography>
                            :
                            <Button variant="contained" color="secondary" onClick={handleStatusCheck}>
                                {serverBtnText}
                            </Button>
                        }
                    </div>
                    <br />
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        *** Read below instructions carefully ***
                    </Typography>

                </CardContent>
                <Typography variant="subtitle2" color="textPrimary" >
                    <ul className="text-left">
                        <li className="my-2">The examination will comprise of Objective type Multiple Choice Questions (MCQs).</li>
                        <li className="my-2">All questions are compulsory and each carries One mark.</li>
                        <li className="my-2">There will be NO NEGATIVE MARKING for the wrong answers.</li>
                        <li className="my-2">The examination does not require using any paper, pen, pencil and calculator.</li>
                        <li className="my-2">Every student will take the examination on a Laptop/Desktop/Smart Phone.</li>
                        <li className="my-2">The  students  just  need  to  click  on  the  Right  Choice  /  Correct  option  from  the multiple choices /options given with each question. For Multiple Choice Questions, each  question  has  four  options,  and  the  candidate  has  to  click  the  appropriate option.</li>
                        <li className="my-2">The   answers   can   be   changed   at   any   time   during   the   test   and   are   saved automatically.</li>
                        <li className="my-2">It is possible to Review the answered as well as the unansweredquestions.</li>
                        <li className="my-2">The Time remaining is shown in the Right Top Corner of the screen.</li>
                        <li className="my-2"><strong>The system automatically submit's answers when the time limit is over OR you  can  submit your answers  by  pressing the ‘Submit’ button.</strong></li>
                        <li className="my-2">The Time of the examination begins only when the ‘Start Test’ button is pressed.</li>
                    </ul>
                </Typography>
                <CardContent>
                    <div className="d-flex justify-content-center">
                        <div className="form-group ">
                            <input type="text" className="form-control" id="inputAddress" placeholder="Enter your mail ID*" value={mail} onChange={e => setmail(e.target.value)} />
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={handleStart}>
                        Start Test
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default withRouter(Instructions)
