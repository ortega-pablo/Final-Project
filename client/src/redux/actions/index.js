import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return async (dispatch) => {
        let respuesta = {data: [{
            "id": 1,
            "name": "nombre aproximado de una minadora",
            "sku": 123123112,
            "brand": "Antmine", 
            "price": 123.23,
            "description": "es lo mismo una comilla que la otra json tonto",
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjEK4UVWAY3kyHr3wW4pZ7mC3S28PzVCDB6_UoXlZ9HQnE030t3GIRlgzyT99EpweS3A&usqp=CAU",
            "image": ["https://previews.123rf.com/images/corund/corund1510/corund151000101/46944923-.jpg","https://previews.123rf.com/images/corund/corund1510/corund151000101/46944923-.jpg"],
            "warranty": "La garantia durara lo que me salga de las ganas" ,
            "createdAt": "2017-03-31 9:30:20",
            "updatedAt": "2017-03-31 9:30:20",
            "producSpecification": [{"value": "soy una especificacion"},{"value": "soy otra especificacion"}],   
            "category": [{ "name": "producto", "description": "soy una descripcion muy completa", "thumbnail": "url a imagen"},{"name": "producto", "description": "soy una descripcion muy completa", "thumbnail": "url a imagen"}], 
            "discount": "boolean",
            "productDimension": "Alto222xAncho222xProfundo222", 
            "packageDimension": "Alto222xAncho222xProfundo222",
            "netWeight": 20.2, 
            "grossWeight": 20.2 
        },{
            "id": 2,
            "name": "otro nombre aproximado de una minadora",
            "sku": 123123112,
            "brand": "Antmine", 
            "price": 123.23,
            "description": "es lo mismo una comilla que la otra json tonto",
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjEK4UVWAY3kyHr3wW4pZ7mC3S28PzVCDB6_UoXlZ9HQnE030t3GIRlgzyT99EpweS3A&usqp=CAU",
            "image": ["https://previews.123rf.com/images/corund/corund1510/corund151000101/46944923-.jpg","https://previews.123rf.com/images/corund/corund1510/corund151000101/46944923-.jpg"],
            "warranty": "La garantia durara lo que me salga de las ganas" ,
            "createdAt": "2017-03-31 9:30:20",
            "updatedAt": "2017-03-31 9:30:20",
            "producSpecification": [{"value": "soy una especificacion"},{"value": "soy otra especificacion"}],   
            "category": [{ "name": "producto", "description": "soy una descripcion muy completa", "thumbnail": "url a imagen"},{"name": "producto", "description": "soy una descripcion muy completa", "thumbnail": "url a imagen"}], 
            "discount": "boolean",
            "productDimension": "Alto222xAncho222xProfundo222", 
            "packageDimension": "Alto222xAncho222xProfundo222",
            "netWeight": 20.2, 
            "grossWeight": 20.2 
        },{
            "id": 3,
            "name": "otro 2 aproximado de una minadora",
            "sku": 123123112,
            "brand": "Antmine", 
            "price": 123.23,
            "description": "es lo mismo una comilla que la otra json tonto",
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjEK4UVWAY3kyHr3wW4pZ7mC3S28PzVCDB6_UoXlZ9HQnE030t3GIRlgzyT99EpweS3A&usqp=CAU",
            "image": ["https://previews.123rf.com/images/corund/corund1510/corund151000101/46944923-.jpg","https://previews.123rf.com/images/corund/corund1510/corund151000101/46944923-.jpg"],
            "warranty": "La garantia durara lo que me salga de las ganas" ,
            "createdAt": "2017-03-31 9:30:20",
            "updatedAt": "2017-03-31 9:30:20",
            "producSpecification": [{"value": "soy una especificacion"},{"value": "soy otra especificacion"}],   
            "category": [{ "name": "producto", "description": "soy una descripcion muy completa", "thumbnail": "url a imagen"},{"name": "producto", "description": "soy una descripcion muy completa", "thumbnail": "url a imagen"}], 
            "discount": "boolean",
            "productDimension": "Alto222xAncho222xProfundo222", 
            "packageDimension": "Alto222xAncho222xProfundo222",
            "netWeight": 20.2, 
            "grossWeight": 20.2 
        }]}
        return dispatch ({
            type: GET_PRODUCTS,
            payload: respuesta.data
        })
    }
}