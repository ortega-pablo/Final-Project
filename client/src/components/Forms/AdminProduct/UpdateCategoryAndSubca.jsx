import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSpecifications,
  getCategories,
  getProducts,
  postAddCateroryToProduct,
  postAddSubCateroryToProduct,
  putCategoryToProduct,
  putSubCategoryToProduct,
} from "../../../redux/actions";
import { AddCategory } from "../AddCategory";

export const UpdateCategoryAndSubca = ({ productToUpdate, idUpdate }) => {
  const allCategories = useSelector((state) => state.categories);
  const [category, setCategory] = React.useState("");
  const [subCategory, setsubCategory] = React.useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getAllSpecifications());
  }, [dispatch]);


  const categSelect = allCategories.filter((c) => c.id === category);


  async function handleDeleteCat(e) {
    e.preventDefault();
    await dispatch(putCategoryToProduct(idUpdate, e.target.value));

    await productToUpdate?.subCategories?.map( (sc,i)=>    dispatch(putSubCategoryToProduct(idUpdate, sc.id)) )
    await dispatch(getProducts())
   
  }

  async function handleDeleteSubc(e){
    e.preventDefault();
await dispatch(putSubCategoryToProduct(idUpdate,e.target.value))
await dispatch(getProducts())

  }

  //------FUNCIONES PARA AGREGAR CATEGORIAS AL PRODUCTO

  async function handleAddCategoryToProduct(e){
      e.preventDefault();
      setCategory(e.target.value);
      

  }

    
     const handleClickAddCat = async (e) => {
    e.preventDefault();
        await dispatch(postAddCateroryToProduct(idUpdate, category))
        await dispatch(getProducts())
  };


  //------funciones para agregar subcategorias al producto
  const handleChangeSubCat = (e) => {
    e.preventDefault();
    setsubCategory(e.target.value);
  };


  async function handleClickAddSubCat(e){
    e.preventDefault()
    if(category){
        await dispatch(postAddCateroryToProduct(idUpdate, category))
        await dispatch(postAddSubCateroryToProduct(idUpdate,subCategory ))
        await dispatch(getProducts())
    } else{
        console.log("primero agregue la categoria")
    }
  }
  return (
    <>  Atencion: Si elimina su categoría, se eliminaran del producto las subcategorías asociadas
      {productToUpdate?.categories?.map((c,i) => {
        return (
          <>
            <TableRow>
              <TableCell>
                <b>Categoría</b>
              </TableCell>
              <TableCell>{c.name}</TableCell>
              <Button
                value={c.id}
                onClick={(e) => handleDeleteCat(e)}
                // name="delete"
                // startIcon={<EditIcon />}
              >
                Eliminar
              </Button>
            </TableRow>
          

            {productToUpdate?.subCategories?.map( sc => {
                return (
                    <TableRow>
                    <TableCell>
                      <b>Sub categoría</b>
                    </TableCell>
                    <TableCell>{sc?.name}</TableCell>
                    <Button
                    value={sc.id}
                    onClick={(e) => handleDeleteSubc(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                    >
                      Eliminar
                    </Button>
                  </TableRow>
                )
            })}
            
          </>
          
        );
      })}

     
     

      <InputLabel id="demo-simple-select-standard-label">Agregar solamente categoria</InputLabel>
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
          return (
            <MenuItem value={cat.id}>
              {cat.name}
            </MenuItem>
          );
        })}

      </Select>
        <Button onClick={(e) => handleClickAddCat(e)}>
        Agregar categoria
      </Button>
<hr />
      <InputLabel id="demo-simple-select-standard-label">
       Agregar  Sub categoria
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
      <Button onClick={(e) => handleClickAddSubCat(e)}>
        Agregar Sub categoría
      </Button>
      <hr />
      <AddCategory allCategories={allCategories} />
      <hr />
    </>
  );
};
