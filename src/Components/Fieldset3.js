import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const Fieldset3 = (props) => {
    return (
        <fieldset className="fs3">
            <legend></legend>

            <FontAwesomeIcon icon={faChevronCircleDown} className="nextFieldSet" onClick={() => {props.showNext('fs4')}} />
        </fieldset>
    )
}

export default Fieldset3;