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

    // if(this.state.loading || !this.state || !this.state.data) {
    if(!this.props.benevits || !this.props.benevits.benevits) {
      return <div>Loading...</div>
    } else {

      return (
        <div className="gray-color">
            {this.props.wallets ?
              this.props.wallets.wallets.map((wallet) => {

                let unlockedBenevits = this.props.benevits.benevits.unlocked.filter((benevit) => {
                  return benevit.wallet.id === wallet.id
                });

                let lockedBenevits = this.props.benevits.benevits.locked.filter((benevit) => {
                  return benevit.wallet.id === wallet.id
                });
                
                return <div className="container" style={{margin: "0 auto"}}>
                  <h1 className="font-bold py-4">{wallet.name}</h1>

                  <div className="grid justify-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">

                    {unlockedBenevits ? 
                      unlockedBenevits.map((benevit) => {
                        console.log("aqui esta", benevit);
                        return <div className="rounded bg-white w-full" >
                          <div className="flex h-20 rounded-t-lg " style={{ backgroundColor: benevit.primary_color }}>
                            <img className="w-full" src={benevit.ally.mini_logo_full_path}/>
                          </div>
                          <div className="flex h-52 p-2">
                            <div className="w-full">
                              <p className="font-bold">{benevit.ally.name}</p>
                              <p>{benevit.ally.description}</p>
                              <p className="text-sm mt-3">{benevit.title}</p>
                            </div>
                          </div>
                        </div>
                      })
                    : null}
                  
                    {lockedBenevits ?
                      lockedBenevits.map((benevit) => {
                        return <div className="p-2 rounded bg-white w-full">
                            <div className="flex h-52">
                              <img className="w-full m-auto" src={benevit.vector_full_path} />
                            </div>
                            <div className="flex h-20">
                              <button
                                onClick={this.onSubmit}
                                className="w-full self-end h-10 px-6 red-color rounded-full focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 text-white font-semibold">
                                Lo quiero
                              </button>
                            </div>
                        </div>
                      })
                    :null}
                  </div>
                </div>
              })
            : null}
          <hr />
          {/* <button onClick={() => this.props.signOut()}>Cerrar sesión</button> */}
        </div>
      );
    }
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