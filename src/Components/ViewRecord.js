import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const ViewRecord = (props) => {
    return (
        <div className="viewRecord">
            <FontAwesomeIcon icon={faWindowClose} className="closeForm" onClick={props.handleClick} />
            <div className="viewOptions">
                <button>edit</button>
                <button>delete</button>
            </div>
            <h2>{props.record[0].date}</h2>
            <h3>Situation/Trigger</h3>
            <p>{props.record[0].situation}</p>
            <h3>Emotions & Body Sensations</h3>
            <p>{props.record[0].feeling1} - {props.record[0].range1}% initial intensity, {props.record[0].reRange1}% re-rated intensity</p>
            <p>{props.record[0].feeling2} - {props.record[0].range2}% initial intensity, {props.record[0].reRange2}% re-rated intensity</p>
        </div>
    )
}

export default ViewRecord;