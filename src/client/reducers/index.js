import {combineReducers} from 'redux';

import auth from './auth';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    auth,
    todos,
    visibilityFilter
});
