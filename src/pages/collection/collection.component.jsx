import React from 'react';

import {connect} from 'react-redux';
import {selectCollection} from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({collections}) => {
    const {title, items} = collections;
   return (        
           <div className ='collection-page'>
        <h2 className = 'title'>{ title}</h2>
        <div className ='items'>
        {
            items.map(item => <CollectionItem key ={item.id} item ={item} ></CollectionItem>)
        }
        </div>
    </div>
);
};

const mapsStateToProps = (state, ownprops) => ({
    collections: selectCollection(ownprops.match.params.collectionId)(state)
})

export default  connect(mapsStateToProps)(CollectionPage);