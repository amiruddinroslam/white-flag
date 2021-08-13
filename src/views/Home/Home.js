import React, { useState } from 'react'
// import './../../App.css'
import GoogleMaps from './../../components/Maps/GoogleMaps'
import AskHelpForm from './../../components/Forms/AskHelpForm'
import OfferHelpForm from './../../components/Forms/OfferHelpForm'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

export default function Home() {
    const [askHelpIndicator, setAskHelpIndicator] = useState(false);
	const [offerHelpIndicator, setOfferHelpIndicator] = useState(false);

    return (
        <div>
            <GoogleMaps />
            <Box display="flex" justifyContent="center" className="button-sets">
                <Button
                variant="contained"
                color="secondary"
                size="large"
                className="btn-action"
                onClick={() => setAskHelpIndicator(true)}
                >
                I need help
                </Button>
                <Button
                variant="contained"
                color="primary"
                size="large"
                className="btn-action"
                onClick={() => setOfferHelpIndicator(true)}
                >
                I want to help
                </Button>
            </Box>
            <AskHelpForm
                openInd={askHelpIndicator}
                closeAskHelp={() => setAskHelpIndicator(false)}
            />
            <OfferHelpForm
                openInd={offerHelpIndicator}
                closeOfferHelp={() => setOfferHelpIndicator(false)}
            />
        </div>
    )
}
