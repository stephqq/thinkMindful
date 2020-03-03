import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import EditRecord from './EditRecord';
import Swal from 'sweetalert2';

class ViewRecord extends Component {
    constructor() {
        super();

        this.state = {
            isEditing: false,
        }
    }

    handleClick = (e) => {
        if (e === undefined) {
            this.setState({
                isEditing: false
            })
        } else if (e.target.textContent === 'delete') {
            Swal.fire({
                title: 'You sure?',
                text: `Once deleted, it's gone!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `I'm sure!`,
                cancelButtonText: 'Whoops, nevermind!'
            }).then((result) => {
                if (result.value) {
                    // deletion here
                    // isViewing state needs to be updated somehow
                }
            })
        } else if (this.state.isEditing && e.target.textContent === 'view') {
            Swal.fire({
                title: 'You sure?',
                text: 'Any changes to this form will not be saved.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `I'm sure!`,
                cancelButtonText: 'Whoops, nevermind!'
            }).then((result) => {
                if (result.value) {
                    this.setState({
                        isEditing: false
                    })
                }
            })
        } else if (!this.state.isEditing && e.target.textContent === 'edit') {
            this.setState({
                isEditing: true
            })
        }
    }

    render() {
        return (
            <div className="viewRecord">
                <FontAwesomeIcon icon={faWindowClose} className="closeForm" onClick={this.props.handleClick} />
                <div className="viewOptions">
                    <button onClick={this.handleClick}>view</button>
                    <button onClick={this.handleClick}>edit</button>
                    <button onClick={this.handleClick}>delete</button>
                </div>
                {
                    this.state.isEditing
                        ?
                        <EditRecord record={this.props.record} uid={this.props.uid} handleClick={this.handleClick} />
                        :
                        <Fragment>
                        <h2>{this.props.record[0].date}</h2>
                        <h3>Situation/Trigger</h3>
                        <p>{this.props.record[0].situation}</p>
                        <h3>Re-evaluated Outcome</h3>
                        <p>{this.props.record[0].reflection}</p>
                        <h3>Emotions & Body Sensations</h3>
                        <p>{this.props.record[0].feeling1} - {this.props.record[0].range1}% initial intensity, {this.props.record[0].reRange1}% re-rated intensity</p>
                        <p>{this.props.record[0].feeling2} - {this.props.record[0].range2}% initial intensity, {this.props.record[0].reRange2}% re-rated intensity</p>
                        <h3>Unhelpful Thoughts</h3>
                        <div className="labelContainer">
                            <p>Unhelpful thoughts/images:</p>
                            <p>Supporting facts:</p>
                            <p>Evidence against:</p>
                            <p>Alternative, more realistic and balanced, perspective:</p>
                        </div>
                        <div className="inputTContainer">
                            <p>{this.props.record[0].unhelpfulTh}</p>
                            <p>{this.props.record[0].supportingFacts}</p>
                            <p>{this.props.record[0].evidenceAg}</p>
                            <p>{this.props.record[0].alternate}</p>
                        </div>
                        </Fragment>
                }
            </div>
        )
    }
}

export default ViewRecord;