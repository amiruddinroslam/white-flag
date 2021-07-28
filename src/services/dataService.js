
import firebase from 'firebase/app'
import { firestore } from './../firebase/firebase'

const requestHelpCollection = firestore.collection('requestHelp')
const offerHelpCollection = firestore.collection('offerHelp')

class WhiteFlagDataService {
    getAllRequestHelp() {
        return requestHelpCollection.get()
    }

    createRequestHelp(help) {
        return requestHelpCollection.add(help)
    }

    updateRequestHelp(id, value) {
        return requestHelpCollection.doc(id).update(value)
    }

    deleteRequestHelp(id) {
        return requestHelpCollection.doc(id).delete()
    }

    getAllOfferHelp() {
        return offerHelpCollection
    }

    createOfferHelp(help) {
        return offerHelpCollection.add(help)
    }

    updateOfferHelp(id, value) {
        return offerHelpCollection.doc(id).update(value)
    }

    deleteOfferHelp(id) {
        return offerHelpCollection.doc(id).delete()
    }

    formatGeoPoint({ lat, lng }) {
        return new firebase.firestore.GeoPoint(lat, lng)
    }
}

export default new WhiteFlagDataService()