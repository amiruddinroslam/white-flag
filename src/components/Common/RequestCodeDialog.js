import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'lightgrey',
        padding: 5,
        textAlign: 'center'
    },
}))

export default function RequestCodeDialog({ open, handleClose, type, code }) {
    const classes = useStyles()

    const [isCopied, setIsCopied] = useState()

    const copyText = () => {
        navigator.clipboard.writeText(code)
        setIsCopied(true)
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Your {type} request code</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className={classes.root}>
                        <h1>{code}</h1>
                    </div>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    Please screenshot or keep your {type} request code for future use.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                {!isCopied && <Button onClick={copyText} color="primary" autoFocus>
                    Copy
                </Button>}
                {isCopied && <Button color="primary" disabled>
                    Copied!
                </Button>}
                <Button onClick={handleClose} color="primary">
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
