import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Homepage extends Component {
    constructor(self) {
        super(self);

        if(!this.props.state.auth.token) {
            this.props.history.push('/login');
        }
    }

  render() {
    
    return (
      <div className="viewport vbox" style={{textAlign: "center", marginTop: "50px"}}>
        <h1>This is the homepage</h1>
        <br/><br/>
        <Link to="/documents">Documents</Link>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    return {
        state
    };
  }

export default withRouter(connect(mapStateToProps, {})(Homepage))