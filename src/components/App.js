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
import DocumentationLayoutComponent from '../documentation/DocumentationLayout';

import Landing from '../pages/landing'; 

const PrivateRoute = ({dispatch, component, ...rest }) => {
    // if (!localStorage.getItem('token')) {
    //     dispatch(logoutUser());
    //     return (<Redirect to="/app"/>)
    // } else {
        return ( // eslint-disable-line
            <Route {...rest} render={props => (React.createElement(component, props))}/>
        );
    // }
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
                    <Route path="/app" exact render={() => <Redirect to="/app/main/vault-summary"/>}/>
                    <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    <Route path="/documentation" exact
                           render={() => <Redirect to="/documentation/getting-started/overview"/>}/>
                    <Route path="/documentation" component={DocumentationLayoutComponent}/>
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
