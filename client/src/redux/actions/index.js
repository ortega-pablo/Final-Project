import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_PER_CATEGORY = "FILTER_PER_CATEGORY";
export const FILTER_PER_SUBCATEGORY = "FILTER_PER_SUBCATEGORY";
<<<<<<< HEAD
export const FILTER_PER_PRICE = "FILTER_PER_PRICE";
export const FILTER_PER_NAME = "FILTER_PER_NAME";

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
=======
export const POST_CREATE_USER = "POST_CREATE_USER";

let respuesta2 = {
  data: [
    {
      name: "categoria 1",
      description: "categoria 1 descripcion",
      thumbnail: "categoria 1 thumbnail",
      subCategories: ["subCategory1", "subCategory2", "subCategory3"],
    },
    {
      name: "categoria 2",
      description: "categoria 2 descripcion",
      thumbnail: "categoria 2 thumbnail",
      subCategories: ["subCategory1", "subCategory2", "subCategory3"],
    },
    {
      name: "categoria 3",
      description: "categoria43 descripcion",
      thumbnail: "categoria 3 thumbnail",
      subCategories: ["subCategory1", "subCategory2", "subCategory3"],
    },
    {
      name: "categoria 4",
      description: "categoria 4 descripcion",
      thumbnail: "categoria 4 thumbnail",
      subCategories: [],
    },
  ],
>>>>>>> a427894a8d5b131c1069b49837832805b1c96bd3
};

export const getProducts = () => {
  return async (dispatch) => {
    let response = await axios("http://localhost:3001/products");
    console.log(response);
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
<<<<<<< HEAD
}

export const filterPerPrice = (range) => {
    return async (dispatch) =>{ 
        return dispatch({
            type: FILTER_PER_PRICE,
            payload: range
        })
    }
} 
=======
  };
};
>>>>>>> a427894a8d5b131c1069b49837832805b1c96bd3
