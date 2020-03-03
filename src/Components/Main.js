import React, { Component, Fragment } from 'react';
import Swal from 'sweetalert2';
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
        if (this.state.isCreating) {
            Swal.fire({
                title: 'You sure?',
                text: 'You will lose your current progress if you leave this form.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `I'm sure!`,
                cancelButtonText: 'Whoops, nevermind!'
            }).then((result) => {
                if (result.value) {
                    this.setState({
                        isCreating: !this.state.isCreating,
                    })
                }
            })
        } else {
            this.setState({
                isCreating: !this.state.isCreating,
            })
        }
    }

    render() {
        return (
            <main className="wrapper">
                {
                    this.state.isCreating ?
                        <Form handleClick={this.toggleForm} user={this.props.user} /> :
                        <Fragment>
                            <Button handleClick={this.toggleForm} />
                            <Library user={this.props.user} />
                        </Fragment>
                }
            </main>
        )
    }
}

export default Main;