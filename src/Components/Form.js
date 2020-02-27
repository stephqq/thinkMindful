import React, { Component } from 'react';
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
            showFS2: false,
            showFS3: false,
            showFS4: false,
        }
    }

    showNextFS = (whichFS) => {
        if (whichFS === 'fs2') {
            this.setState({
                showFS2: true,
            }, function() {
                document.querySelector('.fs2').scrollIntoView(true);
            })
        } else if (whichFS === 'fs3') {
            this.setState({
                showFS3: true,
            }, function() {
                document.querySelector('.fs3').scrollIntoView(true);
            })
        } else if (whichFS === 'fs4') {
            this.setState({
                showFS4: true,
            }, function() {
                document.querySelector('.fs4').scrollIntoView(true);
            })
        }
    }

    render() {
        return (
            <section className="form">
                <form action="submit">
                    <FontAwesomeIcon icon={faWindowClose} className="closeForm" onClick={this.props.handleClick} />
                    <Fieldset1 showNext={this.showNextFS} />
                    { this.state.showFS2 ? <Fieldset2 showNext={this.showNextFS} /> : null }
                    { this.state.showFS3 ? <Fieldset3 showNext={this.showNextFS} /> : null }
                    { this.state.showFS4 ? <Fieldset4 showNext={this.showNextFS} /> : null }
                </form>
            </section>
        )
    }
}

export default Form;