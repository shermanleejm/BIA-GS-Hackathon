import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'
const AgeQuestionContainer = (props) => {
    const [choice, setChoice] = useState();
    const handleClick = (age) => {
        setChoice(age)
        props.setAge(age)
    }
    return (
        <form className={classnames('pt-5',styles["form"])} hidden={props.currentQuestion !== 0}>
            <h2 className='mb-4'>How old are you?</h2>
            <div className={classnames(styles["inputGroup"], 'justify-content-center')}>
                <input id="under25" name="radio" type="radio" onClick={() => {handleClick('under 25')}}/>
                <label for="under25">Under 25</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="25to30" name="radio" type="radio" onClick={() => {handleClick('25 to 30')}} />
                <label for="25to30">25 to 50</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="above50" name="radio" type="radio" onClick={() => {handleClick('above 50')}} />
                <label for="above50">Above 50</label>
            </div>

        </form>
    )

}

export default AgeQuestionContainer;