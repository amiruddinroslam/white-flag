import React, { useEffect } from 'react'
import { formatRelative } from 'date-fns/esm'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CallIcon from '@material-ui/icons/Call'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import DirectionsIcon from '@material-ui/icons/Directions'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoDialog({ open, data, closeInfoDialog }) {
    console.log(data)

    const title = ({ type, fullName }) => {
        switch (type) {
            case `Help`:
                return (
                    <div className="help-title">
                        {fullName} need help 🏳️
                        <ClearIcon style={{ float: 'right', cursor: 'pointer' }} onClick={() => closeInfoDialog(false)} />
                    </div>
                )
            case 'Offer':
                return (
                    <div className="offer-title">
                        {fullName} want to help 👐
                        <ClearIcon style={{ float: 'right', cursor: 'pointer' }} onClick={() => closeInfoDialog(false)} />
                    </div>
                )
            default:
                return type
        }
    }

    const handleCallPhone = () => {
        window.open(`tel:${data.phoneNo}`)
    }

    const handleWhatsapp = () => {
        let no
        if (data.phoneNo.charAt(0) === '6')
            no = data.phoneNo
        else
            no = 6 + data.phoneNo

        window.open(`https://api.whatsapp.com/send?phone=${no}`)
    }

    const handleDirection = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${data.latLng.latitude},${data.latLng.longitude}`)
    }

    const closeInfo = () => closeInfoDialog(false)

    return (
        <div>
            <Dialog
                maxWidth="sm"
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeInfo}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {title(data)}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DialogContentText id="alert-dialog-slide-description" style={{ fontStyle: 'italic' }}>{data.description}</DialogContentText>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip
                                icon={<DirectionsIcon />}
                                label="Open Maps for direction"
                                clickable
                                onClick={handleDirection}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="overline" style={{ float: 'right' }}>{formatRelative(new Date(data.time.seconds * 1000), new Date())}</Typography>
                        </Grid>
                        {/* <Grid item xs={5}>
                            <Chip avatar={<Avatar>ID</Avatar>} label={data.id} />
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCallPhone} color="primary" fullWidth variant="outlined" startIcon={<CallIcon />}>
                    Call
                </Button>
                <Button onClick={handleWhatsapp} color="secondary" fullWidth variant="outlined" startIcon={<WhatsAppIcon />}>
                    Whatsapp
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}