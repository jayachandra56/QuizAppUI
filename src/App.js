import { createContext, useState } from 'react';
import './App.css';
import Routings from './components/Routings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from './constants';

export const QuestionsContext = createContext();
export const TimerContext = createContext();

function App() {
  let [questions, setQuestions] = useState([])
  const [result, setResult] = useState({})
  const [mailID, setmailID] = useState('')
  

  const getQuestions = () => {
    fetch(BASE_URL+"questions", {
      method: 'GET'
    })
      .then(result => result.json())
      .then(response => {
        setQuestions(response)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const updateMail=(value)=>{
    setmailID(value)
  }

  const updateResult=(res)=>{
    setResult(res)
  }

  

  
  return (
    <div className="container">
      <div className="App">
        <QuestionsContext.Provider value={{ getQuestions: getQuestions, questions: questions,updateResult:updateResult ,result:result,updateMail:updateMail,mailID:mailID}}>
          {/* <TimerContext.Provider value={{ startTimer: startTimer ,min:minutes,sec:seconds}}> */}
            <Routings />
          {/* </TimerContext.Provider> */}
        </QuestionsContext.Provider>
      </div>

    </div>
  );
}

export default App;
