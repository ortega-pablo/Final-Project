import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypographyMenu } from "../../../personalizadTheme";
import {
  getAllSpecifications,
  getCategories,
  getDetailOneProduct,
  getProducts,
  getSubCategories,
  postAddCateroryToProduct,
  postAddSubCateroryToProduct,
  putCategoryToProduct,
  putSubCategoryToProduct,
} from "../../../redux/actions";
import { AddCategory } from "../AddCategory";

export const UpdateCategoryAndSubca = ({ productToUpdate, idUpdate }) => {
  const allCategories = useSelector((state) => state.categories);
  const allSubcategories = useSelector((state) => state.subCategories);

  const [category, setCategory] = React.useState("");
  var [subCategory, setsubCategory] = useState("")

  var [render, setRender] = useState("")

 
  const uploadProducDetail = useSelector(state => state.getDetailOneProduct)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSubCategories());

    dispatch(getAllSpecifications());
    dispatch(getDetailOneProduct(idUpdate))
  }, [dispatch]);

  const categSelect = allCategories.filter((c) => c.id === category);


/// funciones para borrar una categoria al producto
  async function handleDeleteCat(e) {
    e.preventDefault();
    
  const subCatInCadena = allSubcategories.filter((sc) => sc.categories[0]?.id == e.target.value);
console.log(subCatInCadena)
  await dispatch(putCategoryToProduct(idUpdate, e.target.value));

  if (subCatInCadena.length > 0) {
    subCatInCadena.map(
      async (sc) => await dispatch(putSubCategoryToProduct(idUpdate, sc.id))
    );
    await dispatch(getProducts());
    await dispatch(getDetailOneProduct(idUpdate))
      setRender(idUpdate)

  }

  await dispatch(getProducts());
  }
 //funcion para borrrar su sub categoria
  async function handleDeleteSubc(e) {
    e.preventDefault();
    await dispatch(putSubCategoryToProduct(idUpdate, e.target.value));
    await dispatch(getProducts());
    await dispatch(getDetailOneProduct(idUpdate))
    setRender(idUpdate)
  }

  //------FUNCIONES PARA AGREGAR CATEGORIAS AL PRODUCTO

  async function handleAddCategoryToProduct(e) {
    e.preventDefault();
    setCategory(e.target.value);
  }

  const handleClickAddCat = async (e) => {
    e.preventDefault();
    await dispatch(postAddCateroryToProduct(idUpdate, category));
    await dispatch(getProducts());
    await  dispatch(getDetailOneProduct(idUpdate))

  };

  //------funciones para agregar subcategorias al producto
  const handleChangeSubCat = (e) => {
    e.preventDefault();
    setsubCategory(e.target.value);

  };

  
  async function handleClickAddSubCat(e) {
    e.preventDefault();
    if (category && subCategory) {
      await dispatch(postAddCateroryToProduct(idUpdate, category));
      await dispatch(postAddSubCateroryToProduct(idUpdate, subCategory));
      await dispatch(getProducts());

      await  dispatch(getDetailOneProduct(idUpdate))
      await  dispatch(getDetailOneProduct(idUpdate))
     
      setsubCategory();
      setCategory(0);


    } else if (category) {
      setsubCategory(0);
      await dispatch(postAddCateroryToProduct(idUpdate, category));
      await  dispatch(getDetailOneProduct(idUpdate))
      await  dispatch(getDetailOneProduct(idUpdate))


      await dispatch(getProducts());
      setsubCategory(0);
    } else {
      alert("primero agregue la categoria");
    }




  }




  return (
    <>
    <Typography color="warning.light">Atencion: Si elimina su categoría, se eliminaran del producto las subcategorías asociadas</Typography>
      
      
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="darkGrey.main">Nombre de la categoria: </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productToUpdate?.categories.map((c) => {
              return (
                <TableRow>
                  <TableCell>{c.name}</TableCell>
                  <TableCell></TableCell>

                  <Button
                    value={c.id}
                    onClick={(e) => handleDeleteCat(e)}
                    variant="contained"
                    color="darkGrey"
                  >
                    <TypographyMenu>Eliminar</TypographyMenu> 
                  </Button>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
              <Typography color="darkGrey.main">Nombre de la sub-categoria: </Typography>
              </TableCell>
              <TableCell>
              <Typography color="darkGrey.main">Pertenece a la categoría: </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {                 uploadProducDetail[0]?.subCategories.map(sc => {
                      return (
                        <TableRow>
                          <TableCell>{sc.name} </TableCell>
                          <TableCell>{sc.categories[0].name} </TableCell>

                        <Button
                      value={sc.id}
                      onClick={(e) => handleDeleteSubc(e)}
                      variant="contained"
                    color="darkGrey"
                  >
                    <TypographyMenu>Eliminar</TypographyMenu> 
                  </Button>
                          </TableRow>
                      )
          } )
          
          }
          </TableBody>
        </Table>
      </TableContainer>


      <InputLabel id="demo-simple-select-standard-label">
   
      </InputLabel>
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
        {allCategories?.map((cat) => {
          return <MenuItem value={cat.id}>{cat.name}</MenuItem>;
        })}
      </Select>
      <Button onClick={(e) => handleClickAddCat(e)} variant="contained" color="darkGrey" sx={{ml:2}}> <TypographyMenu>Agregar categoria</TypographyMenu> </Button>
      <hr />
      <InputLabel id="demo-simple-select-standard-label">

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
      <Button onClick={(e) => handleClickAddSubCat(e)} variant="contained" color="darkGrey" sx={{ml:2}}> <TypographyMenu>Agregar subcategoria</TypographyMenu> </Button>
      <hr />
      <AddCategory allCategories={allCategories} />
      <hr />
    </>
  );
};
