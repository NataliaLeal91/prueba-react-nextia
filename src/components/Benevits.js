import React, { Fragment } from 'react';
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

    // if(this.state.loading || !this.state || !this.state.data) {
    if(!this.props.benevits || !this.props.benevits.benevits) {
      return <div>Loading...</div>
    } else {

      return (
        <Fragment>
          <div className="shadow bg-base-200 drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" /> 
            <div className="flex flex-col items-center justify-center drawer-content gray-color" style={{maxHeight: 'none'}}>



              <div className="w-full navbar red-color">
                <div className="flex-none lg:hidden">
                  <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </label>
                </div> 

                <div className="flex-none hidden lg:block">
                  <ul>
                    <li>
                      <label htmlFor="my-drawer" className="cursor-pointer" >
                        <div className="menu-icon" />
                        <div className="menu-icon" />
                        <div className="menu-icon" />
                      </label>
                    </li> 
                  </ul>
                </div>

                <div className="flex-1 px-2 mx-2">
                  <span>
                    <img className="h-16" src={'logo.png'} />
                  </span>
                </div> 
              </div>
 




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

            </div> 

            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay" style={{position: 'fixed', width: '100%', height: '100vh'}}></label> 
              <ul className="menu p-4 overflow-y-auto w-80 red-color text-base-content" style={{position: 'fixed', height: '100vh'}}>
                <li>
                  <img src={'logo.png'} />
                </li>
                <li>
                  <button className="h-20 text-white text-left cursor-pointer font-bold" onClick={() => {
                    this.props.history.push('/benevits');
                  }}>Benevits</button>
                </li>
                <li style={{position: 'absolute', bottom: 0, width: '100%'}}>
                  <button className="h-20 text-white text-left cursor-pointer font-bold" onClick={() => {
                    this.props.signOut();
                  }}>Cerrar sesión</button>
                </li>
              </ul>
            </div>
          </div>




        </Fragment>
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