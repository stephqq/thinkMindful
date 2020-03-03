import React, { Component, Fragment } from 'react';
import firebase from '../scripts/firebase';
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
            this.props.toggleError()
            this.props.handleClick()
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
                    // delete
                    const dbRef = firebase.database().ref(`${this.props.uid}/thoughts/${this.props.record[0].key}`);
                    dbRef.remove();
                    if (this.state.isEditing) {
                        this.props.toggleError()
                    }
                    // isViewing state needs to be updated
                    this.props.handleClick()
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
                        isEditing: !this.state.isEditing
                    }, this.props.toggleError)
                }
            })
        } else if (!this.state.isEditing && e.target.textContent === 'edit') {
            this.setState({
                isEditing: !this.state.isEditing
            }, this.props.toggleError)
        }
    }

    handleError = (e) => {
        if (this.state.isEditing) {
            Swal.fire({
                title: 'You sure?',
                text: 'Any changes to this form will not be saved.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `I'm sure!`,
                cancelButtonText: 'Whoops, nevermind!'
            }).then((result, e) => {
                if (result.value) {
                    this.props.toggleError()
                    this.props.handleClick(e)
                }
            })
        } else {
            this.props.handleClick(e)
        }
    }

    render() {
        return (
            <div className="viewRecord">
                <FontAwesomeIcon icon={faWindowClose} className="closeForm" onClick={this.handleError} />
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