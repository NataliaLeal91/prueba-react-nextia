import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';

class Login extends React.Component {

  onSubmit = () => {
    this.props.signIn();
  };

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.history.push('/benevits');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSignedIn && (this.props.isSignedIn !== prevProps.isSignedIn)) {
      this.props.history.push('/benevits');
    }
  }

  render() {
    console.log(this.props.isSignedIn);
    return (
      <div>
        <h3>Login</h3>
        <button onClick={this.onSubmit}>login</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth,
    isApiError: state.apiError.isError,
    apiError: state.apiError.error
  };
};

export default connect(
  mapStateToProps,
  { signIn }
)(Login);