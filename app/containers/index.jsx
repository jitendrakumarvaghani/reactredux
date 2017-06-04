import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './../components/header';
import Footer from './../components/footer';
import Content from './../components/content';
import RequestForm from './../components/request-form';
import Response from './../components/response';
import { showRequestForm, showHome, sendRequest } from './../actions';

const Home = props => (
  <div className="app">
    <Header />
    <Content showRequestForm={props.showRequestForm} />
    {
      props.currentScreen === 'requestform' &&
      <RequestForm
        showHome={props.showHome}
        sendRequest={props.sendRequest}
        request={props.request}
      />
    }
    {
      props.currentScreen === 'response' &&
      <Response
        showHome={props.showHome}
      />
    }
    <Footer />
  </div>
);

Home.propTypes = {
  currentScreen: PropTypes.string.isRequired,
  showRequestForm: PropTypes.func.isRequired,
  showHome: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  request: PropTypes.shape({
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    data: PropTypes.string,
    isFetchingFailed: PropTypes.bool,
  }),
};
Home.defaultProps = {
  request: null,
};
export const HomeBase = Home;

export default connect(
  state => ({
    currentScreen: state.invite.currentScreen,
    request: state.invite.request,
  }),
  dispatch => bindActionCreators({
    showRequestForm,
    showHome,
    sendRequest,
  }, dispatch),
)(Home);
