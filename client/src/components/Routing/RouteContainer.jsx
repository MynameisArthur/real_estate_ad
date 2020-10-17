import React from 'react';
import PrivateRoute from '../Routing/PrivateRoute';
import EstateForm from '../EstateForm/EstateForm';
import EstateDetails from '../Estate/EstateDetails';
import OfferForm from '../Offer/OfferForm';
import Comment from '../Comment/Comment';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import EstateList from '../EstateList/EstateList';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import NewPassword from '../NewPassword/NewPassword';
import Alert from '../Alert/Alert';
import Dashboard from '../Dashboard/Dashboard';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Prompt from '../Prompt/Prompt';


const RouteContainer = ({    
    prompt    
}) => {
    return (
        <section className='container'>
            {prompt.show && (
                <Prompt
                    action={`delete`} 
                />
            )}
            <Alert />
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/estates' component={EstateList} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route path='/forgotPassword' component={ForgotPassword} />
                <Route
                    exact
                    path='/newPassword/:resetToken'
                    component={NewPassword}
                />
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
                    component={() => <OfferForm edit={false} />}
                />
                <PrivateRoute
                    exact
                    path='/estate/:id/offer/:offerId'
                    component={() => <OfferForm edit={true} />}
                />
                <Route exact path='/estate/:id' component={EstateDetails} />
            </Switch>
        </section>
    );
};

const mapStateToProps = (state) => ({   
    prompt: state.prompt,
});

export default connect(mapStateToProps)(RouteContainer);
