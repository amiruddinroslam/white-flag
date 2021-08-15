import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PhoneIcon from '@material-ui/icons/Phone'
import DescriptionIcon from '@material-ui/icons/Description'
import PinDropIcon from '@material-ui/icons/PinDrop'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        paddingLeft: 0,
    },
}))

export default function ConfirmationDialog({isOpen, handleClose, title, subtitle, data, isDeleteConfirmation}) {
    const classes = useStyles()
    const confirmation = (arg) => handleClose(arg)

    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{subtitle}</DialogContentText>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={data.fullName} />
                        </ListItem>
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={data.phoneNo} />
                        </ListItem >
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DescriptionIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={data.description} />
                        </ListItem>
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PinDropIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={data.address} />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { confirmation(false) }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { confirmation(true)} } color="primary">
                        {isDeleteConfirmation ? `Delete` : `Confirm`}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  data: PropTypes.object.isRequired
}
