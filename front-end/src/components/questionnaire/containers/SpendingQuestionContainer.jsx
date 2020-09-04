import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'

const SpendingQuestionContainer = (props) => {
    const [choice, setChoice] = useState();
    const handleClick = (percent) => {
        setChoice(percent)
        props.setSpending(percent)
    }
    return (
        <form className={classnames('pt-5',styles["form"])} hidden={props.currentQuestion !== 2}>
            <h2 className='mb-4'>What are your spending needs relative to your income?</h2>
            <div className={classnames(styles["inputGroup"])}>
                <input id="max" name="radio" type="radio" onClick={()=>{handleClick('100')}}/>
                <label for="max">100% of income</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="75orless" name="radio" type="radio" onClick={()=>{handleClick('75')}}/>
                <label for="75orless">75% of income</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="fifty" name="radio" type="radio" onClick={()=>{handleClick('50')}}/>
                <label for="fifty">50% of income</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="25orless" name="radio" type="radio" onClick={()=>{handleClick('<= 25')}}/>
                <label for="25orless">25% of income or less</label>
            </div>
            {/* <button className='btn btn-lg block px-5 btn-dark' onClick={()=>{setDisplay(false)}}>Next</button> */}
        </form>
    )

}

export default SpendingQuestionContainer;