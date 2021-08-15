import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import GoogleMaps from './../../components/Maps/GoogleMaps'
import AskHelpForm from './../../components/Forms/AskHelpForm'
import OfferHelpForm from './../../components/Forms/OfferHelpForm'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

export default function Home() {
    const [askHelpIndicator, setAskHelpIndicator] = useState(false)
	const [offerHelpIndicator, setOfferHelpIndicator] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editData, setEditData] = useState({})

    const editAskHelpData = useSelector((state) => state.requestHelpSelected.currentRequestHelp)

    useEffect(() => {
        if (Object.keys(editAskHelpData).length > 0) {
            setAskHelpIndicator(true)
            setEditData(editAskHelpData)
            setIsEdit(true)
            // console.log(`editskHelpData`,editAskHelpData)
            // console.log(`isEdit`, isEdit)
        }

    }, [editAskHelpData])

    // useEffect(() => {
    //     if (askHelpIndicator === false) {
    //         setIsEdit(false)
    //     }
    // }, [askHelpIndicator])

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
                isEdit={isEdit}
                editData={editData}
            />
            <OfferHelpForm
                openInd={offerHelpIndicator}
                closeOfferHelp={() => setOfferHelpIndicator(false)}
            />
        </div>
    )
}
