import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default function SimpleSnackbar({ id, type, text }) {
    const [open, setOpen] = useState(true)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setOpen(false);
    }

    useEffect(() => {
        setOpen(true)
    }, [id])

    return (
        <div>
            <Snackbar
                // anchorOrigin={{
                // vertical: 'bottom',
                // horizontal: 'left',
                // }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    )
}
