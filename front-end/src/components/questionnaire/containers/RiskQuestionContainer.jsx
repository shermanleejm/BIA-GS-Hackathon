import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'
import LoadingOverlay from 'react-loading-overlay';
import RiskProfileContainer from '../../riskProfile/containers/RiskProfileContainer';

const RiskQuestionContainer = () => {
    const [isActive, setIsActive] = useState(false);
    const [display, setDisplay] = useState(true);

    const handleClick = () => {
        setIsActive(true)
        setDisplay(false);
    }
    return (
        display ?
        <LoadingOverlay
            active={isActive}
            spinner
            text='Generating your risk portfolio...'
            fadeSpeed={500}
            >
                <form className={classnames('pt-5',styles["form"])}>
                    <h2 className='mb-4'>What is your risk appetite?</h2>
                    <div className={classnames(styles["inputGroup"])}>
                        <input id="high" name="radio" type="radio"/>
                        <label for="high">High</label>
                    </div>
                    <div className={styles["inputGroup"]}>
                        <input id="medium" name="radio" type="radio"/>
                        <label for="medium">Medium</label>
                    </div>
                    <div className={styles["inputGroup"]}>
                        <input id="low" name="radio" type="radio"/>
                        <label for="low">Low</label>
                    </div>

                    <button className='btn btn-lg block px-5 btn-dark' onClick={handleClick}>Generate my Risk Portfolio!</button>
                </form>
            </LoadingOverlay>
            : <RiskProfileContainer />
        )

}

export default RiskQuestionContainer;