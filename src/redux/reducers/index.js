import { combineReducers } from 'redux'
import { requestNewHelpReducer } from './requestHelpReducers'
import { offerNewHelpReducer } from './offerHelpReducers'

const reducers = combineReducers({
    requestHelp: requestNewHelpReducer,
    offerHelp: offerNewHelpReducer
});

export default reducers;