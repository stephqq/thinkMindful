import React, { Component } from 'react';
import InputRange from 'react-input-range';

class Fieldset4 extends Component {
    render() {
        return (
            <fieldset className="fs4">
                <legend>Re-evaluate Outcome</legend>
                <p>What are you feeling now?</p>
                <div className="inputRange">
                    <label htmlFor="reRange1">{this.props.feeling1}:</label>
                    <InputRange 
                            maxValue={100}
                            minValue={0}
                            step={10}
                            value={this.props.reRange1}
                            onChange={value => this.props.handleInputChange('', 'reRange1', value)}
                            onChangeComplete={value => console.log(value)}
                            name="reRange1"
                        />
                </div>
                <div className="inputRange">
                    <label htmlFor="reRange2">{this.props.feeling2}:</label>
                    <InputRange 
                            maxValue={100}
                            minValue={0}
                            step={10}
                            value={this.props.reRange2}
                            onChange={value => this.props.handleInputChange('', 'reRange2', value)}
                            onChangeComplete={value => console.log(value)}
                            name="reRange2"
                        />
                </div>
                <label htmlFor="reflection" className="visuallyHidden">Reflect:</label>
                <textarea name="reflection" id="reflection" placeholder="What could you do differently? What would be more effective?" onChange={this.props.handleInputChange}></textarea>
                <button type="submit">save thought record</button>
            </fieldset>
        )
    }
}

export default Fieldset4;