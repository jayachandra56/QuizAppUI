import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { colorPrimary, green } from '../colors';
import ResultQuestionCompo from '../components/ResultQuestionCompo';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 30,
        color: colorPrimary,
        fontWeight: 600,
        borderRadius: 10,
        backgroundColor: '#E6EE9C',
        padding: 10,
    },
    subtitle: {
        fontSize: 18,
        color: green,
    },
    timer: {
        fontSize: 20,
        color: "#09af00"
    },
    pos: {
        marginBottom: 12,
    },
});

let resultData = {};

function Result(props) {
    const classes = useStyles();
    resultData = props.history.location.state.UserResult;
    return (

        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom >
                        Score Card
                    </Typography>
                    <div className="container scorecard">
                        <div className="scorecard-item">
                            <span className="label">Total no of questions</span>
                            <span className="label">Answered </span>
                            <span className="label">Correct answers</span>
                            <span className="label">Wrong answers</span>
                            <span className="label">Final Score</span>
                        </div>
                        <div className="scorecard-item">
                            <span>:</span>
                            <span>:</span>
                            <span>:</span>
                            <span>:</span>
                            <span>:</span>
                        </div>
                        <div className="scorecard-item">
                            <span className="label">{resultData.answers.length}</span>
                            <span className="label">{resultData.answers.length - resultData.notAttempted}</span>
                            <span className="label">{resultData.correctAnswers}</span>
                            <span className="label">{resultData.wrongAnswers}</span>
                            <span className="label">{resultData.finalScore}</span>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <br />
            <Card className={classes.root}>
                <CardContent>
                    {resultData.answers.map((item, index) => <ResultQuestionCompo key={index} index={index} question={item.question}
                        userAnswer={item.userAnswer} result={item.result} correctAnswer={item.correctAnswer} />)}
                </CardContent>
            </Card>
        </div>
    )
}
export default Result
