import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DETAIL = "GET_DETAIL";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
export const POST_ADD_CATEROY_TO_PRODUCT = "POST_ADD_CATEROY_TO_PRODUCT"
export const POST_ADD_SPECIFICATION_TO_PRODUCT = "POST_ADD_SPECIFICATION_TO_PRODUCT"



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
};

export const getAllCategories = () => {
    return async (dispatch) => {
        let response = await axios(`http://localhost:3001/allcategories`)
        return dispatch ({
            type: GET_ALL_CATEGORIES,
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