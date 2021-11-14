import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';


import ErrorAlert from '../components/ErrorAlert';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'prueba@nextia.mx',
      password: 'PruebaNextia2021',
      completedForm: false
    };
    
    this.handleOnChangeLogin = this.handleOnChangeLogin.bind(this); 
  }  

  onSubmit = () => {
    const { username, password, completedForm } = this.state;

    if (completedForm) {
      this.props.signIn(username, password);
    }
  };

  componentDidMount() {
    let { username, password, completedForm } = this.state;

    if (this.props.isSignedIn) {
      this.props.history.push('/benevits');
    }


    completedForm = (username && password); 
    
    this.setState({ completedForm })

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSignedIn && (this.props.isSignedIn !== prevProps.isSignedIn)) {
      this.props.history.push('/benevits');
    }
  }

   handleOnChangeLogin(e, type) {
    let { username, password, completedForm } = this.state;

    username = (type === 'username') ? e.target.value: username;
    password = (type === 'password') ? e.target.value: password;

    completedForm = (username && password);

    this.setState({ username, password, completedForm });
  }

  render() {
    return (
      <Fragment>
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
              <input value={this.state.username}
                placeholder="Correo"
                className="w-full pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                type="email" required
                onChange={(e) => this.handleOnChangeLogin(e, "username")}/>
            </div>
          </div>
          <div className="flex items-center justify-center object-center ">
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mt-5">
              <input value={this.state.password}
                placeholder="Contraseña"
                className="w-full pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                type="password"
                onChange={(e) => this.handleOnChangeLogin(e, "password")} />
            </div>
          </div>
          <div className="flex items-center justify-center object-center ">
            <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mt-5">
              <button
                onClick={this.onSubmit}
                className={`w-full h-10 px-6 red-color rounded-full focus:shadow-outline ${this.state.completedForm ? 'transition duration-300 ease-in-out transform hover:scale-105': 'gray-color cursor-not-allowed	'} text-white font-semibold`}>
                Entrar
              </button>
            </div>
          </div>
        </div>
        <ErrorAlert errorMessage={"Usuario y/o contraseña incorrectos. Favor de verificar su información."} />
      </Fragment>
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