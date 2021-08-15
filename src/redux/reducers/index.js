import { combineReducers } from 'redux'
import { requestNewHelpReducer, setNewHelpByIdReducer } from './requestHelpReducers'
import { offerNewHelpReducer } from './offerHelpReducers'

const reducers = combineReducers({
    requestHelp: requestNewHelpReducer,
    requestHelpSelected: setNewHelpByIdReducer,
    offerHelp: offerNewHelpReducer
});

export default reducers;