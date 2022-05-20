import { Button, TableCell, TableRow, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export const TableSpecific = ({ productToUpdate }) => {

    
    const validationSchema = yup.object({
        name: yup
        .string("Ingrese el nombre de la nueva categoria")
        //   .notOneOf(allSpecif.map((p) => p) ,"Ya existe una especificación con ese nombre"
        // ),
          .required("El nombre es requerido")
    
        
      });
    
      const formik = useFormik({
        initialValues: {
          value:  "",
           },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          alert(JSON.stringify(values, null, 1));
          console.log("agregado")
        //   await dispatch(postAddNewSpecification(values));
        //   await dispatch(getAllSpecifications())
        },
      });
  return (
    <>
      <h1>tabla para editar especificacione</h1>

      {productToUpdate?.specifications.map((s) => {
        return (
          <>
            <TableRow>
              <TableCell>
                <b>Especificación a modificar:</b>
              </TableCell>
              <TableCell>{s.name}</TableCell>   
               <TextField 
                 id="outlined-basic"
                 label="Nuevo valo"
                 variant="outlined"
                 name="value:"
               
                 value={formik.values["value:"]}
               onChange={formik.handleChange}
               error={formik.touched["value:"] && Boolean(formik.errors["value:"])}
               helperText={formik.touched["value:"] && formik.errors["value:"]}
            />
              
              <Button
                // value={c.id}
                // onClick={(e) => handleDeleteCat(e)}
                // name="delete"
                // startIcon={<EditIcon />}
              >
                Modificar
              </Button>
            </TableRow>
          

         
            
          </>
          
        );
      })}
    </>
  );
};
