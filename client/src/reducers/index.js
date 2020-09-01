import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import estate from './estate';
import profile from './profile';
import offer from './offer';

export default combineReducers({alert, auth, estate, profile, offer});
