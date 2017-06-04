import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

const fieldValidators = {
  fullName: (value) => {
    const result = value.length >= 3;
    return result;
  },
  email: (value) => {
    const result = /([\d\w]+[\.\w\d]*)\+?([\.\w\d]*)?@([\w\d]+[\.\w\d]*)/.test(value);
    return result;
  },
  email2: (value, fields) => {
    const emailValid = fieldValidators.email((fields.email || {}).value);
    if (!fields.email || emailValid !== true) {
      return false;
    }
    const email = fields.email.value;
    return value === email;
  },
};

const fieldDefaultValues = {
  value: '',
  touched: false,
};

class RequestForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      showing: true,
    };
    this.sendRequest = this.sendRequest.bind(this);
  }
  componentDidMount() {
    this.inputFullName.focus();
  }
  getField(fieldName) {
    const currentField = this.state.fields[fieldName] || fieldDefaultValues;
    const field = {
      input: {
        onChange: this.handleChange.bind(this, fieldName),
        onBlur: this.handleBlur.bind(this, fieldName),
        value: currentField.value,
      },
      validationState: null,
      valid: fieldValidators[fieldName](currentField.value, this.state.fields),
    };
    if (currentField.touched && typeof field.valid !== 'undefined') {
      if (field.valid === true) {
        field.validationState = 'success';
      } else if (field.valid === false) {
        field.validationState = 'error';
      }
    }
    return field;
  }
  closeModal() {
    this.setState({
      showing: false,
    }, this.props.showHome);
  }
  handleBlur(fieldName) {
    const { fields } = this.state;
    const currentField = fields[fieldName] || fieldDefaultValues;
    fields[fieldName] = Object.assign({}, currentField, {
      touched: true,
    });
    this.setState({
      fields,
    });
  }
  handleChange(fieldName, e) {
    const { fields } = this.state;
    const currentField = fields[fieldName] || fieldDefaultValues;
    const value = e.target.value;
    if (currentField.value === value) {
      return;
    }
    fields[fieldName] = Object.assign({}, currentField, {
      value,
    });
    this.setState({ fields });
  }
  requestToClose() {
    clearTimeout(this.blurToHandle);
    this.setState({ showing: false });
  }
  sendRequest() {
    const { fields } = this.state;
    const allFields = ['fullName', 'email', 'email2'];
    allFields.map((field) => {
      if (!fields[field] || fields[field].touched !== true) {
        fields[field] = Object.assign({}, fieldDefaultValues, {
          touched: true,
        });
      }
    });
    this.setState({ fields }, () => {
      for (let i = 0; i < allFields.length; i++) {
        if (this.getField(allFields[i]).valid !== true) {
          return;
        }
      }
      this.props.sendRequest({
        email: fields.email.value,
        name: fields.fullName.value,
      });
    });
  }
  render() {
    const fullName = this.getField('fullName');
    const email = this.getField('email');
    const email2 = this.getField('email2');
    return (
      <Modal
        bsSize="sm"
        bsClass="modal"
        backdrop
        show={this.state.showing}
        autoFocus
        keyboard
        className="vertical-center"
        onHide={() => this.closeModal()}
        onExited={() => this.closeModal()}
      >
        <div>
          <Modal.Header>
            <Modal.Title>Request an invite</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="fullName" validationState={fullName.validationState}>
                <FormControl
                  tabIndex="1"
                  disabled={this.props.request.isFetching}
                  ref={(cmp) => {
                    this.inputFullName = ReactDOM.findDOMNode(cmp) || this.inputFullName;
                  }}
                  {...(fullName.input)}
                  type="text"
                  placeholder="Full Name"
                />
                {fullName.children}
              </FormGroup>
              <FormGroup controlId="email" validationState={email.validationState}>
                <FormControl
                  tabIndex="2"
                  disabled={this.props.request.isFetching}
                  {...(email.input)}
                  type="email"
                  placeholder="Email"
                />
                {email.children}
              </FormGroup>
              <FormGroup controlId="email2" validationState={email2.validationState}>
                <FormControl
                  tabIndex="3"
                  disabled={this.props.request.isFetching}
                  {...(email2.input)}
                  type="email"
                  placeholder="Confirm email"
                />
                {email2.children}
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              tabIndex="0"
              block
              onClick={this.sendRequest}
              disabled={this.props.request.isFetching}
            >
              {this.props.request.isFetching ? 'Sending, please wait...' : 'Send'}
            </Button>
          </Modal.Footer>
          {this.props.request.message &&
            <span className="error">
              {this.props.request.message}
            </span>
          }
        </div>
      </Modal>
    );
  }
}
RequestForm.propTypes = {
  showHome: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  request: PropTypes.shape({
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    data: PropTypes.string,
    isFetchingFailed: PropTypes.bool,
    message: PropTypes.string,
  }),
};
export default RequestForm;
