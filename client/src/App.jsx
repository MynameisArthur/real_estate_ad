import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EstateList from './components/EstateList/EstateList';
import Alert from './components/Alert/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/Routing/PrivateRoute';
import EstateForm from './components/EstateForm/EstateForm';
import EstateDetails from './components/Estate/EstateDetails';
import Offer from './components/Offer/Offer';
import Comment from './components/Comment/Comment';
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
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route exact path='/' component={Landing} />
                            <Route
                                exact
                                path='/estates'
                                component={EstateList}
                            />
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
                            <PrivateRoute
                                path='/addEstate'
                                component={() => <EstateForm edit={false} />}
                            />
                            <PrivateRoute
                                path='/editEstate/:id'
                                component={() => <EstateForm edit={true} />}
                            />
                            <PrivateRoute
                                exact
                                path='/estate/:id/comment'
                                component={() => <Comment edit={false} />}
                            />
                            <PrivateRoute
                                path='/estate/:id/comment/:commentId'
                                component={() => <Comment edit={true} />}
                            />
                            <PrivateRoute
                                exact
                                path='/estate/:id/offer'
                                component={() => <Offer edit={false} />}
                            />
                            <PrivateRoute
                                exact
                                path='/estate/:id/offer/:offerId'
                                component={() => <Offer edit={true} />}
                            />
                            <Route
                                exact
                                path='/estate/:id'
                                component={EstateDetails}
                            />
                        </Switch>
                    </section>
                </Router>
            </Provider>
        </div>
    );
};

export default App;
