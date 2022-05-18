import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import {
  postProduct,
  getProducts,
  // getAllCategories,
  getCategories,
  postAddCateroryToProduct,
  // postAddSpecificationToProduct,
  // postAddCaterory,
  postAddSubCateroryToProduct,
  postAddQuantity,
  getAllSpecifications,
  postAddSpecificationToProduct,
} from "../../redux/actions";
import InputAdornment from "@mui/material/InputAdornment";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";

import Select from "@mui/material/Select";

import { AddCategory } from "./AddCategory";

import { validate } from "./validacionInputProduct/Validate";

import { AddSubCategoty } from "./AddSubCategoty";
import { AddQuantity } from "./AddQuantity";
import { AddSpecification } from "./AddSpecification/AddSpecification";
import { AddDiscount } from "./AddDiscount";
import { TableSpecification } from "./TablaResumen/TableSpecification";
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
  const allSpecifications = useSelector((state) => state.allSpecifications);
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
  const [errorImage, setErrorImage] = useState(false);
  const [leyendaerrorImage, setLeyendaErrorImage] = useState("");

  //control de error de los input de new Category-----

  // const [errorName2, setErrorName2] = useState(false);
  // const [leyendaErrorName2, setLeyendaErrorName2] = useState("");
  // const [errorDescription2, setErrorDescription2] = useState(false);
  // const [leyendaErrorDescription2, setLeyendaErrorDescription2] = useState("");
  // const [errorThumbnail, setErrorThumbnailn] = useState(false);
  // const [leyendaErrorThumbnail, setLeyendaErrorThumbnail] = useState("");

  const [inputQ, setInputQ] = useState({ quantity: 0 });
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

  // const [newCat, setNewCat] = useState({
  //   name: "",
  //   description: "",
  //   thumbnail: "",
  // });

  const [category, setCategory] = React.useState("");
  const [subCategory, setsubCategory] = React.useState("");
  const [newProdId, setNewProdId] = React.useState(0);
  // const [newProducto ,setNewProducto] = React.useState(0);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getAllSpecifications());
  }, [dispatch]);

  //---------
  async function handleSubmit(e) {
    e.preventDefault();
    const NameRepetido = productosExistentes.find((p) => p.name === input.name);

    //validar nombre existente

    if (NameRepetido) {
      setErrorName(true);
      setLeyendaErrorName(
        "El nombre esta utilizado en otro producto existente"
      );
    }
    //validad error de input
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
    //validar sku repetido
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

    //validar error de imput
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

    // if (
    //   NameRepetido ||
    //   SKURepetido ||
    //   errors?.name ||
    //   errors?.sku ||
    //   errors?.price ||
    //   errors?.brand ||
    //   errors?.description ||
    //   errors?.netWeight ||
    //   errors?.grossWeight ||
    //   errors?.warranty
    // ) {
    //   console.log("hay errores");
    //   e.preventDefault();
    //   alert("hay errores");
    // }

    //validacion de input vacio
    if (!input.name) {
      e.preventDefault();
      setErrorName(true);
      setLeyendaErrorName("El nombre es obligatorio");
    } else if (!input.sku) {
      e.preventDefault();
      setErrorSku(true);
      setLeyendaErrorSku("El sku es obligatorio");
    } else if (!input.brand) {
      e.preventDefault();
      setErrorBrand(true);
      setLeyendaErrorBrand("La marca es obligatoria");
    } else if (!input.price) {
      e.preventDefault();
      setErrorPrice(true);
      setLeyendaErrorPrice("El precio es obligatorio, puede ser 0 ");
    } else if (!input.description) {
      e.preventDefault();
      setErrorDesc(true);
      setLeyendaErrorDesc("La descripción es obligatoria");
    } else if (!input.netWeight) {
      e.preventDefault();
      setErrorNetWei(true);
      setLeyendaErrorNetWei("El peso bruto es obligatorio");
    } else if (!input.grossWeight) {
      e.preventDefault();
      setErrorGrossWei(true);
      setLeyendaErrorGrossWei("El peso bruto es obligatorio");
    } else if (!input.warranty) {
      e.preventDefault();
      setErrorWarr(true);
      setLeyendaErrorWarr("La garantia es obligatoria");
    } else if (!input.image) {
      e.preventDefault();

      setErrorImage(true);
      setLeyendaErrorImage("La imagen es obligatoria");
    } else if (
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
      const newProd = await dispatch(postProduct(input));
      await setNewProdId(newProd.data.id);
      await dispatch(getProducts())
      // await setNewProducto = (newProd.data)
      // await dispatch(postAddQuantity(newProd.data.id, inputQ));
      // await dispatch(postAddCateroryToProduct(newProd.data.id, category));
      // await dispatch(postAddSubCateroryToProduct(newProd.data.id, subCategory));
      // await dispatch(postAddSpecificationToProduct(newProd.data.id,specifications, inputSpec))
      // navigate("/detail/" + newProd.data.id);
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

  //funciones handle del componente de "creacion de nueva categoria" :
  // async function handleNewCategory(e) {

  //   if (errors?.name) {
  //     setErrorName(true);
  //     setLeyendaErrorName(errors?.name);
  //     }

  //   e.preventDefault();
  //   await dispatch(postAddCaterory(newCat));
  //   await dispatch(getCategories());
  // };

  // function handleInputNewCategory(e) {
  //   e.preventDefault();
  //   setNewCat({
  //     ...newCat,
  //     [e.target.name]: e.target.value,
  //   });
  //   setErrors(
  //     validateNewCat({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     })
  //   );

  //   if (!errors.name) {
  //     setErrorName2(false);
  //     setLeyendaErrorName2("");
  //   }

  //   if (!errors.description) {
  //     setErrorDescription2(false);
  //     setLeyendaErrorDescription2("");
  //   }
  // }

  //---------  funciones de agregar cantidad

  function handleInputQue(e) {
    setInputQ({
      ...inputQ,
      [e.target.name]: e.target.value,
    });
  }

  async function handleClickQue(e) {
    e.preventDefault();
    await dispatch(postAddQuantity(newProdId, inputQ));
    await dispatch(getProducts())
  }
  //----- funciones de agregar cat y sub
  const handleChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    console.log("categoria");
  };

  const handleChangeSubCat = (e) => {
    e.preventDefault();
    setsubCategory(e.target.value);
    console.log("sub categoria");
  };

  async function handleClickCatAndSub(e) {
    e.preventDefault();
    console.log("agrehando cat");
    await dispatch(postAddCateroryToProduct(newProdId, category));
    await dispatch(postAddSubCateroryToProduct(newProdId, subCategory));
    await dispatch(getProducts())
  }
  ///------funciones agregar especificacion al producto
  const [specifications, setSpecifications] = useState(``);
  const [inputSpec, setInputSpec] = useState({ "value:": "" });

  function handleChangeSpecification(e) {
    e.preventDefault();
    setSpecifications(e.target.value);
  }
  console.log(inputSpec);
  function handleInputSpec(e) {
    setInputSpec({
      ...inputSpec,
      [e.target.name]: e.target.value,
    });
  }

  async function handleClickNewSpec(e){
    e.preventDefault()
    await dispatch(postAddSpecificationToProduct(newProdId , specifications, inputSpec))
    await dispatch(getProducts())
  }
  //-------
  const categSelect = allCategories.filter((c) => c.id === category);
  // console.log(categSelect[0]?.subCategories[0]);
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
        <hr />
        <h3>Paso 1: </h3>
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
            endAdornment: <InputAdornment position="end">gr</InputAdornment>,
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
            endAdornment: <InputAdornment position="end">gr</InputAdornment>,
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
          helperText={leyendaerrorImage}
          error={errorImage}
        />

        <Button onClick={(e) => handleSubmit(e)}>Crear</Button>

        <h4>(*) elementos obligatorios</h4>
      </Box>
      <hr />
      <h3>Paso 2: Agregar stock</h3>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onChange={(e) => handleInputQue(e)}
      >
        <TextField
          id="outlined-basic"
          label="Stock"
          variant="outlined"
          name="quantity"
          //   helperText={leyendaErrorName}
          //   error={errorName}
        />
        <h3>Stock: {inputQ.quantity} </h3>
        <Button onClick={(e) => handleClickQue(e)}>Agregar sotck</Button>
      </Box>

      <hr />
      <h3>Paso 3: Agregar categoría y sub categorías</h3>
      <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
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

      <InputLabel id="demo-simple-select-standard-label">
        Sub Categoria
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={subCategory}
        onChange={handleChangeSubCat}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categSelect[0]?.subCategories?.map((subc) => {
          return <MenuItem value={subc.id}>{subc.name}</MenuItem>;
        })}
      </Select>
      <Button onClick={(e) => handleClickCatAndSub(e)}>
        Agregar categoria y sub categoría
      </Button>
      <AddCategory
        allCategories={allCategories}
        // handleInputNewCategory={handleInputNewCategory}
        // handleNewCategory={handleNewCategory}
        // errorName2 = {errorName2}
        // leyendaErrorName2 ={leyendaErrorName2}
        // errorDescription2 = {errorDescription2}
        // leyendaErrorDescription2 = {leyendaErrorDescription2}
      />

      <AddSubCategoty allCategories={allCategories} />
      <hr />
      <h3>Paso 4: agregar especificaciones</h3>
      <InputLabel id="demo-simple-select-standard-label">
        Especificación
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={specifications}
        onChange={handleChangeSpecification}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allSpecifications.map((spec) => {
          return <MenuItem value={spec.id}>{spec.name.toLowerCase()}</MenuItem>;
        })}
      </Select>
       
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onChange={(e) => handleInputSpec(e)}
        // onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          id="outlined-basic"
          label="Valor de la especificación"
          variant="outlined"
          name="value"
          // helperText={leyendaErrorName}
          // error={errorName}
        />
      </Box>
      <Button onClick={e=> handleClickNewSpec(e)}>Agregar especificación</Button>
      <AddSpecification newProdId={newProdId} />
      <hr />
      <h3>Paso 5: Agregar descuento</h3>
      <AddDiscount/>
      <TableSpecification
        newProdId={newProdId}
      
        
         />
        
    </>
  );
}
