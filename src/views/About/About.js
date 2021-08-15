import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
	root: {
	    height: '100vh',
	},
    image: {
        paddingTop: 30
    }
}))

export default function About() {
    const classes = useStyles()
    return (
        <>
          <CssBaseline />
          <div style={{ backgroundColor: 'black', color: 'white' }}>
            <Container maxWidth="sm" className={classes.root}>
                <Box display="flex" justifyContent="center" className={classes.image}>
                    <img src="/WhiteFlagLogo.png" alt="logo" width="200px"/>
                </Box>
                <Box display="flex" justifyContent="center">
                <Typography variant="h4" gutterBottom align="center">
                    We are strong together.
                </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                <Typography variant="h6" gutterBottom align="center">
                    Inspired by white flag movement, White Flag platform aims 
                    to ease the process to help the ones who needed and the 
                    ones who want to offer helps during this pandemic.
                    <p>
                        Be strong Malaysia, kita pasti menang!
                    </p>
                </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                <Typography variant="overline" gutterBottom align="center">
                    Made with ❤️ in Malaysia
                </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                <Typography variant="caption" gutterBottom align="center">
                    <a href="https://twitter.com/amiruddinroslam/" target="_blank" rel="noreferrer">@amiruddinroslam</a>
                </Typography>
                </Box>
            </Container>
          </div>
        </>
      );
}
