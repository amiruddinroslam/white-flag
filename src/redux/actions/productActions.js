import { ActionTypes } from './../constants/actionTypes'
import WhiteFlagDataService from './../../services/dataService'

export const fetchAllHelpRequest = () => async (dispatch) => {
    const response = await WhiteFlagDataService.getAllRequestHelp()
    let _data = []

    response.docs.forEach(item => {
        _data.push({...item.data(), id: item.id})
    })

    dispatch({
        type: ActionTypes.FETCH_ALL_HELP_REQUEST,
        payload: _data
    })
}

// export const addNewHelpRequest = (help) => async (dispatch) => {
//     return {
//         type: ActionTypes.ADD_NEW_HELP_REQUEST,
//         payload: help
//     }
// }

export const offerNewHelp = (offer) => {
    return {
        type: ActionTypes.OFFER_NEW_HELP,
        payload: offer
    }
}

