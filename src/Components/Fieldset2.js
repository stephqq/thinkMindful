import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const Fieldset2 = (props) => {
    return (
        <fieldset className="fs2">
            <legend>Emotions & Body Sensations</legend>

            <FontAwesomeIcon icon={faChevronCircleDown} className="nextFieldSet" onClick={() => {props.showNext('fs3')}} />
        </fieldset>
    )
}

export default Fieldset2;