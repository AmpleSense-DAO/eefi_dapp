import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* eslint-disable */
import ErrorPage from '../pages/error/ErrorPage';
/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from './Layout/Layout';
import { WalletConnect, ProviderContext } from './Wallet/walletConnect'
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import { logoutUser } from '../actions/user';




const PrivateRoute = ({component, context, ...rest }) => {
    if(context)
        return <Route {...rest} render={props => (React.createElement(component, props))}/>;
    return <div></div>
};





const CloseButton = ({closeToast}) => <i onClick={closeToast} className="la la-close notifications-close"/>

class App extends React.PureComponent {

  store = {
      provider : false
  }

  render() {
    return (
        <div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
            <WalletConnect>
                <ProviderContext.Consumer>
                    {context => (
                        <HashRouter>
                            <Switch>
                                <Route path="/" exact render={() => <Redirect to="/app/main"/>}/>
                                <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>
                                <PrivateRoute path="/app" component={LayoutComponent} context={context}/>
                                <Route path="/error" exact component={ErrorPage}/>
                                <Route component={ErrorPage}/>
                            </Switch>
                        </HashRouter>
                    )}
                </ProviderContext.Consumer>
            </WalletConnect>
        </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
