import { useEffect, useState } from 'react';
import './cart.scss';
import CartItemCard from './CartItemCard';
const Cart = () => {

    let items = [];
    for (let i = 0; i < 3; i++) {
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
        name: "lokesh"
    }

    const [hideProduct, setHideProduct] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setHideProduct(true);
            }
            else {
                setHideProduct(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (<>
        <main>
            <header className={`cartHeader ${hideProduct ? 'scrolled' : ''}`}
                style={{
                    transition: 'all 0.3s ease',
                    backgroundColor: hideProduct ? '#ffffff' : 'white',
                    boxShadow: hideProduct ? '1px 3px 10px 1px rgb(190, 190, 190)' : '1px 1px 10px 1px rgba(0,0,0,0.5)',
                    padding: hideProduct ? '0.8rem' : '1rem',
                    width: hideProduct ? 'auto' : 'auto',
                    gridTemplateColumns: hideProduct ? '' : '4fr 1fr 1fr',
                    display: hideProduct ? 'flex' : 'grid',
                    justifyContent: hideProduct ? 'space-between' : 'none',
                    marginLeft: hideProduct ? '28rem' : '0',
                }}>
                {!hideProduct && <p
                    style={{
                        marginRight: hideProduct ? '' : "8rem",
                    }}
                >Product</p>}
                <p style={{
                    marginLeft: hideProduct ? '2.5rem' : ''
                }} >Quantity</p>
                <p style={{
                    marginRight: hideProduct ? '2.5rem' : ''
                }} >Subtotal</p>
            </header>
            <div className="Cartcontainer">
                {items.map((item, i) => (
                    <CartItemCard item={item} key={i} />

                ))}
                <div className="cartInput">
                    <button>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button>+</button>
                </div>
            </div>
        </main>
    </>)
}
export default Cart;