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
    return (
      <div>
        <div className="red-color">
          <div className="flex items-center justify-center h-40 md:h-80 object-center ">
            <div className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
              <img src={'logo.png'} />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center object-center ">
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mt-5">
              <input placeholder="Correo" className="w-full pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" type="text"/>
            </div>
          </div>
          <div className="flex items-center justify-center object-center ">
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mt-5">
              <input placeholder="Contraseña" className="w-full pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" type="password"/>
            </div>
          </div>
          <div className="flex items-center justify-center object-center ">
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mt-5">
              <button onClick={this.onSubmit} className="w-full h-10 px-6 red-color  rounded-full focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 text-white font-semibold">
                Entrar
              </button>
            </div>
          </div>
        </div>
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