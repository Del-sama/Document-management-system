import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateDocument from './docForm.component'


/**
 * AddDoc create documents modal
 *
 * @class AddDoc
 * @extends {Component}
 */
class AddDoc extends Component {

  /**
   * Creates an instance of AddDoc.
   *
   * @memberOf AddDoc
   */
  constructor() {
    super();
  }

/**
 *componentDidMount called once render has been executed
 *
 * @memberOf AddDoc
 */
  componentDidMount() {
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .6, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });
  }

  render() {
    return (
      <div className="inline">
        <Link data-target="modal" id="createDoc" className="waves-effect waves-light btn-large">
          <i className="material-icons left">add_circle_outline</i>
          Add Documents
          </Link>
        <div id="modal" className="modal modal-fixed-footer">
          <div className="modal-content" id="createDocModal">
            <h4 id="eh4">Create a Document</h4>
            <CreateDocument />
          </div>
        </div>
      </div>
    )
  }
}

export default AddDoc;