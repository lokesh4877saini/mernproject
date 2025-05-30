import {configureStore} from '@reduxjs/toolkit';
import { productReducer,productDetailsReducer, newReviewReducer, } from './reducers/productReducer';
import {forgotPasswordReducer, profileReducer, userReducer} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducer';
let initialstate = {
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    }
}
const store = configureStore({
    reducer:{
        products:productReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        profile:profileReducer,
        forgotPassword:forgotPasswordReducer,
        cart:cartReducer,
        newReview:newReviewReducer,
    },
    preloadedState: initialstate,
});
export default store;

//Store:

// The store holds the state of your entire app. In a large app, rather than having state in individual components, you centralize all your app’s state in one place (the store).
// The store is immutable, meaning once the state is set, you can't change it directly. Instead, you send actions to the store to update the state.
// Actions:

// Actions are plain JavaScript objects that describe something that happened in the app. Each action must have a type property, which is a string that describes the action.
// Actions can also carry data (payload), which helps modify the state.
// Reducers:
// Reducers are functions that define how the state changes in response to an action.
// Reducers take the current state and an action as arguments, and return a new state.
// The key point to remember is that reducers do not mutate the state; they return a new state object.