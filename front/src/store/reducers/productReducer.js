import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_REST,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_REST,
    ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_NEW_PRODUCT_REQUEST,
    ADMIN_NEW_PRODUCT_SUCCESS,
    ADMIN_NEW_PRODUCT_REST,
    ADMIN_NEW_PRODUCT_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REST,
    NEW_REVIEW_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'
export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.products,
                productsCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            }
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_REVIEW_REST:
            return {
                ...state,
                success: false,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
export const newProductByAdminReducer = (state = { newProduct: {} }, action) => {
    switch (action.type) {
        case ADMIN_NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ADMIN_NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                newProduct: action.payload.product,
            }
        case ADMIN_NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADMIN_NEW_PRODUCT_REST:
            return {
                ...state,
                success: false,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
export const deleteProductByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_PRODUCT_REQUEST:
        case ADMIN_UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case ADMIN_DELETE_PRODUCT_FAIL:
        case ADMIN_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADMIN_DELETE_PRODUCT_REST:
            return {
                ...state,
                isDeleted: false,
                loading: false,
            };
        case ADMIN_UPDATE_PRODUCT_REST:
            return {
                ...state,
                isUpdated: false,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}