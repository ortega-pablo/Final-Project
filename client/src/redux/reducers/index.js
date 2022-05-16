



import { GET_PRODUCTS, GET_DETAIL, GET_CATEGORIES, FILTER_PER_CATEGORY, FILTER_PER_SUBCATEGORY, FILTER_PER_PRICE, FILTER_PER_NAME,  POST_PRODUCT,  POST_ADD_CATEROY_TO_PRODUCT, POST_ADD_SPECIFICATION_TO_PRODUCT, ADD_CATEGORY } from "../actions";


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
        case FILTER_PER_SUBCATEGORY:{            const allProducts = state.productsAux;
            let filterProducts = [];
            allProducts.forEach((p) => {
                let filterCat = p.subCategories.filter(c => c.name === action.payload);
                if (filterCat.length) filterProducts.push(p);
            })
            return {
                ...state,
                products: filterProducts
            }
        }
        case FILTER_PER_PRICE: {
            console.log(action.payload);
            const allProducts = state.products;
            let filterProducts = allProducts.filter(p => (p.price >= action.payload.Desde && p.price <= action.payload.Hasta));
            return{
                ...state,
                   products: filterProducts
            }
        }
        case FILTER_PER_NAME:{
            console.log(state.productsAux)
            const allProducts = state.productsAux;
            const filterProducts = allProducts.filter(p => p.name.toLowerCase().includes(action.payload.toLowerCase()));
            console.log(filterProducts)
            return{
                ...state,
                products: filterProducts
            }
        }

        
        case POST_PRODUCT:{
            return {
               ...state

            } 
        }
        case ADD_CATEGORY:{
            return{
                ...state
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