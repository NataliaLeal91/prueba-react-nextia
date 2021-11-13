import React from 'react';
import { connect } from 'react-redux';
import {
  fetchWallets, fetchBenevits, signOut
} from '../actions';

class Benevits extends React.Component {
  constructor(props){  
    super(props);  

  }  

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchWallets(this.props.user.user.authToken);
      this.props.fetchBenevits(this.props.user.user.authToken);
    } else  {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isSignedIn) {
      this.props.history.push('/login');
    }
  }

  render() {
    console.log(this.props.wallets);
    console.log(this.props.benevits);
    return (
      <div>
        <h3>Benevits</h3>
        <button onClick={() => this.props.signOut()}>Cerrar sesión</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth,
    wallets: state.wallets,
    benevits: state.benevits,
    isApiError: state.apiError.isError,
    apiError: state.apiError.error
  };
};

export default connect(
  mapStateToProps,
  { fetchWallets, fetchBenevits, signOut }
)(Benevits);