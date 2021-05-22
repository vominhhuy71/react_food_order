import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../store/cart-context';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    const [btnIsBumped, setBtnIsBumped] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    
    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnIsBumped(true);

        const timer = setTimeout(()=>{
            setBtnIsBumped(false);
        },300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    

    const numberOfCartItems = items.reduce((currNum, item)=>{
        return currNum + item.amount
    },0);

    const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ''}`

    return <button className={btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;