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

export const fetchAllOfferRequest = () => async (dispatch) => {
    const response = await WhiteFlagDataService.getAllOfferHelp()
    let _data = []

    response.docs.forEach(item => {
        _data.push({...item.data(), id: item.id})
    })

    dispatch({
        type: ActionTypes.FETCH_ALL_OFFER_REQUEST,
        payload: _data
    })
}

export const setHepRequestById = (helpRequest) => {
    return {
        type: ActionTypes.SET_HELP_REQUEST_BY_ID,
        payload: helpRequest
    }
}

export const removeEditHelpRequest = () => {
    return {
        type: ActionTypes.REMOVE_EDIT_HELP_REQUEST
    }
}



