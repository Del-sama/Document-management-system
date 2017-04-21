import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Navbar from './Nav.component';
import newDocument from '../actions/documentManagement/newDocument';

const ResponseMessage = (props) => {
  if (props.status === 'success') {
    return (
      <div>
        Document Created
      </div>
    );
  } else if (props.status === 'failed') {
    return (
      <div>
        Document not Created
      </div>
    );
  } else {
    return (<span />);
  }
};

export class CreateDocument extends Component {
constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      status: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
  }

  // componentDidMount() {
  //   $(this.refs.access).material_select(this.handleChange.bind(this));
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      browserHistory.push('/dashboard');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.CreateDocument(this.state);
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4>Create A Document</h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="title"
                  id="title"
                  onChange={this.handleChange}
                  placeholder="Name of Document"
                />
              </div>
              <div className="col m3 s12">
                <select
                  name="access"
                  id="access"
                  onChange={this.handleChange}
                  value={this.state.value}
                  className="browser-default"
                >
                  <option value="" disabled >Select Access Type</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
            <div className="field row">
              <textarea
                name="content"
                id="content"
                onChange={this.handleChange}
                placeholder="Type your content here..."
              />
            </div>
            <div className="field row">
              <button className="btn" type="submit">Save</button>
            </div>
            <ResponseMessage status={this.props.status} />
          </form>
        </div>
      </div>

    );
  }
}

CreateDocument.propTypes = {
  CheckToken: PropTypes.func
};

CreateDocument.contextTypes = {
  router: PropTypes.object
};

const mapStoreToProps = (state) => {
  return {
    status: state.allDocumentsReducer.createStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDocument: documentDetails => dispatch(newDocument(documentDetails)),
    CheckToken: () => dispatch(checkTokenAction())
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CreateDocument);
