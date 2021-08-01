import { ActionTypes } from './../constants/actionTypes'
const initialState = {
    offerHelp: []
}

export const offerNewHelpReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ActionTypes.FETCH_ALL_OFFER_REQUEST:
            return { ...state, offerHelp: payload }
        default:
            return state
    }
}