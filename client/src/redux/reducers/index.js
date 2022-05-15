import { GET_PRODUCTS, GET_DETAIL, POST_PRODUCT } from "../actions";


const initialState = {
    products: [],
    productsAux: [],
    productDetail: {}
}

const rootReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                productsAux: action.payload
            }
        
        case GET_DETAIL:
            return{
                ...state,
                productDetail: action.payload
            }
        
        case POST_PRODUCT:{
            return {
               ...state

            } 
        }

            

        default:
            return state;
    }
}

export default rootReducer