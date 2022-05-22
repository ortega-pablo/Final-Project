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

import { AddSubCategoty } from "./AddSubCategoty";
import { AddQuantity } from "./AddQuantity";
import { AddSpecification } from "./AddSpecification/AddSpecification";
// import { AddDiscount } from "./AddDiscount";
import { TableSpecification } from "./TablaResumen/TableSpecification";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddSpecificationToProduct } from "./AddSpecificationToProduct";
import { DeleteProduct } from "./AdminProduct/AdminProduct";
import { TableCatAndSubcOfProduct } from "./TableCatAndSubcOfProduct";
import { AdminCatAndSubc } from "./AdminCatAndSubca/AdminCatAndSubc";
import { AddDiscountToProduct } from "./AddDiscountToProduct";
import { CreateDiscout } from "./adminDiscounts/CreateDiscout";
import { AdminDiscount } from "./adminDiscounts/AdminDiscount";
import { TableSpecificationNewProduct } from "./TableSpecificationNewProduct";
import { TableSpecific } from "./AdminProduct/TableSpecific";
import { AdminSpecif } from "./AdminSpecificacat/AdminSpecif";
import { AddImageToProduct } from "./AddImageToProduct";
import { AdmininAllStock } from "./AdminProduct/AdmininAllStock";

export function UseFormControl() {
  const dispatch = useDispatch();
  const productosExistentes = useSelector((state) => state.products);
  const allCategories = useSelector((state) => state.categories);
  const allSpecifications = useSelector((state) => state.allSpecifications);

  const [inputQ, setInputQ] = useState({ quantity: 0 });

  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [newProdId, setNewProdId] = React.useState(0);

  const newProduct = productosExistentes.find((p) => p.id === newProdId);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getAllSpecifications());
  }, [dispatch]);

  const NameRepetido = productosExistentes.map((p) => p.name);
  const skuRepetido = productosExistentes.map((p) => p.sku);

  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")

      .notOneOf(
        NameRepetido.map((name) => name),
        "Ya existe un producto con éste nombre"
      )
      .required("El nombre es requerido"),

    sku: yup
      .string("Ingrese la descripción")
      .notOneOf(
        skuRepetido.map((sku) => sku),
        "Ya existe un producto con éste codigo sku"
      )
      .required("La descripción es requerida"),
    brand: yup
      .string("Ingrese la descripción")
      .required("La descripción es requerida"),
    price: yup
      .number("El precio es numerico.")
      .typeError("El precio deber ser numerico")
      .positive("El precio debe ser positivo")
      // .string()
      .required("La descripción es requerida"),
    description: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    warranty: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    netWeight: yup
      .number("El peso neto debe ser numerico")
      .typeError("El peso neto deber ser numerico")
      .positive("El peso neto debe ser positivo")
      //  .string()
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),

    grossWeight: yup
      .number("El peso bruto es numerico")
      .typeError("El peso bruto deber ser numerico")
      .positive("El peso bruto debe ser positivo")
      // .string()
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    // image: yup
    //   .string("Ingrese la descripción")
    //   // .min(8, 'Password should be of minimum 8 characters length')
    //   .required("La descripción es requerida"),
    keyWords: yup
    .string("Ingrese la descripción."),
    
    productDimensions: yup
    .string("Ingrese la descripcións")
    .required("La dimensión es requerida"),
    packageDimensions : yup
    .string("Ingrese la descripciónd")
    .required("La dimensión es requerida"),
    thumbnail :yup
    .string("Ingrese la descripciónf"),



  });

  const formik = useFormik({
    initialValues: {
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
      // image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const newProd = await dispatch(postProduct(values));
      await setNewProdId(newProd.data.id);
      await dispatch(getProducts());
    resetForm({ values: "" });
    },
  });

  const handleChangeSubCat = (e) => {
    e.preventDefault();
    setSubCategory(e.target.value);
  };

  const handleClickAddCat = async (e) => {
    e.preventDefault();
    await dispatch(postAddCateroryToProduct(newProdId, category));
    await dispatch(getProducts());
  };

  async function handleAddCategoryToProduct(e) {
    e.preventDefault();
    setCategory(e.target.value);
  }

  async function handleClickAddSubCat(e) {
    e.preventDefault();
    if (category && subCategory) {
      await dispatch(postAddCateroryToProduct(newProdId, category));
      await dispatch(postAddSubCateroryToProduct(newProdId, subCategory));
      await dispatch(getProducts());
      setCategory(0);
      setSubCategory(0);
    } else if (category) {
      setSubCategory(0);
      await dispatch(postAddCateroryToProduct(newProdId, category));

      await dispatch(getProducts());
      setSubCategory(0);
    } else {
      alert("primero agregue la categoria");
    }
  }
  ///------funciones agregar especificacion al producto
  const [specifications, setSpecifications] = useState(``);
  const [inputSpec, setInputSpec] = useState({ value: "" });

  function handleChangeSpecification(e) {
    e.preventDefault();
    setSpecifications(e.target.value);
  }

  function handleInputSpec(e) {
    setInputSpec({
      ...inputSpec,
      [e.target.name]: e.target.value,
    });
  }

  async function handleClickNewSpec(e) {
    e.preventDefault();
    await dispatch(
      postAddSpecificationToProduct(newProdId, specifications, inputSpec)
    );
    await dispatch(getProducts());
  }
  //-------
  const categSelect = allCategories.filter((c) => c.id === category);

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        // onChange={(e) => handleInput(e)}
        //  onSubmit={(e) => handleSubmit(e)}
        onSubmit={formik.handleSubmit}
      >
        <h2>Creando algo</h2>
        <hr />
        <h3>Paso 1: </h3>
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
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
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
          error={
            formik.touched.grossWeight && Boolean(formik.errors.grossWeight)
          }
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
        {/* <TextField
          id="outlined-basic"
          label="Imagenes"
          variant="outlined"
        
          name="image"
          // helperText={leyendaerrorImage}
          // error={errorImage}
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        /> */}

        <Button type="submit">Crear</Button>

        <h4>(*) elementos obligatorios</h4>
      </Box>

      <hr />
      <h3>Agregar imagen</h3>

      <AddImageToProduct newProduct={newProduct} newProdId={newProdId} />
      <hr />
      <h3>Paso 2: Agregar stock</h3>

      <AddQuantity newProdId={newProdId} newProduct={newProduct} />

      <hr />

      <h3>Paso 3: Agregar categoría y sub categorías</h3>
      <TableCatAndSubcOfProduct
        subCategory={subCategory}
        category={category}
        newProdId={newProdId}
      />
      <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>

      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
        onChange={handleAddCategoryToProduct}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allCategories?.map((cat, i) => {
          return (
            <MenuItem key={i} value={cat.id}>
              {cat.name}
            </MenuItem>
          );
        })}
      </Select>

      {category === 0 ? (
        <Button>Agregar categoria</Button>
      ) : (
        <Button onClick={(e) => handleClickAddCat(e)}>Agregar categoria</Button>
      )}
      <hr />
      <InputLabel id="demo-simple-select-standard-label">
        Agregar Sub categoria
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
        {categSelect[0]?.subCategories?.map((subc, i) => {
          return (
            <MenuItem key={i} value={subc.id}>
              {subc.name}
            </MenuItem>
          );
        })}
      </Select>
      {subCategory === 0 ? (
        <Button type="button"> Agregar Sub categoría </Button>
      ) : (
        <Button onClick={(e) => handleClickAddSubCat(e)}>
          Agregar Sub categoría
        </Button>
      )}

      <AddCategory allCategories={allCategories} />

      <AddSubCategoty allCategories={allCategories} />

      <hr />
      <h3>Paso 4: agregar especificaciones</h3>
      <TableSpecific
        idUpdate={newProdId}
        specifications={specifications}
        productToUpdate={newProduct}
      />

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
        {allSpecifications.map((spec, i) => {
          return (
            <MenuItem key={i} value={spec.id}>
              {spec.name.toLowerCase()}
            </MenuItem>
          );
        })}
      </Select>

      <AddSpecificationToProduct
        newProdId={newProdId}
        specifications={specifications}
        newProduct={newProduct}
      />

      <hr />

      <AddSpecification />

      <hr />
      <h3>Paso 5: Agregar descuento</h3>
      <AddDiscountToProduct newProdId={newProdId} newProduct={newProduct} />

      <hr />
      <TableSpecification
        newProdId={newProdId}
        newProduct={newProduct}
        
      />
      <hr />
      {/* Este DeleteProdut en realiad nos trae todos los productos creados, con un boton de borrar o editar */}
      <DeleteProduct />
      <hr />

      <AdminCatAndSubc />
      <hr />
      <h2>Administracion de descuentos:</h2>
      <AdminDiscount />
      <hr />
      <AdminSpecif />
      <AdmininAllStock/>
    </>
  );
}
