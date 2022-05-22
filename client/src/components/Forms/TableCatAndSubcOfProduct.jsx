import { Button, ListItemAvatar, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, putCategoryToProduct, putSubCategoryToProduct } from '../../redux/actions';
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

export const TableCatAndSubcOfProduct = ({newProdId}) => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products);
    // const [idCat, setIdCat] = useState("")

useEffect(()=>{
    dispatch(getProducts())
}, [dispatch])

     const [idSubCat, setIdSubCat] = useState(false)
     const [reRender, setReRender] = useState("");

    const newProducts = products.find((p) => p.id === newProdId);

    async function handleDeleteCat(e) {
        e.preventDefault();
       
        await dispatch(putCategoryToProduct(newProdId,e.target.value));
        await newProducts?.subCategories?.map( (sc)=>    dispatch(putSubCategoryToProduct(newProdId, sc.id)) )
        await dispatch(getProducts())
        // setIdSubCat(0)
        // setReRender(0)
      }
    
      async function handleDeleteSubc(e){
        e.preventDefault();
    await dispatch(putSubCategoryToProduct(newProdId,e.target.value))
    await dispatch(getProducts())
    
    
      }
   
  return (

    <>
    <div>TableCatAndSubcOfProduct</div>
    Atencion: Si elimina su categoría, se eliminaran del producto las subcategorías asociadas
      {newProducts?.categories.map((c) => {
        return (
          <>
            <TableRow>
              <TableCell>
                <b>Categoría</b>
              </TableCell>
              <TableCell>{c.name}</TableCell>   
              {c?.subCategories?.map(sc => <TableCell>{sc.name}</TableCell> ) }
              
              <Button
                value={c.id}
                onClick={(e) => handleDeleteCat(e)}
                // name="delete"
                // startIcon={<EditIcon />}
              >
                Eliminar
              </Button>
            </TableRow>
          

            {     newProducts?.subCategories?.map( sc => {
                return (
                    <TableRow>
                    <TableCell>
                    {/* <ListItemAvatar>
                  <SubdirectoryArrowRightIcon />
                </ListItemAvatar>   */}
                <b>Sub categoría</b>
                    </TableCell>
                    <TableCell>{sc.name}</TableCell>
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
    </>


  )
}
