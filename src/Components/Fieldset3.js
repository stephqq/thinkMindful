import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const Fieldset3 = (props) => {
    return (
        <fieldset className="fs3">
            <legend>Evaluate Unhelpful Thoughts</legend>
            <div className="labelContainer">
                <label htmlFor="unhelpfulTh">Unhelpful thoughts/images:</label>
                <label htmlFor="supportingFacts">Supporting facts:</label>
                <label htmlFor="evidenceAg">Evidence against:</label>
                <label htmlFor="alternate">Alternative, more realistic and balanced, perspective:</label>
            </div>
            <div className="inputTContainer">
                <textarea name="unhelpfulTh" id="unhelpfulTh" placeholder="What went through your mind? What disturbed you? What did those thoughts /images /memories mean to you, or say about you or the situation?" onChange={props.handleInputChange}></textarea>
                <textarea name="supportingFacts" id="supportingFacts" placeholder="What facts do you have that the unhelpful thoughts are totally true?" onChange={props.handleInputChange}></textarea>
                <textarea name="evidenceAg" id="evidenceAg" placeholder="What facts do you have that the unhelpful thoughts are NOT totally true? Is it possible that this is opinion, rather than fact? What have others said about this?" onChange={props.handleInputChange}></textarea>
                <textarea name="alternate" id="alternate" placeholder="What would someone else say about this situation? What’s the bigger picture? Is there another way of seeing it?" onChange={props.handleInputChange}></textarea>
            </div>
            <FontAwesomeIcon icon={faChevronCircleDown} className="nextFieldSet" onClick={() => {props.showNext('fs4')}} />
        </fieldset>
    )
}

export default Fieldset3;