import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'
import SpendingQuestionContainer from './SpendingQuestionContainer'

const OccupationQuestionContainer = () => {
    const [display, setDisplay] = useState(true);

    return (
        display ?
        <form className={classnames('pt-5',styles["form"])}>
            <h2 className='mb-4'>What is your occupation?</h2>
            <div className={classnames(styles["inputGroup"])}>
                <input id="doctor" name="radio" type="radio"/>
                <label for="doctor">Doctor</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="student" name="radio" type="radio"/>
                <label for="student">Student</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="freshgrad" name="radio" type="radio"/>
                <label for="freshgrad">Fresh Graduate</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="retired" name="radio" type="radio"/>
                <label for="retired">Retired</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="others" name="radio" type="radio"/>
                <label for="others">Others</label>
            </div>


            <button className='btn btn-lg block px-5 btn-dark' onClick={()=>{setDisplay(false)}}>Next</button>
        </form> :
        <SpendingQuestionContainer/>
    )

}

export default OccupationQuestionContainer;