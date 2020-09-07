import React from 'react';
import AgeQuestionContainer from './AgeQuestionContainer';
import OccupationQuestionContainer from './OccupationQuestionContainer';
import SpendingQuestionContainer from './SpendingQuestionContainer';
import RiskQuestionContainer from './RiskQuestionContainer';
import { useState } from 'react';
import RiskProfileContainer from '../../riskProfile/containers/RiskProfileContainer';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import { Paper } from "@material-ui/core";
import Cookies from 'js-cookie';

const QuestionContainer = () => {
    const [currentQuestion, setQuestion] = useState(0);
    const [age, setAge] = useState();
    const [occupation, setOccupation] = useState();
    const [spending, setSpending] = useState();
    const [risk, setRisk] = useState();
    const [isActive, setActive] = useState(false);
    const [portfolioSent, setPortfolioSent] = useState(false);
    const handleNext = () => {
        var x = currentQuestion + 1
        setQuestion(x);
    }
    const handleBack = () => {
        var x = currentQuestion - 1
        if (x < 0) {
            setQuestion(0)
        }
        else{
            setQuestion(x);
        }
    }

    const handleGenerate = () => {
        setActive(true);
        const data = {
            user_id: Cookies.get('userid'),
            age: age,
            occupation: occupation,
            spending: spending,
            risk: risk
        }
        axios.put("http://" + process.env.REACT_APP_PUBLIC_IP + ":5001/login/profiling", data).then((res) => {
            setActive(false);
            setPortfolioSent(true);
        }).catch((err) => {
            setPortfolioSent(false);
        })
    }

    return (
        <div className='container'>
        {
            portfolioSent ?
            <RiskProfileContainer/> :
            <LoadingOverlay
                className='container-fluid my-5 py-5'
                active={isActive}
                spinner
                text='Generating your risk portfolio...'
                fadeSpeed={10}
            >
            <div className='row mx-auto'>
                <div className='col d-flex align-items-center text-left'>
                    <div>
                        <h1>First, help us understand you a little better...</h1>
                        <span>This will help us provide you with a better learning experience!</span>
                    </div>
                </div>
                <div className={'col'}>
                    <Paper elevation={3} className={'pb-4 text-center'} style={{"background-color": "lightgrey"}} >
                        <AgeQuestionContainer currentQuestion={currentQuestion} setAge={setAge}/>
                        <OccupationQuestionContainer currentQuestion={currentQuestion} setOccupation={setOccupation}/>
                        <SpendingQuestionContainer currentQuestion={currentQuestion} setSpending={setSpending}/>
                        <RiskQuestionContainer currentQuestion={currentQuestion} setRisk={setRisk}/>

                    {/* {currentQuestion === 0 ? <AgeQuestionContainer /> :
                    currentQuestion === 1 ? <OccupationQuestionContainer/> :
                    currentQuestion === 2 ? <SpendingQuestionContainer/> :
                    currentQuestion === 3 ? <RiskQuestionContainer/> : <></>} */}

                    {
                        currentQuestion === 0 ?
                        <input type='button' className='btn btn-lg block px-5 btn-dark mx-2 mb-4' onClick={handleNext} value='Next'/> :
                        currentQuestion !== 3 ?
                        <>
                        <input type='button' className='btn btn-lg block px-5 btn-dark mx-2 mb-4' onClick={handleBack} value='Back'/>
                        <input type='button' className='btn btn-lg block px-5 btn-dark mx-2 mb-4' onClick={handleNext} value='Next'/>
                        </>
                        :
                        <>
                        <input type='button' className='btn btn-lg block px-5 btn-dark mx-2 mb-4' onClick={handleBack} value='Back'/>
                        <button className='btn btn-lg block px-5 btn-primary mx-2' onClick={handleGenerate}>Generate my Risk Portfolio!</button>
                        </>
                    }
                    </Paper>
                </div>
            </div>

            </LoadingOverlay>
        }
        </div>
    )

}

export default QuestionContainer;