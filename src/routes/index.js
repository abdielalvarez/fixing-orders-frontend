import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../layouts/home';
import SignUpView from '../layouts/signUp';

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/sign-up'} component={SignUpView} />
                    <Route exact path={'/sign-in'} component={SignUpView} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default AppRoutes
