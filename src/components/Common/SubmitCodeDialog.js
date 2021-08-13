import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
// import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'

// import WhiteFlagDataService from './../../services/dataService'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: 'lightgrey',
//         padding: 5,
//         textAlign: 'center'
//     },
// }))

export default function SubmitCodeDialog({ open, handleClose, action, type }) {
    // const classes = useStyles()

    const [code, setCode] = useState('')
    const dispatch = useDispatch()
    console.log(dispatch)
    const requestHelpCollection = useSelector((state) => state.requestHelp.requestHelp)
    const offerHelpCollection = useSelector((state) => state.offerHelp.offerHelp)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (checkIdCollections) {
            if (action === 'edit') {
                console.log('edit')
            }
        } else {
            
        }
    }

    const checkIdCollections = () => {
        let match

        if (type === 'Help') {
           match = requestHelpCollection.some(request => request.id === code)
        } else if (type === 'Offer') {
            match = offerHelpCollection.some(request => request.id === code)
        }
        console.log(match)
        return match
    }

    return (
        <div>
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
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                    {action} Posting
                </Button>
                </DialogActions>
            </form>
            </Dialog>
        </div>
    )
}
