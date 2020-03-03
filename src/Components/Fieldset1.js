import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const Fieldset1 = (props) => {
    return (
        <fieldset className="fs1">
            <legend>Situation/Trigger</legend>
            <div>
                <label htmlFor="date">When did it happen?</label>
                <input type="date" id="date" name="date" value={props.date} pattern="\d{4}-\d{2}-\d{2}" onChange={props.handleInputChange} />
            </div>
            <label htmlFor="situation" className="visuallyHidden">Describe situation/trigger</label>
            <textarea name="situation" id="situation" value={props.situation} placeholder="What happened? How? Where? With who?" onChange={props.handleInputChange}></textarea>
            <FontAwesomeIcon icon={faChevronCircleDown} className="nextFieldSet" onClick={() => {props.showNext('fs2')}} />
        </fieldset>
    )
}

export default Fieldset1;