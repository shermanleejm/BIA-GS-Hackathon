import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'

const OccupationQuestionContainer = (props) => {
    const [choice, setChoice] = useState();
    const handleClick = (occupation) => {
        setChoice(occupation)
        props.setOccupation(occupation)
    }
    return (
        <form className={classnames('pt-5',styles["form"])} hidden={props.currentQuestion !== 1}>
            <h2 className='mb-4'>What is your occupation?</h2>
            <div className={classnames(styles["inputGroup"])}>
                <input id="doctor" name="radio" type="radio" onClick={()=>{handleClick('Doctor')}}/>
                <label for="doctor">Doctor</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="student" name="radio" type="radio" onClick={()=>{handleClick('Student')}}/>
                <label for="student">Student</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="freshgrad" name="radio" type="radio" onClick={()=>{handleClick('Fresh Graduate')}}/>
                <label for="freshgrad">Fresh Graduate</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="retired" name="radio" type="radio" onClick={()=>{handleClick('Retired')}}/>
                <label for="retired">Retired</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="others" name="radio" type="radio" onClick={()=>{handleClick('Others')}}/>
                <label for="others">Others</label>
            </div>


            {/* <button className='btn btn-lg block px-5 btn-dark' onClick={()=>{setDisplay(false)}}>Next</button> */}
        </form>
    )

}

export default OccupationQuestionContainer;