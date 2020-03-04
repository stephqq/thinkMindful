import React, { Component } from 'react';
import firebase from '../scripts/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Fieldset1 from './Fieldset1';
import Fieldset2 from './Fieldset2';
import Fieldset3 from './Fieldset3';
import Fieldset4 from './Fieldset4';

class Form extends Component {
    constructor() {
        super();

        // refs for scrollIntoView method
        this.fs2Ref = React.createRef()
        this.fs3Ref = React.createRef()
        this.fs4Ref = React.createRef()

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
            //an empty string is falsy
            this.state.date && this.state.situation
                ?
                this.setState({
                    showFS2: true,
                }, () => {
                    this.fs2Ref.current.scrollIntoView({ block: 'start' })
                })
                :
                Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
        } else if (whichFS === 'fs3') {
            //an empty string or 0 is falsy
            this.state.feeling1 && this.state.feeling2 && this.state.range1 && this.state.range2
                ?
                this.setState({
                    showFS3: true,
                }, () => {
                    this.fs3Ref.current.scrollIntoView({ block: 'start' })
                })
                :
                Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
        } else if (whichFS === 'fs4') {
            //an empty string is falsy
            this.state.unhelpfulTh && this.state.supportingFacts && this.state.evidenceAg && this.state.alternate
                ?
                this.setState({
                    showFS4: true,
                }, () => {
                    this.fs4Ref.current.scrollIntoView({ block: 'start' })
                })
                :
                Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
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
        //an empty string is falsy, not evaluating against reRange1 and reRange2 as 0 is an acceptable new rating
        this.state.reflection
            ?
            this.submitConfirmed()
            :
            Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
    }

    submitConfirmed = () => {
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

        this.props.closeOnSubmit();
    }

    render() {
        return (
            <section className="form">
                <form onSubmit={this.handleSubmit}>
                    <FontAwesomeIcon icon={faWindowClose} className="closeForm" onClick={this.props.handleClick} />
                    <Fieldset1 showNext={this.showNextFS} handleInputChange={this.handleInputChange} date={this.state.date} situation={this.state.situation} />
                    { this.state.showFS2 ? <Fieldset2 refProp={this.fs2Ref} showNext={this.showNextFS} handleInputChange={this.handleInputChange} feeling1={this.state.feeling1} range1={this.state.range1} feeling2={this.state.feeling2} range2={this.state.range2} /> : null }
                    { this.state.showFS3 ? <Fieldset3 refProp={this.fs3Ref} showNext={this.showNextFS} handleInputChange={this.handleInputChange} unhelpfulTh={this.state.unhelpfulTh} supportingFacts={this.state.supportingFacts} evidenceAg={this.state.evidenceAg} alternate={this.state.alternate} /> : null }
                    { this.state.showFS4 ? <Fieldset4 refProp={this.fs4Ref} handleInputChange={this.handleInputChange} feeling1={this.state.feeling1} feeling2={this.state.feeling2} reRange1={this.state.reRange1} reRange2={this.state.reRange2} reflection={this.state.reflection} /> : null }
                </form>
            </section>
        )
    }
}

export default Form;