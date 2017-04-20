import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import signupAction from '../actions/authorizationManagement/signupAction';
import axios from 'axios';

  class Signup extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Signup
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: ''
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.Signup(this.state);
  }
  render() {
    return (
      <div>
         <div className="row">
           <h4 className="center auth-header"><Link to="/">Document Mangement System</Link></h4>
          </div>
         <div className="row signupForm">
           <h4 className="center">Sign Up</h4>
          <form  className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                value={this.state.firstName}
                onChange={this.onChange}
                name="firstName"
                id="firstName"
                type="text"
                 className="validate"
                required />
                <label  htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                value={this.state.lastName}
                onChange={this.onChange}
                name="lastName"
                id="lastName"
                type="text"
                 className="validate"
                required />
                <label  htmlFor="lastName">Last Name</label>
              </div>
            </div>
             <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.userName}
                onChange={this.onChange}
                name="userName"
                id="userName"
                type="text"
                 className="validate"
                required />
                <label  htmlFor="userName">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                id="email"
                type="email"
                 className="validate"
                required />
                <label  htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                id="password"
                type="password"
                 className="validate"
                required />
                <label  htmlFor="password">Password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light center auth-button" type="submit" name="action">Sign Up
              <i  className="material-icons right"></i>
            </button>
            <div className="row">
              <div className="col s12">
                <p className="center">Already have an account? <Link to="/app/login"> Login </Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStoreToProps = (state) => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Signup: userData => dispatch(signupAction(userData))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Signup);