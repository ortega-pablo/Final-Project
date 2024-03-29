import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AddSubCategoty } from "../AddSubCategoty";
import { AddSpecification } from "../AddSpecification/AddSpecification";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddSpecificationToProduct } from "../AddSpecificationToProduct";
import { getAllSpecifications, getCategories, getProducts, postAddCateroryToProduct, postAddSubCateroryToProduct, putProduct } from "../../../redux/actions";
import { TableSpecification } from "../TablaResumen/TableSpecification";
import { postAddSpecificationToProduct, postProduct } from "../../../redux/actions";
import { UpdateQuantity } from "./UpdateQuantity";
import { AddCategory } from "../AddCategory";
import { UpdateCategoryAndSubca } from "./UpdateCategoryAndSubca";
import { AddDiscountToProduct } from "../AddDiscountToProduct";
import { UpdateSpecification } from "./UpdateSpecification";
import { TableSpecific } from "./TableSpecific";
import { AddministrrImage } from "./AddministrrImage";
import PropTypes from "prop-types";
import { TypographyMenu } from "../../../personalizadTheme";


////////////////////////////////////
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/////////////////////////////////////////////

export function  UpdateProduct({idUpdate, setUpdating, productToUpdate}) {

  const dispatch = useDispatch();
  const productosExistentes = useSelector((state) => state.products);
  const allCategories = useSelector((state) => state.categories);
  const allSpecifications = useSelector((state) => state.allSpecifications);
  // const productToUpdate = productosExistentes.find( p => p.id === Number(idUpdate) )
  const [inputQ, setInputQ] = useState({ quantity: 0 });

console.log(productToUpdate)
  
  // const [subCategory, setsubCategory] = React.useState("");
  const [newProdId, setNewProdId] = React.useState(0);
  
 
 
 useEffect(() => {
   dispatch(getProducts());
   dispatch(getCategories());
   dispatch(getAllSpecifications());
  }, [dispatch]);
  
  
  const nameRepetido = productosExistentes.filter( p => p.id !=idUpdate )
  const NameRepetido = nameRepetido.map((p) => p.name);
  
  const SkuRepetido = nameRepetido.map((p) => p.sku);
  

  const validationSchema = yup.object({
    
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .max(60, "El maximo de caracteres es 60")
      .notOneOf(productosExistentes.filter( p => p.id !=idUpdate ), "Ya existe un producto con éste nombre" )
      .required("El nombre es requerido"),
    
      sku: yup
      .string("Ingrese la descripción")
      .max(20,"el codifo no puede tener mas de 20 caracteres")
    .notOneOf(nameRepetido.map(sku=>sku), "Ya existe un producto con éste codigo sku" )
      .required("La descripción es requerida"),
      brand: yup
      .string("Ingrese la descripción")
      .max(40, "El maximo de caracteres es 40")

      .required("La descripción es requerida"),
    price: yup
      .number("El precio es numerico.")
      .max(1000000, "El precio maximo es de $1000000")

      .typeError("El precio deber ser numerico")
      .positive("El precio debe ser positivo")
      // .string()
      .required("La descripción es requerida"),
    description: yup
      .string("Ingrese la descripción")
      .max(1000, "El maximo de caracteres es 1000")

      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    warranty: yup
      .string("Ingrese la descripción")
      .max(200, "El maximo de caracteres es 200")

      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    netWeight: yup
      .number("El peso neto debe ser numerico")
      .typeError("El peso neto deber ser numerico")
      .max(200000, "El peso maximo es de 200000 gr")

      .positive("El peso neto debe ser positivo")
      //  .string()
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),

    grossWeight: yup
      .number("El peso bruto es numerico")
      .typeError("El peso bruto deber ser numerico")
      .max(200000, "El peso maximo es de 200000 gr")

      .positive("El peso bruto debe ser positivo")
      // .string()
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    // image: yup
    //   .string("Ingrese la descripción")
    //   // .min(8, 'Password should be of minimum 8 characters length')
    //   .required("La descripción es requerida"),
    keyWords: yup
    .string("Ingrese la descripción.")
    .max(200, "El maximo de caracteres es 200"),
    
    productDimensions: yup
    .string("Ingrese la descripcións")
    .max(200, "El maximo de caracteres es 200")
    .required("La dimensión es requerida"),
    packageDimensions : yup
    .string("Ingrese la descripciónd")
    .max(200, "El maximo de caracteres es 200")

    .required("La dimensión es requerida"),
    thumbnail :yup
    .string("Ingrese la descripciónf")
    .max(200, "El maximo de caracteres es 200") ,



  });
  

  const formik = useFormik({
    initialValues: {
    id: idUpdate,
    name: productToUpdate?.name,
    sku: productToUpdate?.sku,
    brand: productToUpdate?.brand,
    keyWords: productToUpdate?.keyWords,
    price: productToUpdate?.price,
    description: productToUpdate?.description,
    warranty: productToUpdate?.warranty,
    productDimensions: productToUpdate?.productDimensions,
    packageDimensions: productToUpdate?.packageDimensions,
    netWeight:productToUpdate?.netWeight,
    grossWeight:productToUpdate?.grossWeight,
    thumbnail: productToUpdate?.thumbnail,
      },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(putProduct(idUpdate,values))
      await dispatch(getProducts())
   

    },
  });


  //----- funciones de agregar cat y sub
  
  ///------funciones agregar especificacion al producto
  const [specifications, setSpecifications] = useState(``);

  function handleChangeSpecification(e) {
    e.preventDefault();
    setSpecifications(e.target.value);
  }

  //-------
  // const categSelect = allCategories.filter((c) => c.id === category);
  
    ////////////////////

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    ////////////////////

  return (
    <>
        <Paper sx={{ width: "100%" }}>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"    
          >
            <Tab label="Producto" {...a11yProps(0)} />
            <Tab label="Descuentos" {...a11yProps(1)} />
            <Tab label="Stock" {...a11yProps(2)} />
            <Tab label="Categorías" {...a11yProps(3)} />
            <Tab label="Especificaciones" {...a11yProps(4)} />
            <Tab label="Imagen" {...a11yProps(5)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
        <Typography color="darkGrey.main" variant="h4">Editar Producto</Typography>
        <hr />
        <Typography color="darkGrey.main" variant="h6" sx={{m:2}}>Paso 1:</Typography>
      <Box
        sx={{display:"grid" , gridTemplateColumns:"1fr 1fr", gap:"10px" }}
        component="form"
        noValidate
        autoComplete="off"
        // onChange={(e) => handleInput(e)}
      //  onSubmit={(e) => handleSubmit(e)}
      onSubmit={formik.handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Nombre *"
          variant="outlined"
          name="name"
          // helperText={leyendaErrorName}
          // error={errorName}
          value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="outlined-basic"
          label="Marca *"
          variant="outlined"
          name="brand"
          // helperText={leyendaErrorBrand}
          // error={errorBrand}
          value={formik.values.brand}
        onChange={formik.handleChange}
        error={formik.touched.brand && Boolean(formik.errors.brand)}
        helperText={formik.touched.brand && formik.errors.brand}
        />
        <TextField
          id="outlined-basic"
          label="Precio *"
          variant="outlined"
          name="price"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          // helperText={leyendaErrorPrice}
          // error={errorPrice}
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          id="outlined-basic"
          label="Codigo *"
          variant="outlined"
          name="sku"
          // helperText={leyendaErrorSku}
          value={formik.values.sku}
          onChange={formik.handleChange}
          error={formik.touched.sku && Boolean(formik.errors.sku)}
          helperText={formik.touched.sku && formik.errors.sku}
          // error={errorSku}
        />

        <TextField
          id="outlined-basic"
          label="Descripcion *"
          variant="outlined"
          name="description"
          // helperText={leyendaErrorDesc}
          // error={errorDesc}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          id="outlined-basic"
          label="Peso neto *"
          variant="outlined"
          name="netWeight"
          InputProps={{
            endAdornment: <InputAdornment position="end">gr</InputAdornment>,
          }}
          // helperText={leyendaErrorNetWei}
          // error={errorNetWei}
          value={formik.values.netWeight}
          onChange={formik.handleChange}
          error={formik.touched.netWeight && Boolean(formik.errors.netWeight)}
          helperText={formik.touched.netWeight && formik.errors.netWeight}
        />
        <TextField
          id="outlined-basic"
          label="Peso bruto *"
          variant="outlined"
          name="grossWeight"
          InputProps={{
            endAdornment: <InputAdornment position="end">gr</InputAdornment>,
          }}
          // helperText={leyendaerrorGrossWei}
          // error={errorGrossWei}
          value={formik.values.grossWeight}
          onChange={formik.handleChange}
          error={formik.touched.grossWeight && Boolean(formik.errors.grossWeight)}
          helperText={formik.touched.grossWeight && formik.errors.grossWeight}
        />
        <TextField
          id="outlined-basic"
          label="Garatía *"
          variant="outlined"
          name="warranty"
          // helperText={leyendaerrorWarr}
          // error={errorWarr}
          value={formik.values.warranty}
          onChange={formik.handleChange}
          error={formik.touched.warranty && Boolean(formik.errors.warranty)}
          helperText={formik.touched.warranty && formik.errors.warranty}
        />

        <TextField
          id="outlined-basic"
          label="keyWords"
          variant="outlined"
          name="keyWords"
          value={formik.values.keyWords}
          onChange={formik.handleChange}
          error={formik.touched.keyWords && Boolean(formik.errors.keyWords)}
          helperText={formik.touched.keyWords && formik.errors.keyWords}
       
        />
        <TextField
          id="outlined-basic"
          label="Dimensiones del producto *"
          variant="outlined"
          name="productDimensions"
          value={formik.values.productDimensions}
          onChange={formik.handleChange}
          error={formik.touched.productDimensions && Boolean(formik.errors.productDimensions)}
          helperText={formik.touched.productDimensions && formik.errors.productDimensions}
        />
        <TextField
          id="outlined-basic"
          label="Dimensiones del package *"
          variant="outlined"
          name="packageDimensions"
          value={formik.values.packageDimensions}
          onChange={formik.handleChange}
          error={formik.touched.packageDimensions && Boolean(formik.errors.packageDimensions)}
          helperText={formik.touched.packageDimensions && formik.errors.packageDimensions}
        />

        <TextField
          id="outlined-basic"
          label="Imagen de miniatura"
          variant="outlined"
          name="thumbnail"
          value={formik.values.thumbnail}
          onChange={formik.handleChange}
          error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
          helperText={formik.touched.thumbnail && formik.errors.thumbnail}
        />

        <Button type="submit" variant="contained" color="darkGrey" size="small"> 
        <TypographyMenu>Editar</TypographyMenu> </Button>
        <Typography color="darkGrey.main">elementos obligatorios (*)</Typography> 
      </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>

     <AddDiscountToProduct
     newProdId={idUpdate}
     newProduct={productToUpdate}/>
     
     <hr />
        </TabPanel>

        <TabPanel value={value} index={2}>
          
      <UpdateQuantity
       productToUpdate={productToUpdate}
         idUpdate={idUpdate}/> 

      <hr />
        </TabPanel>

        <TabPanel value={value} index={3}>

      <UpdateCategoryAndSubca
       productToUpdate={productToUpdate}
       idUpdate={idUpdate}/>

      <AddSubCategoty allCategories={allCategories} />

    
        </TabPanel>

        <TabPanel value={value} index={4}>
        <TableSpecific
        productToUpdate={productToUpdate}
        idUpdate={idUpdate}/>
       

     <Box sx={{}}>

     

      <InputLabel id="demo-simple-select-standard-label">
       <Typography color="darkGrey">Especificación</Typography> 
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={specifications}
        onChange={handleChangeSpecification}
        label="Age"
        sx={{ml:0 , mt:2, mb:2}}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allSpecifications.map((spec) => {
          return <MenuItem value={spec.id}>{spec.name.toLowerCase()}</MenuItem>;
        })}
      </Select>
       
       <AddSpecificationToProduct
       newProdId={idUpdate}
       specifications={specifications}
       />
     </Box>

      <AddSpecification/>
           
      <hr />
        </TabPanel>

        <TabPanel value={value} index={5}>
      <AddministrrImage
       newProdId={idUpdate}
       newProduct={productToUpdate}/>
        </TabPanel>
        
      </Paper>
<Button type="button" onClick={(e)=> setUpdating(false)} variant="contained" color="darkGrey"sx={{m:2}}>
 <TypographyMenu>Finalizar edición</TypographyMenu> </Button>
    

      <hr />

    </>
  );
}
