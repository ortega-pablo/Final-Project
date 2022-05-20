import {
  GET_PRODUCTS,
  GET_DETAIL,
  GET_CATEGORIES,
  FILTER_PER_CATEGORY,
  FILTER_PER_SUBCATEGORY,
  FILTER_PER_PRICE,
  FILTER_PER_NAME,
  POST_PRODUCT,
  POST_ADD_CATEROY_TO_PRODUCT,
  POST_ADD_SPECIFICATION_TO_PRODUCT,
  ADD_CATEGORY,
  POST_ADD_SUB_CATEGORY_TO_PRODUCT,
  POST_ADD_SUB_CATEGORY,
  POST_ADD_QUANTITY,
  POST_ADD_NEW_SPECIFICATION,
  GET_ALL_SPECIFICATIONS,
  POST_ADD_DISCOUNT_TO_PRODUCT,
  POST_CREATE_USER,
  POST_LOGIN_USER,
<<<<<<< HEAD
  DELETE_PRODUCT,
  PUT_PRODUCT,
  PUT_QUANTITY

=======
  VERIFY_TOKEN,
>>>>>>> a576da1840b85a1092e5dc7befb3ac68cad06151
} from "../actions";

const initialState = {
  products: [],
  productsAux: [],
  productDetail: {},
  categories: [],
  categoriesAux: [],
  allSpecifications: [],
  userStatus:{}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsAux: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
      
    case GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case FILTER_PER_CATEGORY: {
      const allProducts = state.productsAux;
      let filterProducts = [];
      allProducts.forEach((p) => {
        let filterCat = p.categories.filter((c) => c.name === action.payload);
        if (filterCat.length) filterProducts.push(p);
      });
      return {
        ...state,
        products: filterProducts,
      };
    }
      
    case FILTER_PER_SUBCATEGORY: {
      const allProducts = state.productsAux;
      let filterProducts = [];
      allProducts.forEach((p) => {
        let filterCat = p.subCategories.filter(
          (c) => c.name === action.payload
        );
        if (filterCat.length) filterProducts.push(p);
      });
      return {
        ...state,
        products: filterProducts,
      };
    }

    case FILTER_PER_PRICE: {
      console.log(action.payload);
      const allProducts = state.products;
      let filterProducts = allProducts.filter(
        (p) =>
          p.price >= action.payload.Desde && p.price <= action.payload.Hasta
      );
      return {
        ...state,
        products: filterProducts,
      };
    }
    case FILTER_PER_NAME: {
      console.log(state.productsAux);
      const allProducts = state.productsAux;
      const filterProducts = allProducts.filter((p) =>
        p.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      console.log(filterProducts);
      return {
        ...state,
        products: filterProducts,
      };
    }

    case POST_PRODUCT: {
      return {
        ...state,
      };
    }
    case ADD_CATEGORY: {
      return {
        ...state,
      };
    }
    case POST_ADD_SUB_CATEGORY: {
      return {
        ...state,
      };
    }

    case POST_ADD_CATEROY_TO_PRODUCT: {
      return {
        ...state,
      };
    }
    case POST_ADD_SUB_CATEGORY_TO_PRODUCT: {
      return {
        ...state,
      };
    }
    case POST_ADD_QUANTITY: {
      return {
        ...state,
      };
    }
    case POST_ADD_NEW_SPECIFICATION: {
      return {
        ...state,
      };
    }
    case POST_ADD_SPECIFICATION_TO_PRODUCT: {
      return {
        ...state,
      };
    }

    case POST_ADD_DISCOUNT_TO_PRODUCT: {
      return {
        ...state,
      };
    }

    case GET_ALL_SPECIFICATIONS: {
      return {
        ...state,
        allSpecifications: action.payload,
      };
    }

    case POST_CREATE_USER:
      return {
        ...state,
      };
    case POST_LOGIN_USER:
      return {
        ...state,
      };

<<<<<<< HEAD
    case DELETE_PRODUCT :
      let allProductsForDelete = state.products
      const newListProduct = allProductsForDelete.filter ( product => product.id !== action.payload)
      return{
        ...state,
        products : newListProduct
       
      }

    case PUT_PRODUCT : 
     const index = state.products.findIndex( p => p.id === action.payload.id )
     const newArray = [...state.products]
     newArray[index] =  action.payload
      return {
        ...state,
        products: newArray
    }

    case PUT_QUANTITY:
      const index2 = state.products.findIndex( p => p.id === action.payload.id )
      const newArray2 = [...state.products]
      newArray2[index2] =  action.payload
      return {
        ...state,
        products: newArray
    }
=======
    case VERIFY_TOKEN:
    return{
        ...state,
        userStatus: action.payload
      };

>>>>>>> a576da1840b85a1092e5dc7befb3ac68cad06151
    default:
      return state;
  }
};

export default rootReducer;
