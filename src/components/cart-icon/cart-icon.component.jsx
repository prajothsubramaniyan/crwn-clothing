import React from 'react';

import {connect } from 'react-redux';

import { toggleCardHidden } from '../../redux/cart/cart.action';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon  = ({toggleCardHidden, itemCount}) => (
    <div className ='cart-icon' onClick = {toggleCardHidden}>    
        <ShoppingIcon  className = 'shopping-icon'/>
        <span className ='item-count'>{itemCount}</span>    
    </div>
)

const mapsDispatchToProps = dispatch => ({
    toggleCardHidden: () => dispatch(toggleCardHidden())
});

const mapsStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
});


export default connect(mapsStateToProps, mapsDispatchToProps)(CartIcon);