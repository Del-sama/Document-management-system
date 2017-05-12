import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import signupAction from '../actions/authorizationManagement/signupAction';
import axios from 'axios';

  /**
   *
   *
   * @export
   * @class Signup - signup form
   * @extends {Component}
   */
  export class Signup extends Component {

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
      password: '',
      confirmPassword: ''
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.validateInput=this.validateInput.bind(this);
  }

/**
 *
 * componentWillReceiveProps called when props are changed and page is re-rendered
 * @param {object} nextProps
 *
 * @memberOf Signup
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.error === 'unique violation') {
      this.setState({
        error: 'User already exists'
      });
    }
    if (nextProps.user) {
      browserHistory.push('/app/dashboard');
    }
  }

/**
 * onChange handles change events
 *
 * @param {object} e
 *
 * @memberOf Signup
 */
  onChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  validateInput(password){
    if(password.length < 6) {
      Materialize.toast('Password should not be less than six characters!', 3000)
    } else {
      return true
    }
  }

/**
 * onSubmit handles submit
 *
 * @param {object} e
 *
 * @memberOf Signup
 */
  onSubmit(e) {
    e.preventDefault();
    if(this.validateInput(this.state.password)) {
      if(this.state.password === this.state.confirmPassword){
        this.props.signup(this.state);
      }else {
        Materialize.toast('Passwords don\'t match!', 3000)
      }
    }
  }

  render() {
    return (
      <div>
         <div className="row">
           <h4 className="center auth-header"><Link to="/app/">Document Mangement System</Link></h4>
          </div>
         <div className="row signupForm">
           <h4 className="center">Sign Up</h4>
          <form  className="col s12" onSubmit={this.onSubmit}>
            { this.state.error ?
              <div className="center">
                { this.state.error }
              </div>
              : <span />
            }
            { this.state.success ?
              <div className="center">
                { this.state.success }
              </div>
              : <span />
            }
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
            <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.confirmPassword}
                onChange={this.onChange}
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className="validate"
                required
                />
                <label  htmlFor="confirmPassword">Confirm Password</label>
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
    user: state.signupReducer.user,
    error: state.signupReducer.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: userData => dispatch(signupAction(userData))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Signup);
