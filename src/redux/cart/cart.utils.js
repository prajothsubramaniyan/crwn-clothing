export const addItemsToCart = (CartItems, CartItemToAdd) => {
    const existingCartItem = CartItems.find(cartItem => cartItem.id === CartItemToAdd.id);

    if (existingCartItem)
    {
        return CartItems.map(cartItem => 
            cartItem.id === CartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }

    return [...CartItems, {...CartItemToAdd, quantity: 1 }];
}