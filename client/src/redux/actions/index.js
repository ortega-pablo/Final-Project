import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";

export const POST_PRODUCT = "POST_PRODUCT";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
export const POST_ADD_CATEROY_TO_PRODUCT = "POST_ADD_CATEROY_TO_PRODUCT"
export const POST_ADD_SPECIFICATION_TO_PRODUCT = "POST_ADD_SPECIFICATION_TO_PRODUCT"

export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_PER_CATEGORY = "FILTER_PER_CATEGORY";
export const FILTER_PER_SUBCATEGORY = "FILTER_PER_SUBCATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY"

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
};


export const getDetail = (id) => {
    return async (dispatch) => {
        let response = await axios(`http://localhost:3001/productDetail/${id}`)
        return dispatch ({
            type: GET_DETAIL,
            payload: response.data
        })
    }

};


// export const getAllEspecifications = () => {
//     return async (dispatch) => {
//         let response = await axios(`http://localhost:3001/allcategories`)
//         return dispatch ({
//             type: GET_ALL_CATEGORIES,
//             payload: response.data
//         })
//     }
// };


export const postProduct = (payload) => {
    return async function (dispatch){
        try {
                
            let json = await axios.post(`http://localhost:3001/products`, payload)  //url + body
        
            return json
        } catch (error) {
            console.log(error)
        }
         }}

         export const postAddCateroryToProduct = (idP, idC, payload) => {
            return async function (dispatch){
                try {
                        
                    let json = await axios.post(`http://localhost:3001/products/addCategory?productId=${idP}&categoryId=${idC}`, payload)  //url + body
                
                    return json
                } catch (error) {
                    console.log(error)
                }
                 }}

                 export const postAddSpecificationToProduct = (idP, idE, payload) => {
                    return async function (dispatch){
                        try {
                                
                            let json = await axios.post(`http://localhost:3001/products/addSpecification?productId=${idP}&specificationId=${idE}`, payload)  //url + body
                        
                            return json
                        } catch (error) {
                            console.log(error)
                        }
                         }}

                         export const postAddCaterory = ( payload) => {
                            return async function (dispatch){
                                try {
                                        
                                    let json = await axios.post(`http://localhost:3001/categories`, payload)  //url + body
                                
                                    return json
                                } catch (error) {
                                    console.log(error)
                                }
                                 }}


export const getCategories = () => {
    return async (dispatch) => {
        let response = await axios("http://localhost:3001/categories");
        return dispatch({
            type: GET_CATEGORIES,
            payload: response.data
        })
    }
}

export const filterPerCategory = (category) => {
    return async (dispatch) => {
        return dispatch({
            type: FILTER_PER_CATEGORY,
            payload:category
        })
    }
}
export const filterPerSubCategory = (subCategory) => {
    return async (dispatch) => {
        return dispatch({
            type: FILTER_PER_SUBCATEGORY,
            payload: subCategory
        })
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
