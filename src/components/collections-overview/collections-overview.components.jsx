import React from 'react';
import './collections-overview.styles.scss';

import {connect} from 'react-redux';

import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { selectCollections } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({collections}) => (
    <div className='collection-overview'>
    {
        collections.map(({id , ...otherCollectionprops}) =>  
        (
        <CollectionPreview key = {id} {...otherCollectionprops}>                
        </CollectionPreview>))}
    </div>
);

const mapsStateToProps = createStructuredSelector({
    collections: selectCollections
});    

export default connect(mapsStateToProps)(CollectionOverview);