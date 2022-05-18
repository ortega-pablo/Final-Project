import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";
import { validateNewCat } from "./validacionInputNewCategoria/validateNewCat";
import { postAddCaterory, getCategories } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";



// const nombreExistente = allCategories.find(cat => cat.name.toLowerCase() === input.name.toLowerCase())

// if(nombreExistente){
//   console.log("ya existeel nombre")
//   setErrorName2(true);
//   setLeyendaErrorName2("La categoria ya existe");
// }

// { handleInputNewCategory, handleNewCategory, errorName2, leyendaErrorName2, errorDescription2, leyendaErrorDescription2 }

export const AddCategory = ({ allCategories }) => {
  const validationSchema = yup.object({
    name: yup
      // .validateName("Ya existe la categoria")
      .string("Ingrese el nombre de la nueva categoria")
      .required("El nombre es requerido"),
      // .test("Validar nombre existente", "Ya existe la categoria",  ),
    description: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
  });
  
  

  // yup.addMethod(yup.string, "validateName", function ( message)  {
  //   return (
  //     allCategories.find(
  //       (cat) => cat.name.toLowerCase() === this.name.toLowerCase()
  //     ) === true && message
  //   );
  // });



  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      await dispatch(postAddCaterory(values));
      await dispatch(getCategories());
    },
  });

  const dispatch = useDispatch();

  // const [errorName2, setErrorName2] = useState(false);
  // const [leyendaErrorName2, setLeyendaErrorName2] = useState("");
  // const [errorDescription2, setErrorDescription2] = useState(false);
  // const [leyendaErrorDescription2, setLeyendaErrorDescription2] = useState("");
  // const [errorThumbnail, setErrorThumbnailn] = useState(false);
  // const [leyendaErrorThumbnail, setLeyendaErrorThumbnail] = useState("");
  // const [input, setInput] = useState({
  //   name: "",
  //   description: "",
  //   thumbnail: "",
  // });
  // const [errors, setErrors] = useState({});

  async function handleNewCategory(e) {
    e.preventDefault();

    // const nombreExistente = allCategories.find(cat => cat.name.toLowerCase() === input.name.toLowerCase())

    // if(nombreExistente){
    //   console.log("ya existeel nombre")
    //   setErrorName2(true);
    //   setLeyendaErrorName2("La categoria ya existe");
    // }

    // if (errors?.name) {
    //   setErrorName2(true);
    //   setLeyendaErrorName2(errors?.name);
    // }
    // if (errors?.description) {
    //   setErrorDescription2(true);
    //   setLeyendaErrorDescription2(errors?.description);
    // }

    // if (!input.name) {
    //   e.preventDefault();
    //   setErrorName2(true);
    //   setLeyendaErrorName2("El nombre es obligatorio");
    // } else if (!input.description) {
    //   e.preventDefault();
    //   setErrorDescription2(true);
    //   setLeyendaErrorDescription2("La descripción es obligatoria");
    // } else if (!nombreExistente) {
    //   await dispatch(postAddCaterory(input));
    //   await dispatch(getCategories());

    // }
  }

  function handleInputNewCategory(e) {
    e.preventDefault();
    // setInput({
    //   ...input,
    //   [e.target.name]: e.target.value,
    // });
    // setErrors(
    //   validateNewCat({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );

    // if (!errors.name) {
    //   setErrorName2(false);
    //   setLeyendaErrorName2("");
    // }

    // if (!errors.description) {
    //   setErrorDescription2(false);
    //   setLeyendaErrorDescription2("");
    // }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      // onChange={(e) => handleInputNewCategory(e)}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        name="name"
        // helperText={leyendaErrorName2}
        // error={errorName2}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        name="description"
        // helperText={leyendaErrorDescription2}
        // error={errorDescription2}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      {/* <TextField
        id="outlined-basic"
        label="Imagen miniatura"
        variant="outlined"
        name="thumbnail"
      /> */}
      <Button type="submit">Crear nueva categoria</Button>
    </Box>
  );
};
