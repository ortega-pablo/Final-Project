import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const POST_ADD_CATEROY_TO_PRODUCT = "POST_ADD_CATEROY_TO_PRODUCT";
export const POST_ADD_SPECIFICATION_TO_PRODUCT =
  "POST_ADD_SPECIFICATION_TO_PRODUCT";
export const POST_NEW_ASK = "POST_NEW_ASK";
export const POST_NEW_ANSWER = "POST_NEW_ASK";
export const POST_NEW_REVIEW = "POST_NEW_REVIEW";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_PER_CATEGORY = "FILTER_PER_CATEGORY";
export const FILTER_PER_SUBCATEGORY = "FILTER_PER_SUBCATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const FILTER_PER_PRICE = "FILTER_PER_PRICE";
export const FILTER_PER_NAME = "FILTER_PER_NAME";
export const POST_CREATE_USER = "POST_CREATE_USER";
export const POST_LOGIN_USER = "POST_LOGIN_USER";
export const POST_ADD_SUB_CATEGORY_TO_PRODUCT =
  "POST_ADD_SUB_CATEGORY_TO_PRODUCT";
export const POST_NEW_DIRECTION = "POST_NEW_DIRECTION";
export const POST_ADD_SUB_CATEGORY = "POST_ADD_SUB_CATEGORY";
export const POST_ADD_QUANTITY = "POST_ADD_QUANTITY";
export const POST_ADD_NEW_SPECIFICATION = "POST_ADD_NEW_SPECIFICATION";
export const POST_ADD_DISCOUNT_TO_PRODUCT = "POST_ADD_DISCOUNT_TO_PRODUCT";
export const GET_ALL_SPECIFICATIONS = "GET_ALL_SPECIFICATIONS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const PUT_QUANTITY = "PUT_QUANTITY";
export const VERIFY_TOKEN = "VERIFY_TOKEN";
export const GET_INVENTORY = "GET_INVENTORY";
export const PUT_INVENTORY = "PUT_INVENTORY";
export const PUT_CATEGORY_TO_PRODUCT = "PUT_CATEGORY_TO_PRODUCT";
export const PUT_SUBCATEGORY_TO_PRODUCT = "PUT_SUBCATEGORY_TO_PRODUCT";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const PUT_CATEGORY = "PUT_CATEGORY";
export const PUT_SUB_CATEGORY = "PUT_SUB_CATEGORY";
export const GET_SUB_CATEGORIES = "GET_SUB_CATEGORIES";
export const DELETE_SUB_CATEGORY = "DELETE_SUB_CATEGORY";
export const GET_ALL_DISCOUNT = "GET_ALL_DISCOUNT";
export const DELETE_ONE_DISCOUNT_TO_A_PRODUCT =
  "DELETE_ONE_DISCOUNT_TO_A_PRODUCT";
export const PUT_DISCOUNT = "PUT_DISCOUNT";
export const POST_DISCOUNT = "POST_DISCOUNT";
export const DELETE_DISCOUTN = "DELETE_DISCOUTN";
export const PUT_VALUE_SPECIFICATION_OF_ONE_PRODUCT =
  "PUT_VALUE_SPECIFICATION_OF_ONE_PRODUCT";
export const PUT_REMOVE_ONE_SPECIFICATION_ONE_PRODUCT =
  "PUT_REMOVE_ONE_SPECIFICATION_ONE_PRODUCT";
export const DELETE_SPECIFICATION = "DELETE_SPECIFICATION";
export const POST_ADD_IMAGE = "POST_ADD_IMAGE";
export const DELETE_IMAGE_TO_PRODUCT = "DELETE_IMAGE_TO_PRODUCT";
export const PUT_NAME_SPECIFICATION = "PUT_NAME_SPECIFICATION";
export const PUT_NAME_SUBCATEGORY = "PUT_NAME_SUBCATEGORY";
export const NEW_PAY = "NEW_PAY";
export const SET_SHIPPING_DATA = "SET_SHIPPING_DATA";
export const GET_IMAGES = "GET_IMAGES";
export const ADD_TO_CART = "ADD_TO_CART";
export const SET_TOTAL_CART = "SET_TOTAL_CART";
export const GET_CART_BY_ID = "GET_CART_BY_ID";
export const GET_USERS = "GET_USERS";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const GET_CART_FOR_CHILD = "GET_CART_FOR_CHILD";
export const SET_AMOUNT = "SET_AMOUNT";
export const CLEAR_CART = "CLEAR_CART";
export const GET_USER_ID_BY_TOKEN = "GET_USER_ID_BY_TOKEN";
export const GET_ALL_DIRECTIONS = "GET_ALL_DIRECTIONS";
export const GET_DETAIL_ONE_PRODUCT = "GET_DETAIL_ONE_PRODUCT";
export const GET_ONE_USER = "GET_ONE_USER";
export const GET_ALL_ASK = "GET_ALL_ASK";
export const GET_USER_ASK_FOR_ONE_PRODUCT = "GET_USER_ASK_FOR_ONE_PRODUCT";
export const GET_ALL_ORDER = "GET_ALL_ORDER";
export const GET_ALL_ORDER_ONE_USER = "GET_ALL_ORDER_ONE_USER";
export const GET_USER_ASK_FOR_ALL_PRODUCT = "GET_USER_ASK_FOR_ALL_PRODUCT";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_USER = "DELETE_USER";
export const DELETE_ADMIN = "DELETE_ADMIN";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_ADMIN = "UPDATE_ADMIN";
export const ORDER_USERS = "ORDER_USERS";
export const FILTER_USERS = "FILTER_USERS";
export const FILTER_USERS_ALL = "FILTER_USERS_ALL";
export const CHANGE_ROLE_USER = "CHANGE_ROLE_USER";
export const CHANGE_ROLE_ADMIN = "CHANGE_ROLE_ADMIN";
export const GET_ALL_ASK_ALL_PRODUCTS = "GET_ALL_ASK_ALL_PRODUCTS";
export const GET_ASKS_ONE_USER_ONE_PRODUCT = "GET_ASKS_ONE_USER_ONE_PRODUCT";
export const CLEAR_ASKS_ONE_USER_ONE_PRODUCT =
  "CLEAR_ASKS_ONE_USER_ONE_PRODUCT";
export const UPDATE_USER_FOR_USER = "UPDATE_USER_FOR_USER";
export const UPDATE_PASSWORD_FOR_USER = "UPDATE_PASSWORD_FOR_USER";
export const GET_BANNER = "GET_BANNER";
export const POST_BANNER = "POST_BANNER";

export const DELETE_BANNER = "DELETE_BANNER";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const PUT_INVENTORY_AFTER_ORDER = "PUT_INVENTORY_AFTER_ORDER";
export const DELETE_ASK = "DELETE_ASK";





export const getProducts = (name) => {
  return async (dispatch) => {
    let response;
    if (name === undefined) response = await axios(`/products`);
    else {
      response = await axios(`/products?name=${name}`);
    }

    return dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let response = await axios(`/productDetail/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
  };
};

export const postProduct = (payload) => {
  console.log(payload);
  return async function (dispatch) {
    try {
      let json = await axios.post(`/products`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postNewAsk = (payload, productId, userId) => {
  return async function (dispatch) {
    try {
      console.log(payload);
      let json = await axios.post(
        `/asks?userId=${userId}&productId=${productId}`,
        payload
      );
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};
export const postNewAnswer = (payload, askId, userId) => {
  return async function (dispatch) {
    try {
      console.log(payload);
      await axios.post(`/answers?userId=${userId}&askId=${askId}`, payload);
    } catch (error) {
      console.log(error);
    }
    return dispatch({
      type: POST_NEW_ANSWER,
    });
  };
};

export const postNewReview = (payload, productId, userId, rating,orderId) => {
  return async function (dispatch) {
    try {
      console.log(payload);
      await axios.post(
        `/orders/review?userId=${userId}&productId=${productId}&rating=${rating}&orderId=${orderId}`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
    return dispatch({
      type: POST_NEW_REVIEW,
    });
  };
};

export const postAddCateroryToProduct = (idP, idC, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `/products/addCategory?productId=${idP}&categoryId=${idC}`,
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
        `/products/addSubCategory?productId=${idP}&subCategoryId=${idSC}`,
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
      let json = await axios.post(`/categories`, payload);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddSubCategory = (idC, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`/categories?categoryId=${idC}`, payload);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddQuantity = (idP, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`/inventory?productId=${idP}`, payload);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postAddNewSpecification = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`/specifications`, payload);

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
        `/products/addSpecification?productId=${idP}&specificationId=${idE}`,
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
    let response = await axios("/specifications/all");
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
        `/products/addDiscount?productId=${idP}&discountId=${idD}`
      );

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    let response = await axios("/categories");
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
      let response = await axios.post("/users/create", payload);
      await axios.post("/sendEmail/welcome", payload);
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
      let response = await axios.post("/users/login", payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("hubo un error en el login");
      console.log(error);
    }
  };
};

export const filterPerPrice = (range) => {
  console.log("El range es:",range)
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
      type: CLEAR_FILTERS,
    });
  };
};

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/products/${id}`);

      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putProduct(id, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/products?productId=${id}`, payload);

      return dispatch({
        type: PUT_PRODUCT,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getInventary = (id) => {
  return async (dispatch) => {
    let response = await axios(`/inventory`);
    return dispatch({
      type: GET_INVENTORY,
      payload: response.data,
    });
  };
};

export function putQuantity(id, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/inventory/${id}`, payload);

      return dispatch({
        type: PUT_INVENTORY,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putCategoryToProduct(idP, idC) {
  return async function (dispatch) {
    try {
      await axios.put(`/products?productId=${idP}&categoryId=${idC}`);
      return dispatch({
        type: PUT_CATEGORY_TO_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putSubCategoryToProduct(idP, idSc) {
  console.log("desero borrar", idP, idSc);
  return async function (dispatch) {
    try {
      await axios.put(`/products?productId=${idP}&subCategoryId=${idSc}`);
      console.log("quiero eliminar las sub desde redux");
      console.log(idP);
      console.log(idSc);
      return dispatch({
        type: PUT_SUBCATEGORY_TO_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCategory(idCat) {
  return async function (dispatch) {
    try {
      await axios.delete(`/categories/${idCat}`);
      console.log("eliminando categoria");

      return dispatch({
        type: DELETE_CATEGORY,
        payload: idCat,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function putCategory(idC, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/categories/${idC}`, payload);

      return dispatch({
        type: PUT_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putSubCategory(idSc, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/categories/subcategories/${idSc}`, payload);

      return dispatch({
        type: PUT_SUB_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getSubCategories = () => {
  return async (dispatch) => {
    let response = await axios("/categories/subcategories");
    return dispatch({
      type: GET_SUB_CATEGORIES,
      payload: response.data,
    });
  };
};

export function deleteSubCategory(idSc) {
  return async function (dispatch) {
    try {
      await axios.delete(`/categories/subcategories/${idSc}`);
      console.log("eliminando sub categoria");

      return dispatch({
        type: DELETE_SUB_CATEGORY,
        payload: idSc,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getAllDiscount = () => {
  return async (dispatch) => {
    let response = await axios("/discounts");
    return dispatch({
      type: GET_ALL_DISCOUNT,
      payload: response.data,
    });
  };
};

export function putRemoveOneDiscuntToProduct(idP, idD, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/products?productId=${idP}&discountId=${idD}`, payload);

      return dispatch({
        type: DELETE_ONE_DISCOUNT_TO_A_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putDiscount(idD, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/discounts/${idD}`, payload);
      return dispatch({
        type: PUT_DISCOUNT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postDiscount = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`/discounts`, payload);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const verifyToken = (token) => {
  return async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let response = await axios.get("/users/verifyToken", config);
      return dispatch({
        type: VERIFY_TOKEN,
        payload: response.data,
      });
    } catch (error) {
      console.log("Usuario no logeado");
    }
  };
};

export const getUserIdByToken = (token) => {
  return async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let response = await axios.get("/users/userId", config);
      return response.data.idUser;
    } catch (error) {
      console.log("id no encontrado");
    }
  };
};

export function deleteDiscount(idD) {
  return async function (dispatch) {
    try {
      await axios.delete(`/discounts/${idD}`);

      return dispatch({
        type: DELETE_DISCOUTN,
        payload: idD,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putValueSpecificationOneProduct(idP, idS, payload) {
  return async function (dispatch) {
    try {
      await axios.put(
        `/specifications?productId=${idP}&specificationId=${idS}`,
        payload
      );

      return dispatch({
        type: PUT_VALUE_SPECIFICATION_OF_ONE_PRODUCT,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putRemoveOneSpecificationOneProduct(idP, idS, payload) {
  return async function (dispatch) {
    try {
      await axios.put(
        `/products?productId=${idP}&specificationId=${idS}`,
        payload
      );

      return dispatch({
        type: PUT_REMOVE_ONE_SPECIFICATION_ONE_PRODUCT,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getImages = () => {
  return async (dispatch) => {
    let response = await axios("/categories/subcategories");
    return dispatch({
      type: GET_SUB_CATEGORIES,
      payload: response.data,
    });
  };
};

export const postAddImageToProduct = (idP, payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `/images/uploadProduct?productId=${idP}`,
        payload
      ); //url + body
      console.log(idP);
      console.log(payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export function deleteSpecification(idS) {
  return async function (dispatch) {
    try {
      await axios.delete(`/specifications/${idS}`);

      return dispatch({
        type: DELETE_SPECIFICATION,
        payload: idS,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteImageToProduct(idP, idI) {
  return async function (dispatch) {
    try {
      await axios.delete(`/images?productId=${idP}&imageId=${idI}`);

      return dispatch({
        type: DELETE_IMAGE_TO_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putNameSpecification(idS, payload) {
  console.log("ids => ", idS);
  console.log("payload => ", payload);
  return async function (dispatch) {
    try {
      await axios.put(`/specifications/${idS}`, payload);

      return dispatch({
        type: PUT_NAME_SPECIFICATION,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postNewPaymentMethod = (payload, addressId, userId) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/checkOut?userId=${userId}&addressId=${addressId}`,
        payload
      );
      console.log("response despues del post", response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const setShippingData = (payload) => {
  return async (dispatch) => {
    return dispatch({
      type: SET_SHIPPING_DATA,
      payload: payload,
    });
  };
};

export function putNameSubcategoria(idS, payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/categories/subcategories/${idS}`, payload);

      return dispatch({
        type: PUT_NAME_SUBCATEGORY,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getImage = () => {
  return async (dispatch) => {
    let response = await axios("/images");
    return dispatch({
      type: GET_IMAGES,
      payload: response.data,
    });
  };
};
export const getDetailOneProduct = (id) => {
  return async (dispatch) => {
    let response = await axios(`/productDetail/${id}`);
    return dispatch({
      type: GET_DETAIL_ONE_PRODUCT,
      payload: response.data,
    });
  };
};

export const getCartById = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return async (dispatch) => {
    try {
      let responseId = await axios.get("/users/userId", config);
      let response = await axios(
        `/shoppingCart?userId=${responseId.data.idUser}`
      );
      console.log(response.data);
      return dispatch({
        type: GET_CART_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("rompi en getCartById -> ", error);
    }
  };
};
export const getCartForChild = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios(`/shoppingCart?userId=${id}`);
      return dispatch({
        type: GET_CART_FOR_CHILD,
        payload: response.data,
      });
    } catch (error) {
      console.log("rompi en getCartForChild => ", error);
    }
  };
};

export const addItemToCart = (productId, token, cantidad) => {
  return async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let responseId = await axios.get("/users/userId", config);
      await axios.put(
        `/shoppingCart/addProduct?userId=${responseId.data.idUser}&productId=${productId}`,
        { quantity: cantidad }
      );
      return dispatch({
        type: ADD_TO_CART,
      });
    } catch (error) {
      console.log("rompi en getCartById -> ", error);
    }
  };
};

export const deleteFromCart = (productId, userId) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `/shoppingCart/removeProduct?userId=${userId}&productId=${productId}`
      );
      return dispatch({
        type: DELETE_FROM_CART,
      });
    } catch (error) {
      console.log("rompi en el deleteFromCart -> ", error);
    }
  };
};

export const setCartAmount = (id, amount) => {
  console.log("este es el amount",amount)
  return async (dispatch) => {
    try {
      await axios.put(`/shoppingCart/addAmount?userId=${id}`, { amount });
      return dispatch({
        type: SET_AMOUNT,
      });
    } catch (error) {
      console.log("rompi en setCartAmount => ", error);
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    return dispatch({
      type: CLEAR_CART,
    });
  };
};

export function getDetailOneUsers(id) {
  return async function (dispatch) {
    try {
      const response = await axios(`/users/${id}`);
      return dispatch({
        type: GET_ONE_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getAllAsk = () => {
  return async (dispatch) => {
    let response = await axios(`/asks`);
    return dispatch({
      type: GET_ALL_ASK,
      payload: response.data,
    });
  };
};

export const getAsksForOneProducts = (idUser, idProduct) => {
  return async (dispatch) => {
    let response = await axios(`/asks?userId=${idUser}&productId=${idProduct}`);
    return dispatch({
      type: GET_USER_ASK_FOR_ONE_PRODUCT,
      payload: response.data,
    });
  };
};

export const getAsksForAllProductsOneUser = (idUser) => {
  return async (dispatch) => {
    let response = await axios(`/asks/user?userId=${idUser}`);
    return dispatch({
      type: GET_USER_ASK_FOR_ALL_PRODUCT,
      payload: response.data,
    });
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    let response = await axios(`/orders`);
    return dispatch({
      type: GET_ALL_ORDER,
      payload: response.data,
    });
  };
};

export const getAllOrdersOneUser = (idUser) => {
  return async (dispatch) => {
    let response = await axios(`/orders?userId=${idUser}`);
    return dispatch({
      type: GET_ALL_ORDER_ONE_USER,
      payload: response.data,
    });
  };
};

export const getAllDirections = (idUser) => {
  return async (dispatch) => {
    try {
      let response = await axios(`/users/address/${idUser}`);
      return dispatch({
        type: GET_ALL_DIRECTIONS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postNewDirection = (idUser, payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`/users/address/${idUser}`, payload);
    } catch (error) {
      console.log(error);
    }
    return dispatch({
      type: POST_NEW_DIRECTION,
    });
  };
};
export const getAllAsksAllProducts = () => {
  return async (dispatch) => {
    let response = await axios(`/asks/allUser`);
    return dispatch({
      type: GET_ALL_ASK_ALL_PRODUCTS,
      payload: response.data,
    });
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    let response = await axios(`/users`);
    return dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
  };
};

export const getAsksOneUserOneProduct = (userId, productId) => {
  return async (dispatch) => {
    let response = await axios(`/asks?userId=${userId}&productId=${productId}`);
    return dispatch({
      type: GET_ASKS_ONE_USER_ONE_PRODUCT,
      payload: response.data,
    });
  };
};
export function clearAsksOneUserOneProduct() {
  return {
    type: CLEAR_ASKS_ONE_USER_ONE_PRODUCT,
  };
}

export function deleteUser({ userId, token }) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return async function (dispatch) {
    try {
      let responseId = await axios.get("/users/userId", config);

      await axios.delete(
        `/users/deleteUser?adminId=${responseId.data.idUser}&userId=${userId}`
      );
      return dispatch({
        type: DELETE_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteAdmin({ adminId, token }) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return async function (dispatch) {
    try {
      let responseId = await axios.get("/users/userId", config);

      await axios.delete(
        `/users/deleteAdmin?adminId=${adminId}&superAdminId=${responseId.data.idUser}`
      );
      return dispatch({
        type: DELETE_ADMIN,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editUser({ userId, token, payload }) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return async function (dispatch) {
    try {
      let responseId = await axios.get("/users/userId", config);

      await axios.put(
        `/users/editUser?userId=${userId}&adminId=${responseId.data.idUser}`,
        payload
      );
      return dispatch({
        type: UPDATE_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editAdmin({ adminId, token, payload }) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return async function (dispatch) {
    try {
      let responseId = await axios.get("/users/userId", config);

      await axios.put(
        `/users/editAdmin?adminId=${adminId}&superAdminId=${responseId.data.idUser}`,
        payload
      );
      return dispatch({
        type: UPDATE_ADMIN,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderUsers(orderType) {
  return async function (dispatch) {
    return dispatch({
      type: ORDER_USERS,
      payload: orderType,
    });
  };
}

export function filterUsers(filterType) {
  return async function (dispatch) {
    return dispatch({
      type: FILTER_USERS,
      payload: filterType,
    });
  };
}

export function filterUsersAll() {
  return async function (dispatch) {
    return dispatch({
      type: FILTER_USERS_ALL,
    });
  };
}

export function userToAdmin(userId, token) {
  return async function (dispatch) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put(`/users/changeUserToAdmin/${userId}`, null, config);
      return dispatch({
        type: CHANGE_ROLE_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editUserForUser(token, payload) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return async function (dispatch) {
    try {
      let responseId = await axios.get("/users/userId", config);
      await axios.put(
        `/users/updateDatesUser/${responseId.data.idUser}`,
        payload
      );
      return dispatch({
        type: UPDATE_USER_FOR_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function adminToUser(userId, token) {
  return async function (dispatch) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put(`/users/changeAdminToUser/${userId}`, null, config);
      return dispatch({
        type: CHANGE_ROLE_ADMIN,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editPasswordForUser(token, payload) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return async function (dispatch) {
    try {
      let responseId = await axios.get("/users/userId", config);
      await axios.put(
        `/users//resetPasswordWithOld?userId=${responseId.data.idUser}`,
        payload
      );
      return dispatch({
        type: UPDATE_PASSWORD_FOR_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postAddImageToBanner = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.post(`/images/uploadBanner`, payload);
      console.log(payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getImageBanner = () => {
  return async (dispatch) => {
    let response = await axios(`/images/uploadBanner`);
    return dispatch({
      type: GET_BANNER,
      payload: response.data,
    });
  };
};

export function deleteImageToBanner(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/images/bannerImage?imageId=${id}`);

      return dispatch({
        type: DELETE_BANNER,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getOrderById = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`/orders?orderId=${id}`);
      return dispatch({
        type: GET_ORDER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function putQuantityAfterOrder(productId,quantity) {
  return async function (dispatch) {
    try {
      console.log("ESTE ES EL PRODUCT ID",productId)
      console.log("ESTE ES EL QUANTITY",quantity)
        await axios.put(`/inventory?productId=${productId}&quantity=${quantity}` );

      return dispatch({
        type: PUT_INVENTORY_AFTER_ORDER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const postForgotPasswordSendEmail = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("/users/passwordResetWithEmail", payload);
      return response;
    } catch (error) {
      console.log("hubo un error");
      console.log(error);
    }
  };
};

export const postResetPassword = (payload, token) => {
  return async (dispatch) => {
    const obj = {
      ...payload,
      resetToken: token,
    };
    console.log(obj);
    try {
      let response = await axios.post("/users/ResetPassword", obj);
      return response.data;
    } catch (error) {
      console.log("hubo un error");
      console.log(error);
    }
  };
};



export function deleteAsk(idAsk) {
  return async function (dispatch) {
    try {
      await axios.delete(`/asks?askId=${idAsk}`);

      return dispatch({
        type: DELETE_ASK,
       
      });
    } catch (error) {
      console.log(error);
    }
  };
}


// ?askId=2