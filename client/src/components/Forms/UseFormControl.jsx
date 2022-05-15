import React, { useEffect, useState } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';




import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from '@mui/material';
import { postProduct, getProducts } from '../../redux/actions';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return 'Helper text';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}


const validate = (input) => {

  let errors = {};
  if (input.name) {
    if (input.name.trim() === "") {
      errors.name = "Se require un nombre";
    } else if (input.name.length < 1) {
      errors.name = "El nombre debe contener mas de una letra";
    } else if (input.name.length > 11) {
      errors.name = "El nombre no puede tener mas de 11 letras";
    } else if (input.name === 33) {
      errors.name = "El nombre no puede ser repetido";
    }
  };
  if (input.brand) {
    if (input.brand.trim() === "") {
      errors.brand = "Se require la marca";
    } else if (input.brand.length < 1) {
      errors.brand = "La marca debe contener mas de una letra";
    } else if (input.brand.length > 11) {
      errors.brand = "La marca no puede tener mas de 11 letras";
    }
  };
  if (input.price) {
    if (input.price.trim() === "") {
      errors.price = "Se requiere el precio del producto";
    } else if (isNaN(input.price)) {
      errors.price = "El valor debe ser numerico";
    } else if (input.price < 0) {
      errors.price = "El valor no puede ser negativo";
    }
  };
  if (input.sku) {
    if (input.sku.trim() === "") {
      errors.sku = "Se requiere el codigo SKU del producto";
    }
  };
  if (input.desc) {
    if (input.desc.trim() === "") {
      errors.desc = "Se requiere la descripción del producto";
    }else if (input.desc.length > 5) {
      errors.desc = "La descripción no puede contener mas de 500 caracteres";
    }
  }

  return errors
}




export function UseFormControl() {
  const dispatch = useDispatch();
  const productosExistentes = useSelector(state => state.products)


  const [errorName, setErrorName] = useState(false)
  const [leyendaErrorName, setLeyendaErrorName] = useState("")
  const [errorBrand, setErrorBrand] = useState(false)
  const [leyendaErrorBrand, setLeyendaErrorBrand] = useState("")
  const [errorPrice, setErrorPrice] = useState(false)
  const [leyendaErrorPrice, setLeyendaErrorPrice] = useState("")
  const [errorSku, setErrorSku] = useState(false)
  const [leyendaErrorSku, setLeyendaErrorSku] = useState("")
  const [errorDesc, setErrorDesc] = useState(false)
  const [leyendaErrorDesc, setLeyendaErrorDesc] = useState("")

  const [errors, setErrors] = useState({})
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
    thumbnail: ""
  });


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);



  function handleSubmit(e) {
    e.preventDefault();

    const NameRepetido = productosExistentes.find(p => p.name === input.name)

    if (NameRepetido) {

      setErrorName(true)
      setLeyendaErrorName("El nombre esta utilizado en otro producto existente")
    }

    if (errors.name) {
      setErrorName(true)
      setLeyendaErrorName(errors?.name)
      console.log("error de name")

    }
    if (errors.price) {
      setErrorPrice(true)
      setLeyendaErrorPrice(errors.price)
      console.log("error de precio")

    }
    const SKURepetido = productosExistentes.find(p => p.sku === input.sku)

    if (SKURepetido) {
      setErrorSku(true)
      setLeyendaErrorSku("El codigo SKU esta utilizado en otro producto")
    }
    if (errors.sku) {
      setErrorSku(true)
      setLeyendaErrorSku(errors.sku)

      console.log("error de sku")

    }
    if (errors.desc) {
      setErrorDesc(true)
      setLeyendaErrorDesc(errors.desc)

      console.log("error de desc")

    }



    if (errors.brand) {
      setErrorBrand(true)
      setLeyendaErrorBrand(errors.brand)
      console.log("error de marca")

    }

    if (NameRepetido || SKURepetido || errors?.name || errors?.sku || errors?.price || errors?.brand || errors?.desc) {
      console.log("hay errores")
      alert("hay errores")
      return
    } else {
      console.log("se ha creado")
      
      dispatch(postProduct(input))
    }


  }


  function handleInput(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    })
    );

    if (!errors.price) {
      setErrorPrice(false)
      setLeyendaErrorPrice("")
    }
    if (!errors.name) {
      setErrorName(false)
      setLeyendaErrorName("")
    }
    if (!errors.sku) {
      setErrorSku(false)
      setLeyendaErrorSku("")
    };





  }


  return (
    <Box component="form" noValidate autoComplete="off" onChange={e => handleInput(e)} onSubmit={(e) => handleSubmit(e)}>
      <h2>Creando algo</h2>

      <TextField

        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        name='name'
        helperText={leyendaErrorName}
        error={errorName}
      />
      <TextField

        id="outlined-basic"
        label="Marca"
        variant="outlined"
        name='brand'
        helperText={leyendaErrorBrand}
        error={errorBrand}
      />
      <TextField

        id="outlined-basic"
        label="Precio"
        variant="outlined"
        name='price'
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        helperText={leyendaErrorPrice}
        error={errorPrice}


      />
      <TextField

        id="outlined-basic"
        label="Codigo"
        variant="outlined"
        name='sku'
        helperText={leyendaErrorSku}
        error={errorSku}
      />

      <TextField

        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        name='description'
        helperText={leyendaErrorDesc}
        error={errorDesc}
      />
      <TextField

        id="outlined-basic"
        label="Peso neto"
        variant="outlined"
        name='netWeight'
        
      />
      <TextField

        id="outlined-basic"
        label="Garatia"
        variant="outlined"
        name='warranty'
      />

      <TextField

        id="outlined-basic"
        label="keyWords"
        variant="outlined"
        name='keyWords'
      />
      <TextField

        id="outlined-basic"
        label="Dimensiones del producto"
        variant="outlined"
        name='productDimensions'
      />
      <TextField

        id="outlined-basic"
        label="Dimensiones del package"
        variant="outlined"
        name='packageDimensions'
      />
      <TextField

        id="outlined-basic"
        label="Peso bruto"
        variant="outlined"
        name='grossWeight'
      />
      <TextField

        id="outlined-basic"
        label="IMagen de miniatura"
        variant="outlined"
        name='thumbnail'
      />
      <Button onClick={(e) => handleSubmit(e)}>Crear</Button>
      <Alert severity="success">
        <AlertTitle>Felicidades</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
    </Box>
  );
}
