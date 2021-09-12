import React from 'react';

import { connect } from 'react-redux';

import {Route} from 'react-router-dom';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CollectionPageContainer from '../collection/collection.container';

import {fetchCollectionsStartAsyn} from '../../redux/shop/shop.action';

class ShopPage extends React.Component{
    
    componentDidMount(){     
        const {fetchCollectionsStartAsyn} = this.props;
        fetchCollectionsStartAsyn();
    }
    
    render() {
        const {match} = this.props;
        return (   
            <div className ='shop-page'>
                <Route exact path={`${match.path}`} 
                    component = {CollectionsOverviewContainer}
                />
                <Route path={`${match.path}/:collectionId`} 
                    component = {CollectionPageContainer}
                />
            </div>
        );        
    }
} 

const mapsDisptachToProps = dispatch => ({
    fetchCollectionsStartAsyn: () => dispatch(fetchCollectionsStartAsyn())
});

export default connect(
    null, 
    mapsDisptachToProps
)(ShopPage);