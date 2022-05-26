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
  DELETE_PRODUCT,
  PUT_PRODUCT,
  PUT_QUANTITY,
  VERIFY_TOKEN,
  CLEAR_FILTERS,
  POST_NEW_ASK,
  POST_NEW_ANSWER,
  PUT_INVENTORY,
  GET_INVENTORY,
  PUT_CATEGORY_TO_PRODUCT,
  PUT_SUBCATEGORY_TO_PRODUCT,
  DELETE_CATEGORY,
  PUT_CATEGORY,
  PUT_SUB_CATEGORY,
  GET_SUB_CATEGORIES,
  DELETE_SUB_CATEGORY,
  GET_ALL_DISCOUNT,
  DELETE_ONE_DISCOUNT_TO_A_PRODUCT,
  PUT_DISCOUNT,
  POST_DISCOUNT,
  DELETE_DISCOUTN,
  PUT_VALUE_SPECIFICATION_OF_ONE_PRODUCT,
  PUT_REMOVE_ONE_SPECIFICATION_ONE_PRODUCT,
  DELETE_SPECIFICATION,
  POST_ADD_IMAGE,
  DELETE_IMAGE_TO_PRODUCT,
  GET_USER_ID_BY_TOKEN,
  PUT_NAME_SPECIFICATION,
  PUT_NAME_SUBCATEGORY,
  GET_IMAGES,
  GET_DETAIL_ONE_PRODUCT,
  ADD_TO_CART,
  GET_CART_BY_ID,
  SET_REDUCER_USER_ID,
} from "../actions";

const initialState = {
  products: [],
  productsAux: [],
  productDetail: {},
  categories: [],
  categoriesAux: [],
  allSpecifications: [],
  inventory: [],
  subCategories: [],
  discounts: [],
  userStatus: null,
  allImages: [],
  getDetailOneProduct : [],
  cart: {},
  
};

// funcion para que el carrito se guarde siempre 
// localStorage.getItem("cart") ? 
// initialState.cart = JSON.parse(localStorage.getItem("cart"))
// : initialState.cart = []



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsAux: action.payload,
      };

    case GET_DETAIL:
      let productFixed = action.payload;

      productFixed[0].asks.sort((aA, aB) => {
        return aA.id - aB.id;
      }
      )

      return {
        ...state,
        productDetail: productFixed,
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
      const allProducts = state.productsAux;
      const filterProducts = allProducts.filter((p) =>
        p.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        products: filterProducts,
      };
    }

    case CLEAR_FILTERS:{
      return{
        ...state,
        products: state.productsAux
      }
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
    case POST_NEW_ASK: {
      return {
        ...state
      };
    }
    case POST_NEW_ANSWER:{
      return {
        ...state
      }
    }

    case DELETE_PRODUCT:
      let allProductsForDelete = state.products;
      const newListProduct = allProductsForDelete.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: newListProduct,
      };

    case PUT_PRODUCT:
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      const newArray = [...state.products];
      newArray[index] = action.payload;
      return {
        ...state,
        products: newArray,
      };

    case PUT_INVENTORY:
      const index2 = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      const newArray2 = [...state.products];
      newArray2[index2] = action.payload;

      return {
        ...state,
        products: newArray,
      };

    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };

    case PUT_CATEGORY_TO_PRODUCT:
      return {
        ...state,
      };

    case PUT_SUBCATEGORY_TO_PRODUCT:
      return {
        ...state,
      };
    case DELETE_CATEGORY:
      let allCategoryForDetelete = state.categories;
      const newListCategories = allCategoryForDetelete.filter(
        (category) => category.id !== action.payload
      );

      return {
        ...state,
        categories: newListCategories,
      };

    case PUT_CATEGORY: {
      const inedex3 = state.categories.findIndex(
        (c) => c.id === action.payload.id
      );
      const newArray3 = [...state.categories];
      newArray3[inedex3] = action.payload;

      return {
        ...state,
        categories: newArray3,
      };
    }

    case GET_SUB_CATEGORIES: {
      return {
        ...state,
        subCategories: action.payload,
      };
    }

    case PUT_SUB_CATEGORY: {
      const inedex5 = state.subCategories.findIndex(
        (sc) => sc.id === action.payload.id
      );
      const newArray5 = [...state.subCategories];
      newArray5[inedex5] = action.payload;

      return {
        ...state,
        subCategories: newArray5,
      };
    }

    case DELETE_SUB_CATEGORY: {
      return {
        ...state,
      };
    }

    case GET_ALL_DISCOUNT: {
      return {
        ...state,
        discounts: action.payload,
      };
    }

    case DELETE_ONE_DISCOUNT_TO_A_PRODUCT: {
      return {
        ...state,
      };
    }
    case PUT_DISCOUNT: {
      const inedex4 = state.products.findIndex(
        (d) => d.id === action.payload.id
      );
      const newArray4 = [...state.discounts];
      newArray4[inedex4] = action.payload;

      return {
        ...state,
        categories: newArray4,
      };
    }

    case POST_DISCOUNT: {
      return {
        ...state,
      };
    }
    case DELETE_DISCOUTN:
      return {
        ...state,
      };
    case PUT_VALUE_SPECIFICATION_OF_ONE_PRODUCT: {
      const inedex6 = state.discounts.findIndex(
        (d) => d.id === action.payload.id
      );
      const newArray6 = [...state.discounts];
      newArray6[inedex6] = action.payload;

      return {
        ...state,
        categories: newArray6,
      };
    }

    case PUT_REMOVE_ONE_SPECIFICATION_ONE_PRODUCT:
      return {
        ...state,
      };

    case DELETE_SPECIFICATION:
      return {
        ...state,
        products: newArray
    }
    case VERIFY_TOKEN:
    return{
        ...state,
        userStatus: action.payload.msg
      };
    case GET_USER_ID_BY_TOKEN: {
      return {
        ...state
      }
    }

      case POST_ADD_IMAGE :
        return {
          ...state
        }

        case DELETE_IMAGE_TO_PRODUCT: {
          return {
            ...state,
          };
        }
        case PUT_NAME_SPECIFICATION: {
          const inedex7 = state.allSpecifications.findIndex((d) => d.id == action.payload.id );
          const newArray7 = [...state.allSpecifications];
          newArray7[inedex7] = action.payload;
    
          return {
            ...state,
            categories: newArray7,
          };
        }
    
        case PUT_NAME_SUBCATEGORY: {
          const inedex8 = state.subCategories.findIndex((s) => s.id == action.payload.id );
          const newArray8 = [...state.subCategories];
          newArray8[inedex8] = action.payload;
    
          return {
            ...state,
            categories: newArray8,
          };
        }
    
        case GET_IMAGES: {
          return {
            ...state,
            allImages: action.payload,
          };
        }

        case GET_DETAIL_ONE_PRODUCT:
          return {
            ...state,
            getDetailOneProduct: action.payload,
           
          };

        case GET_CART_BY_ID:
          return {
            ...state,
            cart: action.payload
          }


    default:
      return state;
  }
};

export default rootReducer;
