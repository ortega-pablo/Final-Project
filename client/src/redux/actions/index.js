import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return async (dispatch) => {
        let respuesta = {data: [{nombre: 'Pedro'},{nombre: 'Fede'},{nombre:'Samu'}]}
        return dispatch ({
            type: GET_PRODUCTS,
            payload: respuesta.data
        })
    }
}