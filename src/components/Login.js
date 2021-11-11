import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';

class Login extends React.Component {

  onSubmit = () => {
    this.props.signIn();
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <button onClick={this.onSubmit}>login</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth,
    isApiError: state.apiError.isError,
    apiError: state.apiError.error
  };
};

export default connect(
  mapStateToProps,
  { signIn }
)(Login);
