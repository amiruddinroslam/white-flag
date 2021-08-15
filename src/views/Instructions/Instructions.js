import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
	root: {
	    height: '100vh',
	},
    accordion: {
        width: '100%',
        padding: '20px 0'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

export default function Contact() {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className="instructions">
            <div style={{ backgroundColor: 'black', color: 'white' }}>
                <Container maxWidth="sm" className={classes.root}>
                    <div className={classes.accordion}>
                    <Typography variant="h3" gutterBottom>
                        How to use
                    </Typography>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Ask for a help</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ol>
                                    <li>Click 'I Need Help' button in Home tab</li>
                                    <li>Enter you details. Make sure is is correct to avoid any problems later</li>
                                    <li>On Exact Location field, click on the locate icon to get your exact location and nearby address</li>
                                    <li>Check your details entered are correct, and click Submit</li>
                                    <li>Check your details before click Confirm</li>
                                    <li>Please save your unique code prompted after the request successfully added</li>
                                    <li>You can view your Help Request in the map</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>Offer for a help</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ol>
                                    <li>Click 'I Want to Help' button in Home tab</li>
                                    <li>Enter you details. Make sure is is correct to avoid any problems later</li>
                                    <li>On Exact Location field, click on the locate icon to get your exact location and nearby address</li>
                                    <li>Check your details entered are correct, and click Submit</li>
                                    <li>Check your details before click Confirm</li>
                                    <li>Please save your unique code prompted after the offer successfully added</li>
                                    <li>You can view your Offer in the map</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className={classes.heading}>Contact people who offer a help/request help</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ol>
                                    <li>Click any white flag icon on the map to see details of requestor. (Click gift to view a help offer details instead)</li>
                                    <li>View the details</li>
                                    <li>To call the person, click call</li>
                                    <li>To message the person (Whatsapp), click Whatsapp</li>
                                    <li>To get a direction the the person, click maps (It is recommended to contact the person first)</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                            >
                                <Typography className={classes.heading}>Delete a listing</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ol>
                                    <li>Click on your listing</li>
                                    <li>Click delete</li>
                                    <li>Enter your unique code</li>
                                    <li>Click confirm after done reviewing</li>
                                    <li>Your listing is removed from the map</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Container>
            </div>
        </div>
    )
}
