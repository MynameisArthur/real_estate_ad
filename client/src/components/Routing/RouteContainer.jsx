import React from 'react';
import PrivateRoute from '../Routing/PrivateRoute';
import EstateForm from '../EstateForm/EstateForm';
import EstateDetails from '../Estate/EstateDetails';
import Offer from '../Offer/Offer';
import Comment from '../Comment/Comment';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import EstateList from '../EstateList/EstateList';
import Alert from '../Alert/Alert';
import Dashboard from '../Dashboard/Dashboard';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Prompt from '../Prompt/Prompt';
import {deleteEstate} from '../../actions/estate';

const RouteContainer = ({
    selectedEstate,
    location,
    history,
    prompt,
    deleteEstate,
}) => {
    return (
        <section className='container'>
            {prompt.show && (
                <Prompt
                    type={`delete`}
                    callback={() =>
                        deleteEstate(selectedEstate, location.pathname, history)
                    }
                />
            )}
            <Alert />
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/estates' component={EstateList} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
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
                <Route exact path='/estate/:id' component={EstateDetails} />
            </Switch>
        </section>
    );
};

const mapStateToProps = (state) => ({
    selectedEstate: state.estate.selectedEstate,
    prompt: state.prompt,
});

export default connect(mapStateToProps, {
    deleteEstate,
})(withRouter(RouteContainer));
