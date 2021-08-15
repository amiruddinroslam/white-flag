import { ActionTypes } from './../constants/actionTypes'
// const initialState = {
//     requestHelp: [],
//     currentRequestHelp: {}
// }

export const requestNewHelpReducer = (state = { requestHelp: [] }, { type, payload }) => {
    switch(type) {
        case ActionTypes.FETCH_ALL_HELP_REQUEST:
            return { ...state, requestHelp: payload }
        default:
            return state
    }
}

export const setNewHelpByIdReducer = (state = { currentRequestHelp: {}, isEdit: false }, { type, payload }) => {
    switch(type) {
        case ActionTypes.SET_HELP_REQUEST_BY_ID:
            return { ...state, currentRequestHelp: payload, isEdit: true }
        case ActionTypes.REMOVE_EDIT_HELP_REQUEST:
            return { ...state, isEdit: false}
        default:
            return state
    }
}