import './cart.scss';
import {useState} from 'react'
import CartItemCard from './CartItemCard';
import { Add, Remove } from '@mui/icons-material'
const Cart = () => {
    const [isAnimated, setIsAnimated] = useState(true)
    const removeAnimation = (e)=>{
        const btn = e.target;
        if(isAnimated){
            btn.classList.remove('non-animation')
        }
        else{
            btn.classList.add('non-animation')
        }        
    }
    let items = [];
    for (let i = 0; i < 1; i++) {
        const item = {
            product: "px1",
            price: 200,
            name: "lokesh"
        }
        items.push(item);
    }
    const item = {
        product: "px1",
        price: 200,
        name: "lokesh",
        quantity: 804,
    }
    return (<>
        <main>
            <header>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </header>
            <div className="Cartcontainer">
                <div>
                    {items.map((item, i) => (
                        <CartItemCard item={item} key={i} />

                    ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column",width:"min-content", margin: "2rem 0 0 2rem" }}>
                    {items.map((i) => (
                        <div className="cartInput" key={i}>
                            <button><Remove /></button>
                            <input type="number"
                                value={item.quantity}
                                readOnly />
                            <button><Add /></button>
                        </div>

                    ))}
                </div>
                <div className="subTotal">
                    <p>{`₹${item.quantity * item.price}`}</p>
                </div>
            </div>
            <div className="cartGrossTotal">
                <div></div>
                <div></div>
                <div>
                    <div className="cartGrossAmount">
                        <p>Gross Total:</p>
                        <p>{`₹5000`}</p>
                    </div>
                    <div></div>
                    <button className="checkout" onMouseEnter={(e)=>{removeAnimation(e);setIsAnimated(true)}} onMouseLeave={(e)=>{removeAnimation(e);setIsAnimated(false)}}>Check Out</button>
                </div>
            </div>
        </main>
    </>)
}
export default Cart;