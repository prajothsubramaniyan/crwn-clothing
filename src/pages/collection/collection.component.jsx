import React from 'react';

import {connect} from 'react-redux';
import {selectCollection} from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({collections}) => {
    console.log(collections);
   return (        
           <div className ='collection-page'>
        <h2>COLLECTION PAGE</h2>
    </div>
);
};

const mapsStateToProps = (state, ownprops) => ({
    collections: selectCollection(ownprops.match.params.collectionId)(state)
})

export default  connect(mapsStateToProps)(CollectionPage);