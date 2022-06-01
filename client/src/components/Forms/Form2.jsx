import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import {
  postProduct,
  getProducts,
  getCategories,
  postAddCateroryToProduct,
  postAddSubCateroryToProduct,
  getAllSpecifications,
  postAddSpecificationToProduct,
} from "../../redux/actions";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AddCategory } from "./AddCategory";
import { AddSubCategoty } from "./AddSubCategoty";
import { AddQuantity } from "./AddQuantity";
import { AddSpecification } from "./AddSpecification/AddSpecification";
import { AddDiscount } from "./AddDiscount";
import { TableSpecification } from "./TablaResumen/TableSpecification";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddSpecificationToProduct } from "./AddSpecificationToProduct";
import { DeleteProduct } from "./AdminProduct/AdminProduct";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

export function UseFormControl() {
  const dispatch = useDispatch();
  const productosExistentes = useSelector((state) => state.products);
  const allCategories = useSelector((state) => state.categories);
  const allSpecifications = useSelector((state) => state.allSpecifications);

  const [inputQ, setInputQ] = useState({ quantity: 0 });

  const [category, setCategory] = React.useState("");
  const [subCategory, setsubCategory] = React.useState("");
  const [newProdId, setNewProdId] = React.useState(0);

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
    image: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
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
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      const newProd = await dispatch(postProduct(values));
      await setNewProdId(newProd.data.id);
      await dispatch(getProducts());
    },
  });

  //---------  funciones de agregar cantidad

  //----- funciones de agregar cat y sub
  const handleChangeCategoty = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleChangeSubCat = (e) => {
    e.preventDefault();
    setsubCategory(e.target.value);
  };

  async function handleClickCatAndSub(e) {
    e.preventDefault();

    await dispatch(postAddCateroryToProduct(newProdId, category));
    await dispatch(postAddSubCateroryToProduct(newProdId, subCategory));
    await dispatch(getProducts());
  }
  ///------funciones agregar especificacion al producto
  const [specifications, setSpecifications] = useState(``);
  const [inputSpec, setInputSpec] = useState({ "value:": "" });

  function handleChangeSpecification(e) {
    e.preventDefault();
    setSpecifications(e.target.value);
  }

  function handleInputSpec(e) {
    e.preventDefault();
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

  //Funciones para las TABS
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

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Crear Producto" {...a11yProps(0)} />
            <Tab label="Stock" {...a11yProps(1)} />
            <Tab label="Categorías" {...a11yProps(2)} />
            <Tab label="Especificaciones" {...a11yProps(3)} />
            <Tab label="Descuentos" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
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
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
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
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              id="outlined-basic"
              label="Peso neto *"
              variant="outlined"
              name="netWeight"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">gr</InputAdornment>
                ),
              }}
              // helperText={leyendaErrorNetWei}
              // error={errorNetWei}
              value={formik.values.netWeight}
              onChange={formik.handleChange}
              error={
                formik.touched.netWeight && Boolean(formik.errors.netWeight)
              }
              helperText={formik.touched.netWeight && formik.errors.netWeight}
            />
            <TextField
              id="outlined-basic"
              label="Peso bruto *"
              variant="outlined"
              name="grossWeight"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">gr</InputAdornment>
                ),
              }}
              // helperText={leyendaerrorGrossWei}
              // error={errorGrossWei}
              value={formik.values.grossWeight}
              onChange={formik.handleChange}
              error={
                formik.touched.grossWeight && Boolean(formik.errors.grossWeight)
              }
              helperText={
                formik.touched.grossWeight && formik.errors.grossWeight
              }
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
              // helperText={leyendaerrorImage}
              // error={errorImage}
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />

            <Button type="submit">Crear</Button>

            <h4>(*) elementos obligatorios</h4>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <AddQuantity newProdId={newProdId} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <InputLabel id="demo-simple-select-standard-label">
            Categoria
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={category}
            onChange={handleChangeCategoty}
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

          <AddCategory allCategories={allCategories} />

          <AddSubCategoty allCategories={allCategories} />
        </TabPanel>

        <TabPanel value={value} index={3}>
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
              return (
                <MenuItem value={spec.id}>{spec.name.toLowerCase()}</MenuItem>
              );
            })}
          </Select>

          <hr />

          <AddSpecificationToProduct
            newProdId={newProdId}
            specifications={specifications}
          />

          <hr />

          <AddSpecification />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <AddDiscount />
        </TabPanel>
      </Box>

      
      <Typography> Taba de especificaciones:</Typography>
      <TableSpecification
        newProdId={newProdId}
        // newProd={newProd}
        // input={input}
        inputQ={inputQ}
        allCategories={allCategories}
        subCategory={subCategory}
        category={category}
        productosExistentes={productosExistentes}
        specifications={specifications}
        inputSpec={inputSpec}
      />
      <DeleteProduct />
    </>
  );
}
