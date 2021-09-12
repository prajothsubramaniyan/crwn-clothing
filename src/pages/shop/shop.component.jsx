import React from 'react';

import { connect } from 'react-redux';

import {Route} from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.components';

import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {updateCollections} from '../../redux/shop/shop.action';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state = {
        loading: true
    }

    unSubscripeFromSnapShot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => 
            {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);
                this.setState({loading: false});
            });        
    }
    
    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (   
            <div className ='shop-page'>
                <Route exact path={`${match.path}`} 
                    render = {(props) => <CollectionOverviewWithSpinner isLoading = {loading} {...props}/> }
                />
                <Route path={`${match.path}/:collectionId`} 
                    render = {(props) => <CollectionPageWithSpinner isLoading = {loading} {...props}/>}
                />
            </div>
        );        
    }
} 

const mapsDisptachToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(
    null, 
    mapsDisptachToProps
)(ShopPage);