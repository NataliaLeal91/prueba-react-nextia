import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';


class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);

  }  

  componentDidMount() {
    setTimeout(() => {
      if (this.props.isSignedIn) {
        this.props.history.push('/benevits');
      } else {
        this.props.history.push('/login');
      }
    }, 1000);
  }

  render() {
    return (
      <div>
        <h3>Launch Screen</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth
  };
};

export default connect(
  mapStateToProps,
  { signIn }
)(LaunchScreen);
