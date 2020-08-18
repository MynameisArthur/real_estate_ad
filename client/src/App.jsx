import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Estates from './components/Estates/Estates';
import Alert from './components/Alert/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/Routing/PrivateRoute';
import AddEstate from './components/AddEstate/AddEstate';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import Dashboard from './components/Dashboard/Dashboard';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <div className='App'>
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route exact path='/estates' component={Estates} />
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <PrivateRoute
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <Route path='/addEstate' component={AddEstate} />
                        </Switch>
                    </section>
                </Router>
            </Provider>
        </div>
    );
};

export default App;
