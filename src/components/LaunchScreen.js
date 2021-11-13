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
    }, 4000);
  }

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center red-color">
        <div className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <img className="fade-in" src={'logo.png'} />
            <div className="loader" />
        </div>
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
