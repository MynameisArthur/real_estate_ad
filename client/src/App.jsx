import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.scss';
import setAuthToken from './utils/setAuthToken';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import Navbar from './components/Navbar/Navbar';
import RouteContainer from './components/Routing/RouteContainer';

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
                    <RouteContainer />
                </Router>
            </Provider>
        </div>
    );
};

export default App;
