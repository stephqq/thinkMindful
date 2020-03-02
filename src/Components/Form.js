import React, { Component } from 'react';
import firebase from '../scripts/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Fieldset1 from './Fieldset1';
import Fieldset2 from './Fieldset2';
import Fieldset3 from './Fieldset3';
import Fieldset4 from './Fieldset4';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            // triggering form fieldset render
            showFS2: false,
            showFS3: false,
            showFS4: false,
            // form input storage
            date: '',
            situation: '',
            feeling1: '',
            range1: 0,
            feeling2: '',
            range2: 0,
            unhelpfulTh: '',
            supportingFacts: '',
            evidenceAg: '',
            alternate: '',
            reRange1: 0,
            reRange2: 0,
            reflection: '',
        }
    }

    showNextFS = (whichFS) => {
        if (whichFS === 'fs2') {
            this.setState({
                showFS2: true,
            })
        } else if (whichFS === 'fs3') {
            this.setState({
                showFS3: true,
            }, function() {
                // document.querySelector('.fs3').scrollIntoView(true);
            })
        } else if (whichFS === 'fs4') {
            this.setState({
                showFS4: true,
            }, function() {
                // document.querySelector('.fs4').scrollIntoView(true);
            })
        }
    }

    //this does onChange for multiple inputs using the name on each input to assign a state variable :D
    //we take in a name and value param to address for range sliders - their onChange is not sending out an event object as the library disabled it (issues values only) so we need to provide a parameter to ensure state is saved properly in those instances
    handleInputChange = (e, name, value) => {
        if (name === undefined) {
            this.setState({
                [e.target.name]: e.target.value,
            })
        } else {
            this.setState({
                [name]: value,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const thoughtRecord = {
            date: this.state.date,
            situation: this.state.situation,
            feeling1: this.state.feeling1,
            range1: this.state.range1,
            feeling2: this.state.feeling2,
            range2: this.state.range2,
            unhelpfulTh: this.state.unhelpfulTh,
            supportingFacts: this.state.supportingFacts,
            evidenceAg: this.state.evidenceAg,
            alternate: this.state.alternate,
            reRange1: this.state.reRange1,
            reRange2: this.state.reRange2,
            reflection: this.state.reflection
        }

        const dbRef = firebase.database().ref(`${this.props.user.uid}/thoughts`);

        dbRef.push(thoughtRecord);

        this.setState({
            // form input storage
            date: '',
            situation: '',
            feeling1: '',
            range1: 0,
            feeling2: '',
            range2: 0,
            unhelpfulTh: '',
            supportingFacts: '',
            evidenceAg: '',
            alternate: '',
            reRange1: 0,
            reRange2: 0,
            reflection: '',
        })

        this.props.handleClick();
    }

    render() {
        return (
            <section className="form">
                <form onSubmit={this.handleSubmit}>
                    <FontAwesomeIcon icon={faWindowClose} className="closeForm" onClick={this.props.handleClick} />
                    <Fieldset1 showNext={this.showNextFS} handleInputChange={this.handleInputChange} />
                    { this.state.showFS2 ? <Fieldset2 showNext={this.showNextFS} handleInputChange={this.handleInputChange} range1={this.state.range1} range2={this.state.range2} /> : null }
                    { this.state.showFS3 ? <Fieldset3 showNext={this.showNextFS} handleInputChange={this.handleInputChange} /> : null }
                    { this.state.showFS4 ? <Fieldset4 showNext={this.showNextFS} handleInputChange={this.handleInputChange} feeling1={this.state.feeling1} feeling2={this.state.feeling2} reRange1={this.state.reRange1} reRange2={this.state.reRange2} /> : null }
                </form>
            </section>
        )
    }
}

export default Form;