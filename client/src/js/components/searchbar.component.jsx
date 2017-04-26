import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateDocument from './createDocument';
import AddDoc from './adddoc.component';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: 'users'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ selectValue: e.target.value });
  }

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
    var message = 'You selected ' + this.state.selectValue;
    return (
      <nav id="nav">
        <div className="nav-wrapper">

         <AddDoc />

          <div className="searchBox">
            <i className="material-icons">search</i>
            <input type="text" id="searchInput" placeholder="....SEARCH"></input>
            <div className="dropdown">
              <select value={this.state.selectValue}
                onChange={this.handleChange}>
                <option value="users">USERS</option>
                <option value="documents">DOCUMENTS</option>
              </select>
            </div>

          </div>



        </div>
      </nav>
    );
  }
}
export default Searchbar;