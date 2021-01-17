import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../layouts/home';

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default AppRoutes
