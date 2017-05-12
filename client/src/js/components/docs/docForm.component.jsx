import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import newDocument from '../../actions/documentManagement/newDocument';
import TinyMCE from 'react-tinymce';

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

/**
 *
 *
 * @export
 * @class CreateDocument mounts a form that creates documents
 * @extends {Component}
 */
export class CreateDocument extends Component {
/**
 * Creates an instance of CreateDocument.
 * @param {object} props
 *
 * @memberOf CreateDocument
 */
  constructor(props) {
      super(props);
      const token = (window.localStorage.getItem('token'));
      if (token) {
        this.state = { id: jwtDecode(token).userId, userName: jwtDecode(token).userName};
      }
      this.state = {
        title: props.document ? props.document.title :  '',
        content: props.document ? props.document.content : '',
        access: props.document ? props.document.access : '',
        status: props.document ? props.document.status : '',
        userId: this.state.id
      };
      this.onChange = this.onChange.bind(this);
      this.contentOnChange = this.contentOnChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

/**
 *
 * componentWillReceiveProps called when props are changed and page is re-rendered
 * @param {object} nextProps
 *
 * @memberOf createDocument
 */
  componentWillReceiveProps(nextProps) {
    if(!nextProps.document) return;
    if (nextProps.status === 'success') {
      browserHistory.push('/app/dashboard');
    }
    this.setState({
      title: nextProps.document.title,
      content: nextProps.document.content,
      access: nextProps.document.access,
      status: nextProps.document.status
    });
    tinymce.activeEditor.setContent(nextProps.document.content);
  }

  /**
   *onchange handles change events
   *
   * @param {object} event
   *
   * @memberOf CreateDocument
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *contentOnChange handles content change in tinyMCE editor
   *
   * @param {object} event
   *
   * @memberOf CreateDocument
   */
  contentOnChange(event) {
    this.setState({
      content: event.target.getContent()
    });
  }

  /**
   * onSubmit handles submit event
   *
   * @param {any} event
   *
   * @memberOf CreateDocument
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.content.length < 1) {
      Materialize.toast('Please add a content', 1000);
    } else if (this.props.onEdit) {
      this.props.onEdit(this.state, this.props.documentId);
      $('.modal').modal('close');
      Materialize.toast('Document updated', 1000, 'green');
    } else {
      this.props.CreateDocument(this.state);
      $('.modal').modal('close');
      Materialize.toast('Document created', 1000, 'green');
    }
  }

  render() {
    return  (
      <div>
        <div>
         <div className="row">
          <form className="col s12"
          onSubmit={this.onSubmit}>
              <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.title}
                onChange={this.onChange}
                name="title"
                id="title"
                type="text"
                 className="validate title"
                required />
                <label  htmlFor="title">Title</label>
              </div>
            </div>
            <div className='row'>
                <div className='input-field col s12' id="content">
                   <TinyMCE
                    content={this.state.content || ''}
                    name='content'
                    config={{
                      plugins: 'autolink link image lists print preview',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                    }}
                    onChange={this.contentOnChange}
                  />
                </div>
              </div>
              <div className="col m3 s12">
                <select
                  name="access"
                  id="selectAccess"
                  onChange={this.onChange}
                  value={this.state.access}
                  className="browser-default"
                  required
                >
                  <option value="" disabled >Select Access Type</option>
                  <option value='public'>Public</option>
                  <option value='private'>Private</option>
                  <option value='role'>Role</option>
                </select>
              </div>
            <button href="#!" className="btn waves-effect waves-light modal-action center auth-button" id="done"type="submit" name="action" >Save
              <i className="material-icons right"></i>
            </button>
            <ResponseMessage status={this.props.status} />
          </form>
        </div>
      </div>
      </div>
    )
  }
}
const mapStoreToProps = (state) => {
  return {
    status: state.documentReducer.createStatus,
    documents: state.documentReducer.documents
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    CreateDocument: documentDetails => dispatch(newDocument(documentDetails)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(CreateDocument);