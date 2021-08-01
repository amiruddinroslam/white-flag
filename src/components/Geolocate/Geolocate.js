import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import geolocationService from '../../services/geolocationService'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import './Geolocate.css'

const useStyles = makeStyles((theme) => ({
    iconButton: {
      padding: 10,
    },
  }));

export default function Geolocate({ panTo }) {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)

    const currentLocation = async () => {
        setIsLoading(true)
        const position = await geolocationService.locateUser()
        panTo({
            lat: position?.coords.latitude,
            lng: position?.coords.longitude
        })
        setIsLoading(false)
    }

    return (
        <>
            {/* <Button className="geolocate-btn" variant="contained" color="default" onClick={currentLocation}>
                <MyLocationIcon />
            </Button> */}
            {isLoading && <LinearProgress />}
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={currentLocation}>
                <MyLocationIcon />
            </IconButton>
        </>
    )
}
