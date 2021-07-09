import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { colorPrimary, textMain } from '../colors';
import {ThumbDown,ThumbUp} from '@material-ui/icons'
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    
    title: {
        fontSize: 30,
        color:colorPrimary,
        fontWeight:600
    },
    question:{
        fontSize: 20,
        color:colorPrimary,
        textAlign:'start',
        fontWeight:500
    },
    answer:{
        fontSize: 16,
        color:textMain,
        textAlign:'start'
    },
    
});

function ResultQuestionCompo({ index , question, userAnswer, result, correctAnswer }) {
    const classes = useStyles()
    return (
        <CardContent>
            <Typography className={classes.question} color="textPrimary" gutterBottom>
            {index+1}{") "}{question}
            </Typography>
            <Typography className={classes.answer} color="textPrimary" gutterBottom>
             <b>Your Answer is :</b> {userAnswer}&nbsp;&nbsp;{result?<ThumbUp style={{ color: "#2e7d32" }}/>:<ThumbDown style={{ color: '#b71c1c' }}/>}
            </Typography>
            {result?"":
            <Typography className={classes.answer} color="textPrimary" gutterBottom>
             <b>Correct Answer is :</b> {correctAnswer}
            </Typography>
            }
            <br/>
        </CardContent>
    )
}

export default ResultQuestionCompo
