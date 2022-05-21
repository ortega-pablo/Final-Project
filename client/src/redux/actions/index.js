import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";

export const POST_PRODUCT = "POST_PRODUCT";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const POST_ADD_CATEROY_TO_PRODUCT = "POST_ADD_CATEROY_TO_PRODUCT";
export const POST_ADD_SPECIFICATION_TO_PRODUCT =
  "POST_ADD_SPECIFICATION_TO_PRODUCT";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_PER_CATEGORY = "FILTER_PER_CATEGORY";
export const FILTER_PER_SUBCATEGORY = "FILTER_PER_SUBCATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const CLEAR_FILTERS = "CLEAR_FILTERS"


export const FILTER_PER_PRICE = "FILTER_PER_PRICE";
export const FILTER_PER_NAME = "FILTER_PER_NAME";
export const POST_CREATE_USER = "POST_CREATE_USER";
export const POST_LOGIN_USER = "POST_LOGIN_USER";

export const POST_ADD_SUB_CATEGORY_TO_PRODUCT =
  "POST_ADD_SUB_CATEGORY_TO_PRODUCT";
export const POST_ADD_SUB_CATEGORY = "POST_ADD_SUB_CATEGORY";
export const POST_ADD_QUANTITY = "POST_ADD_QUANTITY";
export const POST_ADD_NEW_SPECIFICATION = "POST_ADD_NEW_SPECIFICATION";
export const POST_ADD_DISCOUNT_TO_PRODUCT = "POST_ADD_DISCOUNT_TO_PRODUCT";
export const GET_ALL_SPECIFICATIONS = "GET_ALL_SPECIFICATIONS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const PUT_QUANTITY = "PUT_QUANTITY";
export const VERIFY_TOKEN = "VERIFY_TOKEN"



export const getProducts = (name) => {
  return async (dispatch) => {
    let response;
    if (name === undefined)
      response = await axios(`http://localhost:3001/products`);
    else {
      response = await axios(`http://localhost:3001/products?name=${name}`);
    }
 
    return dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let response = await axios(`http://localhost:3001/productDetail/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
  };
};

export const postProduct = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/products`, payload);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddCateroryToProduct = (idP, idC, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/products/addCategory?productId=${idP}&categoryId=${idC}`,
        payload
      ); //url + body

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};
export const postAddSubCateroryToProduct = (idP, idSC, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/products/addSubCategory?productId=${idP}&subCategoryId=${idSC}`,
        payload
      ); //url + body

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddCaterory = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/categories`, payload);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddSubCategory = (idC, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/categories?categoryId=${idC}`,
        payload
      );

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddQuantity = (idP, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/inventory?productId=${idP}`,
        payload
      );

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddNewSpecification = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/specifications`,
        payload
      );

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddSpecificationToProduct = (idP, idE, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/products/addSpecification?productId=${idP}&specificationId=${idE}`,
        payload
      ); //url + body

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllSpecifications = () => {
  return async (dispatch) => {
    let response = await axios("http://localhost:3001/specifications/all");
    return dispatch({
      type: GET_ALL_SPECIFICATIONS,
      payload: response.data,
    });
  };
};

export const postAddDiscountToProduct = (idP, idD) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `http://localhost:3001/products/addDiscount?productId=${idP}&discountId=${idD}`
      );

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    let response = await axios("http://localhost:3001/categories");
    return dispatch({
      type: GET_CATEGORIES,
      payload: response.data,
    });
  };
};




export const filterPerCategory = (category) => {
  return async (dispatch) => {
    return dispatch({
      type: FILTER_PER_CATEGORY,
      payload: category,
    });
  };
};
export const filterPerSubCategory = (subCategory) => {
  return async (dispatch) => {
    return dispatch({
      type: FILTER_PER_SUBCATEGORY,
      payload: subCategory,
    });
  };
};

export const postRegisterUser = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://localhost:3001/users/create",
        payload
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("hubo un error");
      console.log(error);
    }
  };
};
export const postLoginUser = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://localhost:3001/users/login",
        payload
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("hubo un error en el login");
      console.log(error);
    }
  };
};

export const filterPerPrice = (range) => {
  return async (dispatch) => {
    return dispatch({
      type: FILTER_PER_PRICE,
      payload: range,
    });
  };
};

export const clearFilters = () => {
  return async (dispatch) => {
    return dispatch({
      type: CLEAR_FILTERS
    });
  };
};

export function deleteProduct (id){
  return async function (dispatch){
      try {
           await axios.delete(`http://localhost:3001/products/${id}` )
           console.log("redicer")

          return dispatch({
              type: DELETE_PRODUCT,
              payload: id
              
          })
      } catch (error) {
          console.log(error)
      }
  }
};

export function putProduct (id, payload){
  return async function (dispatch){
      try {
           await axios.put(`http://localhost:3001/products/${id}` , payload )
           console.log("editando action")
           console.log(id)
          console.log(payload)  
          return dispatch({
              type: PUT_PRODUCT,
              payload: payload,
                            
          })
      } catch (error) {
          console.log(error)
      }
  }
};

export function putQuantity (id, payload){
  return async function (dispatch){
      try {
           await axios.put(`http://localhost:3001/inventory/=${id}` , payload )
           console.log("editando action")
           console.log(id)
          console.log(payload)  
          return dispatch({
              type: PUT_QUANTITY,
              payload: payload,
                            
          })
      } catch (error) {
          console.log(error)
      }
  }
};
export const verifyToken = (token) => {
  return async(dispatch) => {
    console.log('SOy el token EN LA ACTION   =>  ', token)
    const config = { 
      headers: {Authorization: `Bearer ${token}`}
    }
    const bodyParameters = {
      caca: 'caconga'
    }
    console.log('soy el payload de la action =>  ', config)
    try{
      console.log(' por lo menos lo intente')
      let response = await axios.post(
        "http://localhost:3001/users/verifyToken",bodyParameters ,config
      )
      console.log('Soy la responseee =>> ' , response)
      return dispatch({
        type: VERIFY_TOKEN,
        payload: response.data
      })
    } catch (error) {
      console.log('SOY EL CATCH DEL VERIFY TOKEN ')
      console.log(error)
    }
  }
}

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

// const bodyParameters = {
//  key: "value"
// };

// Axios.post( 
// 'http://localhost:8000/api/v1/get_token_payloads',
// bodyParameters,
// config
// ).then(console.log).catch(console.log);
