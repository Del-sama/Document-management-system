import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory, Link } from 'react-router';
import loginAction from '../actions/authorizationManagement/loginAction';


class Login extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Login
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
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
    console.log(this.state);
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        <div className="row">
           <h4 className="center auth-header"><Link to="/">Document Mangement System</Link></h4>
          </div>
         <div className="row loginForm">
           <h4 className="center">Login</h4>
           <div>{ this.props.status}</div>
          <form className="col s12" onSubmit={this.onSubmit}>
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
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                id="password"
                type="password"
                className="validate"
                required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light center auth-button" type="submit" name="action">Login
              <i className="material-icons right"></i>
            </button>
            <div className="row">
              <div className="col s12">
                <p className="center">Don't have an account? <Link to="/app/signup"> Sign Up </Link></p>
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
    user: state.loginReducer.user,
    loginSuccess: state.loginReducer.success,
    loginError: state.loginReducer.error,
    token: state.loginReducer.token
  };
};

const mapDispatchToProps = (dispatch) => {
   return {
    login: (credentials) => dispatch(loginAction(credentials))
   }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login);
