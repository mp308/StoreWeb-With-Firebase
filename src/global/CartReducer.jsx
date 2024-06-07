import { toast } from 'react-toastify';

export const CartReducer = (state, action) => {
    // Initialize state with default values
    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let updatedQty;
    let updatedPrice;
    let index;

    switch (action.type) {
        case 'ADD_TO_CART':
            const check = shoppingCart.find(product => product.ProductID === action.id);
            if (check) {
                toast.info('This product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            } else {
                product = action.product;
                let qty = 1;
                let TotalProductPrice = product.productPrice * qty;
                updatedQty = totalQty + qty;
                updatedPrice = totalPrice + TotalProductPrice;
                return {
                    shoppingCart: [{ ...product, qty, TotalProductPrice }, ...shoppingCart],
                    totalPrice: updatedPrice,
                    totalQty: updatedQty
                };
            }
        
        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.productPrice;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.productPrice;
            index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            };
        
        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.productPrice;
                updatedPrice = totalPrice - product.productPrice;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                };
            } else {
                return state;
            }
        
        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.productPrice;
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            };
        
        case 'EMPTY':
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            };
        
        default:
            return state;
    }
};
