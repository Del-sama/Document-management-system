import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import AddDoc from '../docs/adddoc.component';
import searchUsers from '../../actions/userManagement/searchUsers.js';
import searchDocs from '../../actions/documentManagement/searchDocs.js';


/**
 *
 *
 * @export
 * @class Searchbar contains the searchbar and add document components
 * @extends {Component}
 */
export class Searchbar extends Component {

/**
 * Creates an instance of Searchbar.
 * @param {object} props
 *
 * @memberOf Searchbar
 */
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('token');
    this.state = {
      database: 'users',
      query: '',
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * handles change events
   *
   * @param {object} e
   *
   * @memberOf Searchbar
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


   /**
    * handles submit event
    *
    * @param {object} e
    *
    * @memberOf Searchbar
    */
   handleSubmit(e){
    e.preventDefault();
    if(this.state.database === 'documents') {
      this.props.DocSearch(this.state.query);
      this.props.handleSearchBarView(true);
    } else {
      this.props.UserSearch(this.state.query);
      this.props.handleSearchBarView(false);
    }

  }

/**
 * componentDidMount called once render has been executed
 *
 *
 * @memberOf Searchbar
 */
  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }

 render() {
    const roleId = this.state.authUser.roleId || null
    let message = 'You selected ' + this.state.database;
    return (roleId === this.state.AdminRoleId) ?
      <nav id="nav">
        <div className="nav-wrapper">
          <AddDoc />

          <form className="searchForm" onSubmit={this.handleSubmit}>
            <div className="searchBox">
              <i className="material-icons">search</i>
              <input
                value={this.state.query}
                onChange={this.handleChange}
                name="query"
                type="text"
                id="searchInput"
                placeholder="....SEARCH"
                required />
              <div className="dropdown">
                <select
                  required
                  name="database"
                  id="database"
                  value={this.state.database}
                  onChange={this.handleChange}
                  className="browser-default"
                  >
                  <option value="users">USERS</option>
                  <option value="documents">DOCUMENTS</option>
                </select>
                <input type="submit" value="Submit" className="displayNone" />
              </div>
            </div>
          </form>
        </div>
      </nav> :
      <nav id="nav">
        <div className="nav-wrapper">

          <AddDoc />

          <form className="searchForm" onSubmit={this.handleSubmit}>
            <div className="searchBox">
              <i className="material-icons">search</i>
              <input
                value={this.state.query}
                onChange={this.handleChange}
                name="query"
                type="text"
                id="searchInput"
                placeholder="....SEARCH"
                required />
              <div className="dropdown">
                <select
                  name="database"
                  id="database"
                  value={this.state.database}
                  onChange={this.handleChange}
                  className="browser-default"
                  required
                  >
                  <option value="users">USERS</option>
                  <option value="documents">DOCUMENTS</option>
                </select>
              </div>
              <input type="submit" value="Submit" className="displayNone" />
            </div>
          </form>

        </div>
      </nav>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UserSearch: query => dispatch(searchUsers(query)),
    DocSearch: query => dispatch(searchDocs(query))
  };
};

export default connect(null, mapDispatchToProps)(Searchbar);
