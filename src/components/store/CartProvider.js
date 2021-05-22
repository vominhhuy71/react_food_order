import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM'){       
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.payload.id);
        const existingCartItem = state.items[existingCartItemIndex];
        
        let updatedItem;
        let updatedItems;

        //Existing array found
        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            }
            //Copy to new array
            updatedItems = [...state.items];
            //Override the existing item in array
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        //New item
        else{
            updatedItem  = {...action.payload};
            updatedItems = state.items.concat(updatedItem);
        }

        return {
            items: updatedItems, 
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.payload);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        
        let updatedItems;

        if(existingCartItem.amount===1){
            updatedItems = state.items.filter(item => item.id !== action.payload)
        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount-1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems, 
            totalAmount: updatedTotalAmount
        }
    }
    return state;
}; 

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD_ITEM', payload:item})
    }

    const removeItemToCartHandler = id => {
        dispatchCartAction({type: 'REMOVE_ITEM', payload:id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;