import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.component';

import {selectCartItems} from '../../redux/cart/cart.selectors';

import {toggleCardHidden} from '../../redux/cart/cart.action';

const CartDropdown = ({cartItems, history, dispatch }) => (
    <div className ='cart-dropdown'> 
        <div className ='cart-items'>
        {
            cartItems.length ?
            cartItems.map
            (cartItem => <CartItem key ={cartItem.id} item = {cartItem} />)
            : (<span className = 'empty-message'>Your cart is empty</span>
        )}        
        </div>
        <CustomButton onClick={
            () => {history.push('/checkout');
            dispatch(toggleCardHidden());
        }}>
        GO TO CHECKOUT
        </CustomButton>
    </div>
)

const mapsStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default  withRouter(connect(mapsStateToProps)(CartDropdown));