import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'

const RiskQuestionContainer = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [choice, setChoice] = useState();

    const handleClick = (risk) => {
        setIsActive(true)
        setChoice(risk)
        props.setRisk(risk)
    }
    return (

                <form className={classnames('pt-5',styles["form"])} hidden={props.currentQuestion !== 3}>
                    <h2 className='mb-4'>How would you rate your risk appetite?</h2>
                    <div className={classnames(styles["inputGroup"])}>
                        <input id="high" name="radio" type="radio" onClick={()=>{handleClick('High')}}/>
                        <label for="high">High</label>
                    </div>
                    <div className={styles["inputGroup"]}>
                        <input id="medium" name="radio" type="radio" onClick={()=>{handleClick('Medium')}}/>
                        <label for="medium">Medium</label>
                    </div>
                    <div className={styles["inputGroup"]}>
                        <input id="low" name="radio" type="radio" onClick={()=>{handleClick('Low')}}/>
                        <label for="low">Low</label>
                    </div>

                </form>
        )

}

export default RiskQuestionContainer;