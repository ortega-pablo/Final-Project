import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";




export const getProducts = () => {
    return async (dispatch) => {
        let response = await axios("http://localhost:3001/products")
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