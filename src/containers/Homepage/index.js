import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Header from '../../components/Header'

class Homepage extends Component {
    constructor(self) {
        super(self);

        if (!this.props.state.auth.token) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.state.auth.token) {
            newProps.history.push('/login');
        }
    }

    render() {

        return (
            <Header />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state
    };
}

export default withRouter(connect(mapStateToProps, {})(Homepage))