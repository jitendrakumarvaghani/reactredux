import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';

const Content = props => (
  <div className="content">
    <h1>
      A better way<br />
      to enjoy every day.
    </h1>
    <h3>Be the first to know when we lauch.</h3>
    <div>
      <Button onClick={() => props.showRequestForm()} >Request an invite</Button>
    </div>
  </div>
);

Content.propTypes = {
  showRequestForm: PropTypes.func.isRequired,
};
export default Content;
