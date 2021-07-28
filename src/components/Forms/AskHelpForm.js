import React, { useState } from 'react'
import WhiteFlagDataService from './../../services/dataService'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import geolocationService from '../../services/geolocationService'
import SimpleAlert from '../Common/SimpleAlert'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import CircularProgress from '@material-ui/core/CircularProgress'


export default function AskHelpForm(props) {
    const [fullName, setFullName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [description, setDescription] = useState('')
    const [latLng, setLatLng] = useState({})
    const [isLocationLoading, setIsLocationsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            // no need to add into the state, directly add to db
            const response = await WhiteFlagDataService.createRequestHelp({
                fullName,
                phoneNo,
                description,
                latLng: WhiteFlagDataService.formatGeoPoint(latLng),
                time: new Date()
            })
            console.log(response)
            setIsSuccess('success')

        } catch (error) {
            console.log(error)
            setIsSuccess('error') 
        }

        clearForm();
        closeAskHelp();
    }

    const closeAskHelp = () => {
        props.closeAskHelp(false)
    }

    const clearForm = () => {
        setFullName('')
        setPhoneNo('')
        setDescription('')
        setLatLng({})
    }

    const currentLocation = async () => {
        setIsLocationsLoading(true)
        const position = await geolocationService.locateUser()
        if (position) {
            setLatLng({
                lat: position?.coords.latitude,
                lng: position?.coords.longitude
            })
            setIsLocationsLoading(false)
        }
    }

    const formatLatLng = (coords) => { 
        return Object.keys(coords).length === 0 ? 
        `Click on the locate icon to fill in your location` 
        : `${coords.lat}, ${coords.lng}`
    }

    return (
        <div>
            {/* {(isSuccess === 'success' ? 
                <SimpleAlert type={isSuccess} text="Your request is successfully sent!" /> 
                : <SimpleAlert type={isSuccess} text="An error occured" />)} */}
                <SimpleAlert type="success" text="Your request is successfully sent!" show={isSuccess !== ''}/> 
            <Dialog open={props.openInd} onClose={closeAskHelp} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ask for help from others.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To list your help in the maps, we requires some details first.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            variant="outlined"
                            id="fullName"
                            label="Full Name"
                            fullWidth
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            variant="outlined"
                            id="phoneNo"
                            label="Phone Number"
                            type="tel"
                            fullWidth
                            value={phoneNo}
                            onChange={e => setPhoneNo(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            variant="outlined"
                            id="description"
                            label="Description on what you need"
                            fullWidth
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            required
                            disabled
                            margin="dense"
                            variant="outlined"
                            id="location"
                            label="Exact location"
                            fullWidth
                            value={formatLatLng(latLng)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle password visibility"
                                            onClick={currentLocation}
                                        >
                                            {isLocationLoading ? <CircularProgress size="30px" /> : <MyLocationIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAskHelp} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" type="submit">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
