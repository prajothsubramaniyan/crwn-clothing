import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51JPSlzSBTxnHqmGWbHHPcMQm8zbNAGYmpvFHdrwinpHSPVA77Uas0lUrzrfJ4pfKk22ienHN1fUxB1PZ3TwbIczM00Ae8ntHRy';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    

    return (
        <StripeCheckout 
        label = 'Pay Now'
        name ='CRWN Clothing'
        billingAddress 
        shippingAddress
        image ='https://svgshare.com/i/CUz.svg'
        description = {`Your total is $${price}`}
        amount = {priceForStripe}
        panelLabel = 'Pay Now'
        token={onToken}
        stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton;