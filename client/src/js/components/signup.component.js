import React, { Component } from 'react';
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
    axios.post('/app/users', { user: this.state });
  }
  render() {
    return (
      <div>
         <div className="row">
           <h4 className="center auth-header"><a href="/">Document Mangement System</a></h4>
          </div>
         <div className="row signupForm">
           <h4 className="center">Sign Up</h4>
          <form class="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                value={this.state.first_name}
                onChange={this.onChange}
                name="firstName"
                id="firstName"
                type="text"
                class="validate"
                required />
                <label for="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                value={this.state.last_name}
                onChange={this.onChange}
                name="lastName"
                id="lastName"
                type="text"
                class="validate"
                required />
                <label for="lastName">Last Name</label>
              </div>
            </div>
             <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.user_name}
                onChange={this.onChange}
                name="userName"
                id="userName"
                type="text"
                class="validate"
                required />
                <label for="userName">User Name</label>
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
                class="validate"
                required />
                <label for="email">Email</label>
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
                class="validate"
                required />
                <label for="password">Password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light center auth-button" type="submit" name="action">Sign Up
              <i class="material-icons right"></i>
            </button>
            <div className="row">
              <div className="col s12">
                <p className="center">Already have an account? <a href="/app/login"> Login </a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;