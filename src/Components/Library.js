import React, { Component } from 'react';
import firebase from '../scripts/firebase';
import ViewRecord from './ViewRecord';
import ViewLibrary from './ViewLibrary';

class Library extends Component {
    constructor() {
        super();
        this.state = {
            records: [],
            isViewing: false,
            currentRecord: []
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(`${this.props.user.uid}/thoughts`);

        dbRef.on('value', (snapshot) => {
            const dataDB = snapshot.val();
            const newState = [];

            for (let key in dataDB) {
                newState.push({
                    key: key,
                    date: dataDB[key].date,
                    situation: dataDB[key].situation,
                    feeling1: dataDB[key].feeling1,
                    range1: dataDB[key].range1,
                    feeling2: dataDB[key].feeling2,
                    range2: dataDB[key].range2,
                    unhelpfulTh: dataDB[key].unhelpfulTh,
                    supportingFacts: dataDB[key].supportingFacts,
                    evidenceAg: dataDB[key].evidenceAg,
                    alternate: dataDB[key].alternate,
                    reRange1: dataDB[key].reRange1,
                    reRange2: dataDB[key].reRange2,
                    reflection: dataDB[key].reflection
                })
            }

            this.setState({
                records: newState
            })
        })
    }

    componentWillUnmount() {
        const dbRef = firebase.database().ref(`${this.props.user.uid}/thoughts`);

        dbRef.off();
    }

    handleClick = (e, key) => {
        this.setState({
            isViewing: !this.state.isViewing,
        })

        //if key contains argument (truthy)
        if (key) {
            const newState = [...this.state.records].filter((record) => {
                return record.key === key;
            });

            this.setState({
                currentRecord: newState,
            })
        } else {
            this.setState({
                currentRecord: []
            })
        }
    }

    render() {
        return (
            <section className="thRdLibrary">
                {
                    this.state.isViewing
                        ?
                            <ViewRecord handleClick={this.handleClick} record={this.state.currentRecord} />
                        :
                            <ViewLibrary records={this.state.records} handleClick={this.handleClick} />
                }
            </section>
        )
    }
}

export default Library;