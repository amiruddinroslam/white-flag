import React, { useState } from 'react'
import { formatRelative } from 'date-fns/esm'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CallIcon from '@material-ui/icons/Call'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import DirectionsIcon from '@material-ui/icons/Directions'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box'
import SubmitCodeDialog from './SubmitCodeDialog'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

export default function InfoDialog({ open, data, closeInfoDialog }) {

    const [action, setAction] = useState('')
	const [openAction, setOpenAction] = useState(false)

    const title = ({ type, fullName }) => {
        switch (type) {
            case `Help`:
                return (
                    <div className="help-title">
                        {fullName} need help 🏳️
                        <IconButton color="primary" component="span" style={{ float: 'right', padding: 0 }} onClick={() => closeInfoDialog(false)}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                )
            case 'Offer':
                return (
                    <div className="offer-title">
                        {fullName} want to help 👐
                        <IconButton color="primary" component="span" style={{ float: 'right', padding: 0 }} onClick={() => closeInfoDialog(false)}>
                            <ClearIcon />
                        </IconButton>
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

    const handleEditAction = () => {
        setAction('edit')
		setOpenAction(true)
    }

	const handleDeleteAction = () => {
        setAction('delete')
		setOpenAction(true)
    }

	const handleCloseAction = () => {
		setOpenAction(false)
	}

    return (
		<div>
			{openAction ? <SubmitCodeDialog open={openAction} handleClose={handleCloseAction} action={action} type={data.type} /> : null}
			<Dialog
				maxWidth="sm"
				fullWidth
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeInfoDialog}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{title(data)}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<DialogContentText
								id="alert-dialog-slide-description"
								style={{ fontStyle: "italic" }}
							>
								{data.description}
							</DialogContentText>
						</Grid>
					</Grid>
					<Box display="flex" flexDirection="row" flexWrap="wrap">
						<Box m={1} style={{ marginLeft: 0 }}>
							<Chip
								size="small"
								icon={<EditIcon />}
								label="Edit"
								clickable
								onClick={handleEditAction}
								color="primary"
								variant="outlined"
							/>
						</Box>
						<Box m={1} style={{ marginLeft: 0 }}>
							<Chip
								size="small"
								icon={<DeleteIcon />}
								label="Delete"
								clickable
								onClick={handleDeleteAction}
								color="secondary"
								variant="outlined"
							/>
						</Box>
						<Box m={1} style={{ marginLeft: "auto" }}>
							<Typography variant="overline" style={{ float: "right" }}>
								{formatRelative(
									new Date(data.time.seconds * 1000),
									new Date()
								)}
							</Typography>
						</Box>
					</Box>
					{/* <Grid item xs={3}>
                            <Chip
                                icon={<DirectionsIcon />}
                                label="Whatsapp"
                                clickable
                                onClick={handleDirection}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Chip
                                icon={<DirectionsIcon />}
                                label="Call"
                                clickable
                                onClick={handleDirection}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Chip
                                icon={<DirectionsIcon />}
                                label="Open Maps for direction"
                                clickable
                                onClick={handleDirection}
                                color="primary"
                            />
                        </Grid> */}
					{/* <Grid item xs={6}>
                            <Typography variant="overline" style={{ float: 'right' }}>{formatRelative(new Date(data.time.seconds * 1000), new Date())}</Typography>
                        </Grid> */}
					{/* <Grid item xs={5}>
                            <Chip avatar={<Avatar>ID</Avatar>} label={data.id} />
                        </Grid> */}
					{/* </Grid> */}
				</DialogContent>
				<DialogActions>
					<Button
						style={{ fontSize: 12 }}
						onClick={handleCallPhone}
						color="secondary"
						fullWidth
						variant="contained"
						startIcon={<CallIcon />}
						disableElevation
					>
						Call
					</Button>
					<Button
						style={{ backgroundColor: "#25D366", color: "white", fontSize: 12 }}
						onClick={handleWhatsapp}
						color="secondary"
						fullWidth
						variant="contained"
						startIcon={<WhatsAppIcon />}
						disableElevation
					>
						Whatsapp
					</Button>
					<Button
						style={{ fontSize: 12 }}
						onClick={handleDirection}
						color="primary"
						fullWidth
						variant="contained"
						startIcon={<DirectionsIcon />}
						disableElevation
					>
						Maps
					</Button>
				</DialogActions>
			</Dialog>
      </div>
    );
}