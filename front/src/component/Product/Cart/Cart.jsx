import './cart.scss';
import React,{ useState, useEffect } from 'react';
import CartItemCard from './CartItemCard';
import { Add, Remove, AddShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemToCart } from "../../../store/actions/cartActions";
const Cart = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const [GrossTotal, setGrossTotal] = useState();
    useEffect(() => {
        if (cartItems) {
            const total = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            setGrossTotal(total);
        }
    }, [cartItems]);
    const checkouthandler = () => {
        const redirectUrl = "/login?redirect=/shipping";
        history(redirectUrl);
    };
    const [isAnimated, setIsAnimated] = useState(true)
    const removeAnimation = (e) => {
        const btn = e.target;
        if (isAnimated) {
            btn.classList.remove('non-animation')
        }
        else {
            btn.classList.add('non-animation')
        }
    }
    const deleteCartItems = (id) => {
        dispatch(removeItemToCart(id));
    }
    const increaseItemQuantity = (id, quantity, stock) => {
        let newQuntity = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQuntity));
    }
    const descreseItemQuantity = (id, quantity) => {
        let newQuntity = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQuntity));
    }
    return (<>
        {
            (cartItems.length === 0) ? (<>
                <section className="cart">
                    <p style={{ textAlign: "center" }}>No Items Added Yet <br /> <Link to='/products' style={{ color: "tomato" }}><AddShoppingCart /> Add Some item to Cart</Link></p>

                </section>
            </>)
                :
                (<>
                    <section className='cart'>
                        <header>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </header>
                        <div className="Cartcontainer">
                            <div>
                                {cartItems.map((item, i) => (
                                    <React.Fragment key={item.product}>
                                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                        <div className="cartInput">
                                            <button
                                                onClick={() => {
                                                    descreseItemQuantity(item.product, item.quantity);
                                                    setGrossTotal(item.quantity * item.price);
                                                }}
                                            >
                                                <Remove />
                                            </button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button
                                                onClick={() => {
                                                    increaseItemQuantity(item.product, item.quantity, item.stock);
                                                    setGrossTotal(item.quantity * item.price);
                                                }}
                                            >
                                                <Add />
                                            </button>
                                        </div>
                                        <div className="subTotal">
                                            <p>{`₹${item.quantity * item.price}`}</p>
                                        </div>
                                    </React.Fragment>
                                ))}

                            </div>
                        </div>
                        <div className="cartGrossTotal">
                            <div></div>
                            <div></div>
                            <div>
                                <div className="cartGrossAmount">
                                    <p>Gross Total:</p>
                                    <p>{`₹${GrossTotal}`}</p>
                                </div>
                                <div></div>
                                <button className="checkout" onMouseEnter={(e) => { removeAnimation(e); setIsAnimated(true); }} onClick={() => {
                                    checkouthandler();
                                }} onMouseLeave={(e) => { removeAnimation(e); setIsAnimated(false) }}>Check Out</button>
                            </div>
                        </div>
                    </section>
                </>)
        }
    </>)
}
export default Cart;