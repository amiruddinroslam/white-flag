import React, { useState, useEffect } from 'react'
import WhiteFlagDataService from './../../services/dataService'
import { useSelector, useDispatch } from 'react-redux'
import isEqual from 'lodash/isEqual'
import SimpleSnackbar from '../Common/SimpleSnackbar'
import GeolocationService from '../../services/GeolocationService'
import ConfirmationDialog from './../Common/ConfirmationDialog'
import CommonBackdrop from '../Common/CommonBackdrop'
import RequestCodeDialog from '../Common/RequestCodeDialog'
import { fetchAllHelpRequest } from './../../redux/actions/productActions'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import CircularProgress from '@material-ui/core/CircularProgress'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

export default function AskHelpForm(props) {
    const [fullName, setFullName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [description, setDescription] = useState('')
    const [latLng, setLatLng] = useState('')
    const [address, setAddress] = useState('')
    const [isLocationLoading, setIsLocationsLoading] = useState(false)
    const [status, setStatus] = useState({})
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [requestCode, setRequestCode] = useState('')
    //confirmation dialog
    const [openConfirmationDilalog, setOpenConfirmationDialog] = useState(false)
    const [openRequestCodeDialog, setOpenRequestCodeDialog] = useState(false)

    const dispatch = useDispatch()
    const requestHelpData = useSelector((state) => state.requestHelp.requestHelp)

    const handleSubmit = (event) => {
        event.preventDefault()
        closeAskHelp()
        setOpenConfirmationDialog(true)
    }

    const addRequestHelp = async () => {
        setIsLoading(true)
        try {
            // no need to add into the state, directly add to db
            const response = await WhiteFlagDataService.createRequestHelp({
                fullName,
                phoneNo,
                description,
                latLng: WhiteFlagDataService.formatGeoPoint({ lat: latLng.split(',')[0], lng: latLng.split(',')[1] }),
                address: address,
                time: new Date()
            })
            console.log(response.id)
            setStatus({
                type: 'success',
                msg: 'Your request is successfully sent!',
                date: new Date()
            })

            dispatch(fetchAllHelpRequest())
            setIsLoading(false)
            setRequestCode(response.id)
            setOpenRequestCodeDialog(true)

        } catch (error) {
            console.log(error)
            setStatus({
                type: 'error',
                msg: 'An error occured',
                date: new Date()
            })

            setIsLoading(false)
        }

        clearForm()
        closeAskHelp()
    }

    const closeAskHelp = () => {
        props.closeAskHelp(false)
    }

    const clearForm = () => {
        setFullName('')
        setPhoneNo('')
        setDescription('')
        setLatLng('')
        setAddress('')
    }

    const currentLocation = async () => {
        setIsLocationsLoading(true)
        const position = await GeolocationService.locateUser()
        if (position) {
            if (!validateLocation({ lat: position.coords.latitude, lng: position.coords.longitude })) {
                setLatLng(`${position.coords.latitude},${position.coords.longitude}`)

                const geocodeAddress = await getAddressfromLatLng(position)
                setAddress(geocodeAddress.results[0].formatted_address)
            } else {
                console.log(`Cannot use a same location twice!`)
                setStatus({
                    type: 'error',
                    msg: 'Cannot use a same location twice!',
                    date: new Date()
                })
                clearForm()
                closeAskHelp()
            }
            setIsLocationsLoading(false)
        }
    }

    const getAddressfromLatLng = async (position) => {
        let result
        try {
            result = GeolocationService.getAddressFromLatLng({ lat: position.coords.latitude, lng: position.coords.longitude })
        } catch (error) {
            console.log(error)
        }

        return result
    }

    const validateLocation = (latLng) => {
        requestHelpData.forEach(request => {
            let location = { lat: request.latLng.latitude, lng: request.latLng.longitude }
            return isEqual(latLng, location)
        })
    }

    const handleConfirmationDialog = (confirmation) => {
        setConfirmSubmit(confirmation)
        setOpenConfirmationDialog(false)
    }

    const cancel = () => {
        clearForm()
        closeAskHelp()
    }

    const handleRequestCodeDialog = () => setOpenRequestCodeDialog(false)

    useEffect(() => {
        if (confirmSubmit === true) {
            console.log('sending data to firebase')
            addRequestHelp()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmSubmit])

    return (
        <div>
            {isLoading ? <CommonBackdrop isOpen={isLoading} /> : null}
            {Object.keys(status).length > 0 ? <SimpleSnackbar id={status.date} type={status.type} text={status.msg} /> : null }
            {openConfirmationDilalog ? <ConfirmationDialog
                isOpen={openConfirmationDilalog}
                handleClose={handleConfirmationDialog}
                title="Confirm to submit your information?"
                data={{
                    fullName: fullName,
                    phoneNo: phoneNo,
                    description: description,
                    address: address,
                }}
            />: null}
            {openRequestCodeDialog ? <RequestCodeDialog
                    open={openRequestCodeDialog}
                    handleClose={handleRequestCodeDialog}
                    type={'Offer'}
                    code={requestCode}
                /> : null}
            <Dialog 
                open={props.openInd} 
                onClose={closeAskHelp} 
                aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">Ask for help from others.</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To list your help in the maps, we requires some details first.
                        </DialogContentText>
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
                            multiline
                            maxRows={5}
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
                            readOnly
                            margin="dense"
                            variant="outlined"
                            id="location"
                            label="Exact location"
                            fullWidth
                            value={latLng}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle location"
                                            onClick={currentLocation}
                                        >
                                            {isLocationLoading ? <CircularProgress size="30px" /> : <MyLocationIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                readOnly: true
                            }}
                        />
                        {address ? <TextField
                            autoFocus
                            disabled
                            multiline
                            maxRows={5}
                            margin="dense"
                            variant="outlined"
                            id="formattedAddress"
                            label="Your nearby Address"
                            fullWidth
                            value={address}
                        /> : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancel} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
