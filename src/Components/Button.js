import React, { Component } from 'react';

class Button extends Component {
    render() {
        return(
            <section className="newThRd">
                <button onClick={this.props.handleClick}>Create new thought record</button>
            </section>
        )
    }
}

export default Button;