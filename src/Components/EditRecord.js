import React, { Component } from 'react';
import Swal from 'sweetalert2';
import firebase from '../scripts/firebase';
import Fieldset1 from './Fieldset1';
import Fieldset2 from './Fieldset2';
import Fieldset3 from './Fieldset3';
import Fieldset4 from './Fieldset4';

class EditRecord extends Component {
    constructor() {
        super();

        // refs for scrollIntoView method
        this.fs2Ref = React.createRef()
        this.fs3Ref = React.createRef()
        this.fs4Ref = React.createRef()

        this.state = {
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

    componentDidMount() {
        this.setState({
            // pull props into form input storage
            date: this.props.record[0].date,
            situation: this.props.record[0].situation,
            feeling1: this.props.record[0].feeling1,
            range1: this.props.record[0].range1,
            feeling2: this.props.record[0].feeling2,
            range2: this.props.record[0].range2,
            unhelpfulTh: this.props.record[0].unhelpfulTh,
            supportingFacts: this.props.record[0].supportingFacts,
            evidenceAg: this.props.record[0].evidenceAg,
            alternate: this.props.record[0].alternate,
            reRange1: this.props.record[0].reRange1,
            reRange2: this.props.record[0].reRange2,
            reflection: this.props.record[0].reflection,
        })
    }

    showNextFS = (whichFS) => {
        if (whichFS === 'fs2') {
            //an empty string is falsy
            if (this.state.date && this.state.situation) {
                this.fs2Ref.current.scrollIntoView({ block: 'start' })
            } else {
                Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
            }
        } else if (whichFS === 'fs3') {
            //an empty string or 0 is falsy
            if (this.state.feeling1 && this.state.feeling2 && this.state.range1 && this.state.range2) {
                this.fs3Ref.current.scrollIntoView({ block: 'start' })
            } else {
                Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
            }
        } else if (whichFS === 'fs4') {
            //an empty string is falsy
            if (this.state.unhelpfulTh && this.state.supportingFacts && this.state.evidenceAg && this.state.alternate) {
                this.fs4Ref.current.scrollIntoView({ block: 'start' })
            } else {
                Swal.fire('Oops...', 'Maybe you should fill out all existing fields first before moving on.', 'error');
            }
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
        //an empty string and 0 is falsy, not evaluating against reRange1 and reRange2 as 0 is an acceptable new rating
        this.state.date && this.state.situation && this.state.feeling1 && this.state.feeling2 && this.state.range1 && this.state.range2 && this.state.unhelpfulTh && this.state.supportingFacts && this.state.evidenceAg && this.state.alternate && this.state.reflection
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

        const dbRef = firebase.database().ref(`${this.props.uid}/thoughts/${this.props.record[0].key}`);

        dbRef.update(thoughtRecord);

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
            <form onSubmit={this.handleSubmit}>
                <Fieldset1 showNext={this.showNextFS} handleInputChange={this.handleInputChange} date={this.state.date} situation={this.state.situation} />
                <Fieldset2 showNext={this.showNextFS} handleInputChange={this.handleInputChange} refProp={this.fs2Ref} feeling1={this.state.feeling1} range1={this.state.range1} feeling2={this.state.feeling2} range2={this.state.range2} />
                <Fieldset3 showNext={this.showNextFS} handleInputChange={this.handleInputChange} refProp={this.fs3Ref} unhelpfulTh={this.state.unhelpfulTh} supportingFacts={this.state.supportingFacts} evidenceAg={this.state.evidenceAg} alternate={this.state.alternate} />
                <Fieldset4 handleInputChange={this.handleInputChange} refProp={this.fs4Ref} feeling1={this.state.feeling1} feeling2={this.state.feeling2} reRange1={this.state.reRange1} reRange2={this.state.reRange2} reflection={this.state.reflection} />
            </form>
        )
    }
}

export default EditRecord;