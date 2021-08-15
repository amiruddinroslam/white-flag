import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
// import AskHelpForm from '../Forms/AskHelpForm'
// import OfferHelpForm from '../Forms/OfferHelpForm'
import ConfirmationDialog from './../Common/ConfirmationDialog'
import { setHepRequestById, fetchAllOfferRequest, fetchAllHelpRequest } from './../../redux/actions/productActions'
import WhiteFlagDataService from './../../services/dataService'
import SimpleSnackbar from './SimpleSnackbar'
import CommonBackdrop from './CommonBackdrop'

export default function SubmitCodeDialog({ open, handleClose, action, type }) {

    const [code, setCode] = useState('')
    // const [askHelpIndicator, setAskHelpIndicator] = useState(false)
    // const [offerHelpIndicator, setOfferHelpIndicator] = useState(false)
    // const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [editData, setEditData] = useState({})
    const [status, setStatus] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const requestHelpCollection = useSelector((state) => state.requestHelp.requestHelp)
    const offerHelpCollection = useSelector((state) => state.offerHelp.offerHelp)

    const handleSubmit = (event) => {
        event.preventDefault()
        let match = {}

        if (type === 'Request')
           match = requestHelpCollection.find(request => request.id === code) || {}
        else if (type === 'Offer')
            match = offerHelpCollection.find(request => request.id === code) || {}

        setEditData(match)

        if (Object.keys(match).length > 0) {
            if (action === 'edit') {
                // setEditData(match)
                // setIsEdit(true)

                // if (type === 'Help')
                //     setAskHelpIndicator(true)
                // else if (type === 'Offer')
                //     setOfferHelpIndicator(true)

                dispatch(setHepRequestById(match))
                handleClose(true)
            } else if (action === 'delete') {
                setIsDelete(true)
            }
        } else {
            console.log('No posting with the entered key was found')
        }
    }

    const handleConfirmationDialog = async (confirmation) => {
        if (confirmation) {
            setIsLoading(true)
            await WhiteFlagDataService[`delete${type}Help`](code).then(() => {
                setStatus({
                    date: new Date(),
                    type: 'success',
                    msg: 'Successfully deleted!'
                })
                setIsDelete(false)
                if (type === 'Request') {
                    dispatch(fetchAllHelpRequest())
                } else if (type === 'Offer') {
                    dispatch(fetchAllOfferRequest())
                }
                setIsLoading(false)
                setTimeout(() => {
                    handleClose()
                }, 1000)
            })
        }
    }

    return (
        <div>
            {isLoading ? <CommonBackdrop isOpen={isLoading} /> : null}
            {Object.keys(status).length > 0 ? <SimpleSnackbar id={status.date} type={status.type} text={status.msg} /> : null }
            {/* {askHelpIndicator ? <AskHelpForm
                openInd={askHelpIndicator}
                closeAskHelp={() => setAskHelpIndicator(false)}
                isEdit={isEdit}
                editData={editData}
            /> : null}
            {offerHelpIndicator ? <OfferHelpForm
                openInd={offerHelpIndicator}
                closeOfferHelp={() => setOfferHelpIndicator(false)}
                isEdit={isEdit}
                editData={editData}
            /> : null} */}
            {isDelete ? 
                <ConfirmationDialog
                    isOpen={isDelete}
                    handleClose={handleConfirmationDialog}
                    title="Confirm to Delete your listing?"
                    data={{
                        fullName: editData.fullName,
                        phoneNo: editData.phoneNo,
                        description: editData.description,
                        address: editData.address,
                    }}
                    isDeleteConfirmation
                />
            : null}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="alert-dialog-title">Enter your unique request code to {action} posting</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    required
                    disabled={isLoading}
                    margin="dense"
                    id="code"
                    label="Unique request code"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={code}
                    onChange={ e => setCode(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus disabled={isLoading}>
                    {action} Posting
                </Button>
                </DialogActions>
            </form>
            </Dialog>
        </div>
    )
}
