import { GET_PRODUCTS, GET_DETAIL, GET_CATEGORIES, FILTER_PER_CATEGORY } from "../actions";


const initialState = {
    products: [],
    productsAux: [],
    productDetail: {},
    categories: [],
    categoriesAux:[]
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
        case GET_CATEGORIES:{
            return {
                ...state,
                categories: action.payload,
                categoriesAux: action.payload
            }
        }
        case FILTER_PER_CATEGORY:{
            const allProducts = state.productsAux;
            let filterProducts = [];
            allProducts.forEach((p) => {
                let filterCat = p.categories.filter(c => c.name === action.payload);
                if (filterCat.length) filterProducts.push(p);
            })
            return {
                ...state,
                products: filterProducts
            }
        }
        

            

        default:
            return state;
    }
}

export default rootReducer