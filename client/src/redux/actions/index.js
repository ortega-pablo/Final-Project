import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_PER_CATEGORY = "FILTER_PER_CATEGORY";
export const FILTER_PER_SUBCATEGORY = "FILTER_PER_SUBCATEGORY";
export const FILTER_PER_PRICE = "FILTER_PER_PRICE";
export const FILTER_PER_NAME = "FILTER_PER_NAME";
export const POST_CREATE_USER = "POST_CREATE_USER";




export const getProducts = (name) => {
    return async (dispatch) => {
        let response;
        if (name === undefined) response = await axios(`http://localhost:3001/products`);
        else {
            response = await axios(`http://localhost:3001/products?name=${name}`)
        };
        console.log(response)
        return dispatch ({
            type: GET_PRODUCTS,
            payload: response.data
        })
    }
};

export const getDetail = (id) => {
    return async (dispatch) => {
        let response = await axios(`http://localhost:3001/productDetail/${id}`)
        return dispatch ({
            type: GET_DETAIL,
            payload: response.data
        })
    }
}

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
  }
}

export const filterPerPrice = (range) => {
    return async (dispatch) =>{ 
        return dispatch({
            type: FILTER_PER_PRICE,
            payload: range
        })
    }
} 
