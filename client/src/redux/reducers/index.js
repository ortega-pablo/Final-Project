import { GET_PRODUCTS, GET_DETAIL, POST_PRODUCT, GET_ALL_CATEGORIES, POST_ADD_CATEROY_TO_PRODUCT, POST_ADD_SPECIFICATION_TO_PRODUCT } from "../actions";


const initialState = {
    products: [],
    productsAux: [],
    productDetail: {},
    allCategories: []
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
        case GET_ALL_CATEGORIES:{
            return {
                ...state,
                allCategories:action.payload
            }
        }
        case POST_ADD_CATEROY_TO_PRODUCT:{
            return{
                ...state
            }
        }
        // case POST_ADD_SPECIFICATION_TO_PRODUCT:{
        //     return{
        //         ...state
        //     }
        // }

            

        default:
            return state;
    }
}

export default rootReducer