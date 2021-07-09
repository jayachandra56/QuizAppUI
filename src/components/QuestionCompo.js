import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { colorPrimary } from '../colors';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  questionStyle: {
      color:colorPrimary,
      fontWeight:"bold",
      fontSize:20,
      paddingBottom:10,

  }
}));

let selectedOption="Not Answered";
export default function QuestionCompo(props) {
  const classes = useStyles();

  const handleRadioChange = (event) => {
    selectedOption=event.target.value;
    props.saveAnswer(selectedOption==='Not Answered'?props.selectedValue===undefined?"Not Answered":props.selectedValue:selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.next()
  };

  const handlePrev=()=>{
    props.prevQ();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel  className={classes.questionStyle}>{props.question}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={props.selectedValue===""?"Not Answered":props.selectedValue} onChange={handleRadioChange}>
          <FormControlLabel value={props.option1} control={<Radio color="primary"/>} label={props.option1} />
          <FormControlLabel value={props.option2} control={<Radio color="primary"/>} label={props.option2} />
          <FormControlLabel value={props.option3} control={<Radio color="primary"/>} label={props.option3} />
          <FormControlLabel value={props.option4} control={<Radio color="primary"/>} label={props.option4} />
        </RadioGroup>
        <FormHelperText>Choose any one option</FormHelperText>
        
        <Button type="submit" variant={props.text==="Submit"?"contained":"outlined"} color="primary" className={classes.button}>
          {props.text}
        </Button>
        
        <Button variant="outlined" color="primary" className={classes.button} onClick={handlePrev}>
          Previous Question
        </Button>
      </FormControl>
    </form>
  );
}
