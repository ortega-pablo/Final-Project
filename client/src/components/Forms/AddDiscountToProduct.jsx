import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscount, getProducts, postAddDiscountToProduct, putRemoveOneDiscuntToProduct } from "../../redux/actions";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const AddDiscountToProduct = ({newProdId, newProduct}) => {
  const dispatch = useDispatch();
  const allDiscounts = useSelector((state) => state.discounts);
// idP = newProduct

  useEffect(() => {
      dispatch(getAllDiscount());
    // dispatch(postAddDiscountToProduct());
  }, [dispatch]);


  const validationSchema = yup.object({
    quantity: yup
      .number("El stock es numerico")
      .typeError("El stock deber ser numerico")
      .required(
        "El stock es requerido si es que lo deseas agregar.Luego tambien lo podrás hacer desde el panel de administrador"
      )
      .positive("El stock debe ser positivo"),
  });

  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));

      //   await dispatch(postAddQuantity(newProdId, values));
      //   await dispatch(getProducts())
      resetForm({ values: "" });
    },
  });


  async function handleDiscount(e){
      e.preventDefault()
if(e.target.checked){
    await dispatch(postAddDiscountToProduct(newProduct.id, e.target.value))
}else{
    await dispatch(putRemoveOneDiscuntToProduct(newProduct.id, e.target.value))
}  
     
  }

  return (
    <>
      <div>AddDiscountToProduct</div>



      { allDiscounts.map( d=> {
          return (
            <FormGroup>
            <FormControlLabel  control={<Checkbox defaultChecked={d.products.some( p => p.id ==newProdId)} value={d.id}  onChange={ e => handleDiscount(e) }  />} label={d.name}   /> 
          <label> {d.description}. Descuento: {d.discountPercent} %</label> 
           
            
          </FormGroup>
          )
      })

      }
     
    </>
  );
};
