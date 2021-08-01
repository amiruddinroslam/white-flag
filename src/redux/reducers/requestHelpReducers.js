import { ActionTypes } from './../constants/actionTypes'
const initialState = {
    requestHelp: []
}

export const requestNewHelpReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ActionTypes.FETCH_ALL_HELP_REQUEST:
            return { ...state, requestHelp: payload }
        default:
            return state
    }
}