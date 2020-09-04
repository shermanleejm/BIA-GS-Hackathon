import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './QuestionContainer.module.scss'
import OccupationQuestionContainer from './OccupationQuestionContainer'
const AgeQuestionContainer = () => {
    const [display, setDisplay] = useState(true);
    const handleClick = () => {
        setDisplay(false);
    }
    return (
        display ?
        <form className={classnames('pt-5',styles["form"])}>
            <h2 className='mb-4'>How old are you?</h2>
            <div className={classnames(styles["inputGroup"], 'justify-content-center')}>
                <input id="under25" name="radio" type="radio"/>
                <label for="under25">Under 25</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="25to30" name="radio" type="radio"/>
                <label for="25to30">25 to 50</label>
            </div>
            <div className={styles["inputGroup"]}>
                <input id="above50" name="radio" type="radio"/>
                <label for="above50">Above 50</label>
            </div>

            <input type='button' className='btn btn-lg block px-5 btn-dark' onClick={handleClick} value='Next'/>
        </form> :
         <OccupationQuestionContainer/>

    )

}

export default AgeQuestionContainer;