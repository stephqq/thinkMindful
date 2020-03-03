import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

class Fieldset2 extends Component {
    render() {
        return (
            <fieldset className="fs2" ref={this.props.refProp}>
                <legend>Emotions & Body Sensations</legend>
                <div className="inputRange">
                    <label htmlFor="feeling1" className="visuallyHidden">Enter emotion/body sensation</label>
                    <input type="text" name="feeling1" id="feeling1" value={this.props.feeling1} placeholder="What did you feel at the time?" onChange={this.props.handleInputChange} />
                    <label htmlFor="range1" className="visuallyHidden">Enter intensity of emotion/body sensation</label>
                    <InputRange 
                        maxValue={100}
                        minValue={0}
                        step={10}
                        value={this.props.range1}
                        onChange={value => this.props.handleInputChange('', 'range1', value)}
                        name="range1"
                    />
                </div>
                <div className="inputRange">
                    <label htmlFor="feeling2" className="visuallyHidden">Enter emotion/body sensation</label>
                    <input type="text" name="feeling2" id="feeling2" value={this.props.feeling2} placeholder="What did you feel at the time?" onChange={this.props.handleInputChange} />
                    <label htmlFor="range2" className="visuallyHidden">Enter intensity of emotion/body sensation</label>
                    <InputRange 
                        maxValue={100}
                        minValue={0}
                        step={10}
                        value={this.props.range2}
                        onChange={value => this.props.handleInputChange('', 'range2', value)}
                        name="range2"
                    />
                </div>
                <FontAwesomeIcon icon={faChevronCircleDown} className="nextFieldSet" onClick={() => {this.props.showNext('fs3')}} />
            </fieldset>
        )
    }
}

export default Fieldset2;