import React, { Component, Fragment } from 'react';
import Button from './Button';
import Library from './Library';
import Form from './Form';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            isCreating: false,
        }
    }

    toggleForm = () => {
        this.setState({
            isCreating: !this.state.isCreating,
        })
    }

    render() {
        return (
            <main className="wrapper">
                {
                    this.state.isCreating ?
                        <Form handleClick={this.toggleForm} /> :
                        <Fragment>
                            <Button handleClick={this.toggleForm} />
                            <Library />
                        </Fragment>
                }
            </main>
        )
    }
}

export default Main;