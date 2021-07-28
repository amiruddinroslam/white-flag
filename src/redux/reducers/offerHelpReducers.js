import { ActionTypes } from './../constants/actionTypes'
const initialState = {
    offerHelp: []
}

export const offerNewHelpReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ActionTypes.OFFER_NEW_HELP:
            return { ...state, offerHelp: payload }
        default:
            return state
    }
}