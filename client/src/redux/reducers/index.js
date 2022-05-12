import { GET_PRODUCTS, GET_CATEGORIES } from "../actions";


const initialState = {
    products: [],
    productsAux: [],
    categories: [],
    categoriesAux:[]
}

const rootReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_PRODUCTS:{
            return{
                ...state,
                products: action.payload,
                productsAux: action.payload
            }
        }
        case GET_CATEGORIES: {
            return{
                ...state,
                categories: action.payload,
                categoriesAux: action.payload
            }
        }

            

        default:
            return state;
    }
}

export default rootReducer