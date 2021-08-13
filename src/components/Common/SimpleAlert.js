import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlert({ id, type, text }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true)
  useEffect(() => {
    setOpen(true)
  }, [id])

  const handleClick = () => {
    setOpen(false)
  }

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
                onClick={handleClick}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {text}
          </Alert>
        </Collapse>
      </div>
    )
}
