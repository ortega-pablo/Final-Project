import React, { useEffect, useState } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';




import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from '@mui/material';
import { postProduct, getProducts, getAllCategories , postAddCateroryToProduct, postAddSpecificationToProduct } from '../../redux/actions';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

import Select from '@mui/material/Select';
import { AddCategoryToProduct } from './AddCategoryToProduct';


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
      errors.price = "El valor debe ser numerico"; // ojo, , debemos aceptar puntos
    } else if (input.price < 0) {
      errors.price = "El valor no puede ser negativo";
    }
  };
  if (input.sku) {
    if (input.sku.trim() === "") {
      errors.sku = "Se requiere el codigo SKU del producto";
    }
  };
  if (input.description) {
    if (input.description.trim() === "") {
      errors.description = "Se requiere la descripción del producto";
    } else if (input.description.length > 10) {
      errors.description = "La descripción no puede contener mas de 500 caracteres";
    }
  };
  if (input.netWeight) {
    if (input.netWeight.trim() === "") {
      errors.netWeight = "Se requiere el peso neto del producto";
    } else if (isNaN(input.netWeight)) {
      errors.netWeight = "El valor debe ser numerico"; // ojo, , debemos aceptar puntos
    } else if (input.netWeight < 0) {
      errors.netWeight = "El valor no puede ser negativo";
    }
  };
  if (input.grossWeight) {
    if (input.grossWeight.trim() === "") {
      errors.grossWeight = "Se requiere el peso bruto del producto";
    } else if (isNaN(input.grossWeight)) {
      errors.grossWeight = "El valor debe ser numerico"; // ojo, , debemos aceptar puntos
    } else if (input.grossWeight < 0) {
      errors.grossWeight = "El valor no puede ser negativo";
    }
  };
  if (input.warranty) {
    if (input.warranty.trim() === "") {
      errors.warranty = "Se requiere la garantia del producto";
    } else if (input.warranty.length > 8) {
      errors.warranty = "La descripción de la garantia no puede contener mas de 500 caracteres";
    }
  }
  console.log(errors)

  return errors
}




export function UseFormControl() {
  const dispatch = useDispatch();
  const productosExistentes = useSelector(state => state.products)
  const allCategories = useSelector (state => state.allCategories)

  
console.log(allCategories)
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

  const [errorNetWei, setErrorNetWei] = useState(false)
  const [leyendaErrorNetWei, setLeyendaErrorNetWei] = useState("")

  const [errorGrossWei, setErrorGrossWei] = useState(false)
  const [leyendaerrorGrossWei, setLeyendaErrorGrossWei] = useState("")

  const [errorWarr, setErrorWarr] = useState(false)
  const [leyendaerrorWarr, setLeyendaErrorWarr] = useState("")

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

  const [age, setAge] = React.useState('');
let ultimoElemento = productosExistentes[productosExistentes.length-1]
console.log(ultimoElemento?.id)
console.log(age)
  const handleChange = (event) => {
    event.preventDefault()
    setAge(event.target.value);
   
    
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  let navigate = useNavigate();

  function  handleSubmit  (e) {
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
    if (errors.description) {
      setErrorDesc(true)
      setLeyendaErrorDesc(errors.description)

      console.log("error de desc")

    }
    if (errors.brand) {
      setErrorBrand(true)
      setLeyendaErrorBrand(errors.brand)
      console.log("error de marca")

    }
    if (errors.netWeight) {
      setErrorNetWei(true)
      setLeyendaErrorNetWei(errors.netWeight)
      console.log("error de peso neto")

    }
    if (errors.grossWeight) {
      setErrorGrossWei(true)
      setLeyendaErrorGrossWei(errors.grossWeight)
      console.log("error de peso bruto")

    }
    if (errors.warranty) {
      setErrorWarr(true)
      setLeyendaErrorWarr(errors.warranty)
      console.log("error de garantia")

    }

    if (NameRepetido || SKURepetido || errors?.name || errors?.sku || errors?.price || errors?.brand || errors?.description || errors?.netWeight || errors?.grossWeight || errors?.warranty) {
      console.log("hay errores")
      alert("hay errores")

    }
    if (!input.sku) {
      setErrorSku(true)
      setLeyendaErrorSku("El sku es obligatorio")
    }
    if (!input.name) {
      setErrorName(true)
      setLeyendaErrorName("El nombre es obligatorio")
    }
    if (!input.brand) {
      setErrorBrand(true)
      setLeyendaErrorBrand("La marca es obligatoria")
    }
    if (!input.price) {
      setErrorPrice(true)
      setLeyendaErrorPrice("El precio es obligatorio, puede ser 0 ")
    }
    if (!input.description) {
      setErrorDesc(true)
      setLeyendaErrorDesc("La descripción es obligatoria")
    }
    if (!input.netWeight) {
      setErrorNetWei(true)
      setLeyendaErrorNetWei("El peso bruto es obligatorio")
    }
    if (!input.grossWeight) {
      setErrorGrossWei(true)
      setLeyendaErrorGrossWei("El peso bruto es obligatorio")
    }
    if (!input.warranty) {
      setErrorWarr(true)
      setLeyendaErrorWarr("La garantia es obligatoria")
    }
    else {
      console.log("se ha creado")
     
      dispatch(postProduct(input))
      console.log(age)
      dispatch(postAddCateroryToProduct( ultimoElemento.id+1 ,age))
      navigate("/detail/" + (ultimoElemento?.id+1))
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
    if (!errors.description) {
      setErrorDesc(false)
      setLeyendaErrorDesc("")
    };
    if (!errors.netWeight) {
      setErrorNetWei(false)
      setLeyendaErrorNetWei("")
    };
    if (!errors.grosstWeight) {
      setErrorGrossWei(false)
      setLeyendaErrorGrossWei("")
    };
    if (!errors.brand) {
      setErrorBrand(false)
      setLeyendaErrorBrand("")
    };

    if (!errors.warranty) {
      setErrorWarr(false)
      setLeyendaErrorWarr("")
    };



  }


  return (
    <>
    
    <Box component="form" noValidate autoComplete="off" onChange={e => handleInput(e)} onSubmit={(e) => handleSubmit(e)}>
      <h2>Creando algo</h2>

      <TextField

        id="outlined-basic"
        label="Nombre *"
        variant="outlined"
        name='name'
        helperText={leyendaErrorName}
        error={errorName}
      />
      <TextField

        id="outlined-basic"
        label="Marca *"
        variant="outlined"
        name='brand'
        helperText={leyendaErrorBrand}
        error={errorBrand}
      />
      <TextField

        id="outlined-basic"
        label="Precio *"
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
        label="Codigo *"
        variant="outlined"
        name='sku'
        helperText={leyendaErrorSku}
        error={errorSku}
      />

      <TextField

        id="outlined-basic"
        label="Descripcion *"
        variant="outlined"
        name='description'
        helperText={leyendaErrorDesc}
        error={errorDesc}
      />
      <TextField

        id="outlined-basic"
        label="Peso neto *"
        variant="outlined"
        name='netWeight'
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
        name='grossWeight'
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
        name='warranty'
        helperText={leyendaerrorWarr}
        error={errorWarr}
      />

      <TextField

        id="outlined-basic"
        label="keyWords"
        variant="outlined"
        name='keyWords'
      />
      <TextField

        id="outlined-basic"
        label="Dimensiones del producto *"
        variant="outlined"
        name='productDimensions'
      />
      <TextField

        id="outlined-basic"
        label="Dimensiones del package *"
        variant="outlined"
        name='packageDimensions'
      />

      <TextField

        id="outlined-basic"
        label="Imagen de miniatura"
        variant="outlined"
        name='thumbnail'
      />
      <TextField

        id="outlined-basic"
        label="Imagenes"
        variant="outlined"
        name='image'
      />
    
      <Button onClick={(e) => handleSubmit(e)}>Siguiente</Button>
   
      <h4>(*) elementos obligatorios</h4>
      {/* <Alert severity="success">
        <AlertTitle>Felicidades</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert> */}
    </Box>
<br/>
<InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
         <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            allCategories?.map(cat => {
                  return (
                    <MenuItem value={cat.id}>{cat.name} {cat.id}</MenuItem>
                   
                  )

            }) 
          }
          
          {/* {
            age?.map(cat=>(
             <h3>{cat.name} {cat.id}</h3>
            ))
          }
           */}
           <h2>{age.name}</h2>
          
        </Select>
    </>
  );
}
