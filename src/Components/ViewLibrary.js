import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const ViewLibrary = (props) => {
    return (
        <div>
            <h2>your thought record library</h2>
            {
                props.records.length === 0
                    ?
                        <p>No thought records available - maybe you should try creating one?</p>
                    :
                        <div className="recordGallery">
                            <ul>
                            {
                                props.records.map((record) => {
                                    return (
                                        <li key={record.key}>
                                            <FontAwesomeIcon icon={faExternalLinkAlt} className="openRecord" onClick={(e) => {props.handleClick(e, record.key)}} />
                                            <h3>{record.date}</h3>
                                                <p>Situation:&nbsp;
                                                    {
                                                        record.situation.slice(0, 100)
                                                    }...
                                                </p>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
            }
        </div>
    )
}

export default ViewLibrary;