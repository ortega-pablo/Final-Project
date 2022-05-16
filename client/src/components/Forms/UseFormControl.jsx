import React, { useEffect, useState } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import {
  postProduct,
  getProducts,
  getAllCategories,
  getCategories,
  postAddCateroryToProduct,
  postAddSpecificationToProduct,
  postAddCaterory,
} from "../../redux/actions";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import Category from "../Category/Category";
import { AddCategory } from "./AddCategory";

import { validate } from "./validacionInput/Validate";
// function MyFormHelperText() {
//   const { focused } = useFormControl() || {};

//   const helperText = React.useMemo(() => {
//     if (focused) {
//       return 'This field is being focused';
//     }

//     return 'Helper text';
//   }, [focused]);

//   return <FormHelperText>{helperText}</FormHelperText>;
// }

export function UseFormControl() {
  const dispatch = useDispatch();
  const productosExistentes = useSelector((state) => state.products);
  const allCategories = useSelector((state) => state.categories);
  let navigate = useNavigate();

  const [errorName, setErrorName] = useState(false);
  const [leyendaErrorName, setLeyendaErrorName] = useState("");
  const [errorBrand, setErrorBrand] = useState(false);
  const [leyendaErrorBrand, setLeyendaErrorBrand] = useState("");
  const [errorPrice, setErrorPrice] = useState(false);
  const [leyendaErrorPrice, setLeyendaErrorPrice] = useState("");
  const [errorSku, setErrorSku] = useState(false);
  const [leyendaErrorSku, setLeyendaErrorSku] = useState("");
  const [errorDesc, setErrorDesc] = useState(false);
  const [leyendaErrorDesc, setLeyendaErrorDesc] = useState("");
  const [errorNetWei, setErrorNetWei] = useState(false);
  const [leyendaErrorNetWei, setLeyendaErrorNetWei] = useState("");
  const [errorGrossWei, setErrorGrossWei] = useState(false);
  const [leyendaerrorGrossWei, setLeyendaErrorGrossWei] = useState("");
  const [errorWarr, setErrorWarr] = useState(false);
  const [leyendaerrorWarr, setLeyendaErrorWarr] = useState("");
  //const [ render, setRender ]= useState("")
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    sku: "",
    brand: "",
    keyWords: "",
    price: "",
    description: "",
    warranty: "",
    productDimensions: "",
    packageDimensions: "",
    netWeight: "",
    grossWeight: "",
    thumbnail: "",
  });

  const [newCat, setNewCat] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });

  const [categoty, setCategoty] = React.useState("");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setCategoty(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const NameRepetido = productosExistentes.find((p) => p.name === input.name);

    if (NameRepetido) {
      setErrorName(true);
      setLeyendaErrorName(
        "El nombre esta utilizado en otro producto existente"
      );
    }

    if (errors.name) {
      setErrorName(true);
      setLeyendaErrorName(errors?.name);
      console.log("error de name");
    }
    if (errors.price) {
      setErrorPrice(true);
      setLeyendaErrorPrice(errors.price);
      console.log("error de precio");
    }
    const SKURepetido = productosExistentes.find((p) => p.sku === input.sku);

    if (SKURepetido) {
      setErrorSku(true);
      setLeyendaErrorSku("El codigo SKU esta utilizado en otro producto");
    }
    if (errors.sku) {
      setErrorSku(true);
      setLeyendaErrorSku(errors.sku);

      console.log("error de sku");
    }
    if (errors.description) {
      setErrorDesc(true);
      setLeyendaErrorDesc(errors.description);

      console.log("error de desc");
    }
    if (errors.brand) {
      setErrorBrand(true);
      setLeyendaErrorBrand(errors.brand);
      console.log("error de marca");
    }
    if (errors.netWeight) {
      setErrorNetWei(true);
      setLeyendaErrorNetWei(errors.netWeight);
      console.log("error de peso neto");
    }
    if (errors.grossWeight) {
      setErrorGrossWei(true);
      setLeyendaErrorGrossWei(errors.grossWeight);
      console.log("error de peso bruto");
    }
    if (errors.warranty) {
      setErrorWarr(true);
      setLeyendaErrorWarr(errors.warranty);
      console.log("error de garantia");
    }

    if (
      NameRepetido ||
      SKURepetido ||
      errors?.name ||
      errors?.sku ||
      errors?.price ||
      errors?.brand ||
      errors?.description ||
      errors?.netWeight ||
      errors?.grossWeight ||
      errors?.warranty
    ) {
      console.log("hay errores");
      e.preventDefault();
      alert("hay errores");
    }

    if (!input.sku) {
      e.preventDefault();
      setErrorSku(true);
      setLeyendaErrorSku("El sku es obligatorio");
    }
    if (!input.name) {
      e.preventDefault();
      setErrorName(true);
      setLeyendaErrorName("El nombre es obligatorio");
    }
    if (!input.brand) {
      e.preventDefault();
      setErrorBrand(true);
      setLeyendaErrorBrand("La marca es obligatoria");
    }
    if (!input.price) {
      e.preventDefault();
      setErrorPrice(true);
      setLeyendaErrorPrice("El precio es obligatorio, puede ser 0 ");
    }
    if (!input.description) {
      e.preventDefault();
      setErrorDesc(true);
      setLeyendaErrorDesc("La descripción es obligatoria");
    }
    if (!input.netWeight) {
      e.preventDefault();
      setErrorNetWei(true);
      setLeyendaErrorNetWei("El peso bruto es obligatorio");
    }
    if (!input.grossWeight) {
      e.preventDefault();
      setErrorGrossWei(true);
      setLeyendaErrorGrossWei("El peso bruto es obligatorio");
    }
    if (!input.warranty) {
      e.preventDefault();
      setErrorWarr(true);
      setLeyendaErrorWarr("La garantia es obligatoria");
    }
    if (
      !(
        NameRepetido ||
        SKURepetido ||
        errors?.name ||
        errors?.sku ||
        errors?.price ||
        errors?.brand ||
        errors?.description ||
        errors?.netWeight ||
        errors?.grossWeight ||
        errors?.warranty
      )
    ) {
      console.log("se ha creado");

      const newProd = await dispatch(postProduct(input));

      await dispatch(postAddCateroryToProduct(newProd.data.id, categoty));

      navigate("/detail/" + newProd.data.id);
    }
  }

  function handleInput(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    if (!errors.price) {
      setErrorPrice(false);
      setLeyendaErrorPrice("");
    }
    if (!errors.name) {
      setErrorName(false);
      setLeyendaErrorName("");
    }
    if (!errors.sku) {
      setErrorSku(false);
      setLeyendaErrorSku("");
    }
    if (!errors.description) {
      setErrorDesc(false);
      setLeyendaErrorDesc("");
    }
    if (!errors.netWeight) {
      setErrorNetWei(false);
      setLeyendaErrorNetWei("");
    }
    if (!errors.grosstWeight) {
      setErrorGrossWei(false);
      setLeyendaErrorGrossWei("");
    }
    if (!errors.brand) {
      setErrorBrand(false);
      setLeyendaErrorBrand("");
    }

    if (!errors.warranty) {
      setErrorWarr(false);
      setLeyendaErrorWarr("");
    }
  }

  async function handleNewCategory(e) {
    e.preventDefault();
    console.log(e);

    console.log(newCat);
    await dispatch(postAddCaterory(newCat));
    await dispatch(getCategories());
  }

  function handleInputNewCategory(e) {
    e.preventDefault();
    setNewCat({
      ...newCat,
      [e.target.name]: e.target.value,
    });
   
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onChange={(e) => handleInput(e)}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2>Creando algo</h2>

        <TextField
          id="outlined-basic"
          label="Nombre *"
          variant="outlined"
          name="name"
          helperText={leyendaErrorName}
          error={errorName}
        />
        <TextField
          id="outlined-basic"
          label="Marca *"
          variant="outlined"
          name="brand"
          helperText={leyendaErrorBrand}
          error={errorBrand}
        />
        <TextField
          id="outlined-basic"
          label="Precio *"
          variant="outlined"
          name="price"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          helperText={leyendaErrorPrice}
          error={errorPrice}
        />
        <TextField
          id="outlined-basic"
          label="Codigo *"
          variant="outlined"
          name="sku"
          helperText={leyendaErrorSku}
          error={errorSku}
        />

        <TextField
          id="outlined-basic"
          label="Descripcion *"
          variant="outlined"
          name="description"
          helperText={leyendaErrorDesc}
          error={errorDesc}
        />
        <TextField
          id="outlined-basic"
          label="Peso neto *"
          variant="outlined"
          name="netWeight"
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
          helperText={leyendaErrorNetWei}
          error={errorNetWei}
        />
        <TextField
          id="outlined-basic"
          label="Peso bruto *"
          variant="outlined"
          name="grossWeight"
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
          helperText={leyendaerrorGrossWei}
          error={errorGrossWei}
        />
        <TextField
          id="outlined-basic"
          label="Garatía *"
          variant="outlined"
          name="warranty"
          helperText={leyendaerrorWarr}
          error={errorWarr}
        />

        <TextField
          id="outlined-basic"
          label="keyWords"
          variant="outlined"
          name="keyWords"
        />
        <TextField
          id="outlined-basic"
          label="Dimensiones del producto *"
          variant="outlined"
          name="productDimensions"
        />
        <TextField
          id="outlined-basic"
          label="Dimensiones del package *"
          variant="outlined"
          name="packageDimensions"
        />

        <TextField
          id="outlined-basic"
          label="Imagen de miniatura"
          variant="outlined"
          name="thumbnail"
        />
        <TextField
          id="outlined-basic"
          label="Imagenes"
          variant="outlined"
          name="image"
        />

        <Button onClick={(e) => handleSubmit(e)}>Crear</Button>

        <h4>(*) elementos obligatorios</h4>
        {/* <Alert severity="success">
        <AlertTitle>Felicidades</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert> */}
      </Box>
      <br />
      <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={categoty}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allCategories?.map((cat) => {
          return (
            <MenuItem value={cat.id}>
              {cat.name} {cat.id}
            </MenuItem>
          );
        })}
      </Select>

      <AddCategory
        handleInputNewCategory={handleInputNewCategory}
        handleNewCategory={handleNewCategory}
      />
    </>
  );
}
