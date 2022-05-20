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
export const GET_INVENTORY = "GET_INVENTORY";

export const PUT_INVENTORY = "PUT_INVENTORY";
export const PUT_CATEGORY_TO_PRODUCT = "PUT_CATEGORY_TO_PRODUCT";
export const PUT_SUBCATEGORY_TO_PRODUCT = "PUT_SUBCATEGORY_TO_PRODUCT";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const PUT_CATEGORY = "PUT_CATEGORY";









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
           await axios.put(`http://localhost:3001/products?productId=${id}` , payload )
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


export const getInventary = (id) => {
  return async (dispatch) => {
    let response = await axios(`http://localhost:3001/inventory`);
    return dispatch({
      type: GET_INVENTORY,
      payload: response.data,
    });
  };
};


export function putQuantity (id, payload){
  return async function (dispatch){
      try {
           await axios.put(`http://localhost:3001/inventory/${id}` , payload )
          
          return dispatch({
              type: PUT_INVENTORY,
              payload: payload,
                            
          })
      } catch (error) {
          console.log(error)
      }
  }
};

export function putCategoryToProduct (idP, idC ){
  return async function (dispatch){
      try {
           await axios.put(`http://localhost:3001/products?productId=${idP}&categoryId=${idC}`  )
          console.log(idP)
          console.log(idC)
          return dispatch({
              type: PUT_CATEGORY_TO_PRODUCT,
            
                            
          })
      } catch (error) {
          console.log(error)
      }
  }
};

export function putSubCategoryToProduct (idP, idSc ){
  return async function (dispatch){
      try {
           await axios.put(`http://localhost:3001/products?productId=${idP}&subCategoryId=${idSc}`  )
     
          return dispatch({
              type: PUT_SUBCATEGORY_TO_PRODUCT,
            
                            
          })
      } catch (error) {
          console.log(error)
      }
  }
};

export function deleteCategory (idCat){
  return async function (dispatch){
      try {
           await axios.delete(`http://localhost:3001/categories/${idCat}` )
           console.log("eliminando categoria")

          return dispatch({
              type: DELETE_CATEGORY,
              payload: idCat
              
          })
      } catch (error) {
          console.log(error)
      }
  }
};


export function putCategory (idC, payload ){
  return async function (dispatch){
      try {
           await axios.put(`http://localhost:3001/categories/${idC}`, payload  )
          console.log(idC)
          console.log(payload)
          return dispatch({
              type: PUT_CATEGORY,
            
                            
          })
      } catch (error) {
          console.log(error)
      }
  }
};
