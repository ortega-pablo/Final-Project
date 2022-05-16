
import { GET_PRODUCTS, GET_DETAIL, GET_CATEGORIES, FILTER_PER_CATEGORY, FILTER_PER_SUBCATEGORY, POST_PRODUCT,  POST_ADD_CATEROY_TO_PRODUCT, POST_ADD_SPECIFICATION_TO_PRODUCT, ADD_CATEGORY } from "../actions";


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
        case FILTER_PER_SUBCATEGORY:{
            const allProducts = state.productsAux;
            console.log(allProducts);
            console.log(allProducts[0]);
            let filterProducts = [];
            allProducts.forEach((p) => {
                 p.categories.forEach(c => {
                     let filterSubCat = c.subCategories.filter(sc => sc.name === action.payload);
                     if(filterSubCat.length) filterProducts.push(p)
                 });
            })
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