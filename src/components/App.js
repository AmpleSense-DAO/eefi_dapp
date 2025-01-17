import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';

import Landing from '../pages/landing'; 


const PrivateRoute = ({dispatch, component, ...rest }) => {

        return ( // eslint-disable-line
            <Route {...rest} render={props => (React.createElement(component, props))}/>
        );
};

const CloseButton = ({closeToast}) => <i onClick={closeToast} className="la la-close notifications-close"/>

class App extends React.PureComponent {
  
  render() {
    return (
        <div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
            <HashRouter>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="landing"/>}/>
                    <Route path="/app" exact render={() => <Redirect to="/app/home/vault-summary"/>}/>
                    <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    <Route path="/landing" exact component={Landing}/>
                    <Route path="/error" exact component={ErrorPage}/>
                    <Route component={ErrorPage}/>

                </Switch>
            </HashRouter>
        </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
