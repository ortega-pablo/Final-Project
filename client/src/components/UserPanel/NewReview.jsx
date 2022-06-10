import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIdByToken, postNewReview } from "../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';

export const NewReview = ({orderId, currentOrder, f}) => { //[2,3]
  console.log("soy f de la rev", f)
  const dispatch = useDispatch();
const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;



const copyOrderProducts = currentOrder?.orderProducts.map( p => p)
const [prod, setProd] = useState(copyOrderProducts)
console.log("soy prod",prod)   

let productosRestantes = []

for (let i = 0; i < f?.length; i++) {
  const g  = prod?.filter( p => p?.productId === f[i]) //[2,3]
  productosRestantes = [...productosRestantes, g]
console.log("soy g", g)
}
console.log("soy los productos restantes",productosRestantes)
// productosRestantes = prod?.filter( p => p?.productId == f)


// async function clickNewReview (e){
//     e.preventDefault()
//     const userId = await dispatch(getUserIdByToken(idToken));

// await dispatch(postNewReview(userId,1 ))
// console.log(userId)
// } orderProducts

console.log(currentOrder)
const allStar = [1,2,3,4,5]
const [rating, setRating]  = useState("")
const [productId, setProductId]  = useState("")


function handleRating(e){
    e.preventDefault()
    setRating(e.target.value)
    console.log(e.target.value)
}

function handleProductId(e){
    e.preventDefault()
    setProductId(e.target.value)
}

const validationSchema = yup.object({
    review: yup
      .string("Ingrese el nombre de la nueva categoria")
      .max(50, "La cantidad maxima de caracteres para el nombre de una sub categoría es 50")
      .required("El nombre es requerido"),
      
  });

  const formik = useFormik({
    initialValues: {
        review: "",
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      
    // if(true){
        const userId = await dispatch(getUserIdByToken(idToken));

        await dispatch(postNewReview(values, productId,userId,rating, orderId  ))
        console.log(values)
        console.log(productId)
        console.log(userId)
        console.log(rating)
        console.log(orderId)
        // setHaveReview(productId)

         const index = prod.findIndex( p => p.productId ===productId)
          prod.splice(index, 1)
          setProd(prod)
        console.log(prod)

    
    //   Swal.fire({
    //     background: '#DFDCD3',
    //     icon: 'success',
    //     title: 'Creada',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   resetForm({values:""})
    // }else {
    //   Swal.fire({
    //     background: '#DFDCD3',
    //     confirmButtonColor: '#B6893E',
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Seleccione una categoria'
    //   })

//     }


     },
  }
  );

  return (
    <>
        <Box sx={{display:'flex', }}>

        <InputLabel id="demo-simple-select-standard-label" sx={{m:3}}>
  Producto a calificar:
<Select
  labelId="demo-simple-select-standard-label"
  id="demo-simple-select-standard"
   value={productId}
  onChange={handleProductId}
  label="Age"
  type="click"
  name="productId"
  sx={{m:3}}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {productosRestantes?.map((p) => {
    return (
      <MenuItem value={p[0]?.productId}>
        {p[0]?.productName}
      </MenuItem>
    );
  })}
</Select>
</InputLabel>




<Box
  component="form"
  noValidate
  autoComplete="off"
//   onChange={handleInputNewSubCat}
 
  onSubmit={formik.handleSubmit}
  sx={{display:'flex', alignItems:'center'}}
>
  <TextField
    id="outlined-basic"
    label="Describe tu experiencia"
    variant="outlined"
    name="review"
    value={formik.values.review}
    onChange={formik.handleChange}
    error={formik.touched.review && Boolean(formik.errors.nareviewme)}
    helperText={formik.touched.review && formik.errors.review}
    sx={{m:3}}
  />

        <InputLabel id="demo-simple-select-standard-label" sx={{m:3}}>
  Calificar:
<Select
  labelId="demo-simple-select-standard-label"
  id="demo-simple-select-standard"
  value={rating}
  onChange={handleRating}
  label="Age"
  type="click"
  name="rating"
  sx={{m:3}}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {allStar?.map((s) => {
    return (
      <MenuItem value={s}>
        {s}
      </MenuItem>
    );
  })}
</Select>
</InputLabel>
  <Button type="submit" variant='contained' color="ambar3">Calificar</Button>
 
</Box>
</Box>
    </>
  );
};
