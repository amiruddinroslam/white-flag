import React, { useState } from 'react'
import './App.css'
import GoogleMaps from './components/Maps/GoogleMaps'
import AskHelpForm from './components/Forms/AskHelpForm'


import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import OfferHelpForm from './components/Forms/OfferHelpForm'

function App() {
  const [askHelpIndicator, setAskHelpIndicator] = useState(false)
  const [offerHelpIndicator, setOfferHelpIndicator] = useState(false)

  return (
    <>
      <h2 className="white-flag-logo">
        White Flag{" "}
        <span role="img" aria-label="white-flag">
          🏳
        </span>
      </h2>
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
      <div style={{ display: 'none' }}>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons"
        >
          Smashicons
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div div style={{ display: 'none' }}>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  );
}

export default App;
