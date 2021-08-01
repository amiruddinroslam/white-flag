import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: 'absolute',
    zIndex: 2,
    bottom: '8rem',
    right: '22rem',
    margin: 0,
    padding: 0,
    borderRadius: 30
  },
}));

export default function SimpleAlert({ type, text }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

    return (
      <div className={classes.root}>
        <Collapse in={open}>
          <Alert
            severity={type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {text}
          </Alert>
        </Collapse>
        {/* <Alert severity={type}>{text}</Alert> */}
      </div>
    )
}
