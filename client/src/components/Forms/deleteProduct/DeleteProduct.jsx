import {
    Button,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct, getProducts } from "../../../redux/actions";

export const DeleteProduct = () => {
    const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.products);

  useEffect(()=>{
      dispatch(getProducts())
  }, [dispatch])

const [idDelete,setIdDelete] = useState("")
console.log(idDelete)
function handleDelete (e) {
    e.preventDefault()
    console.log(e.target.value)
    setIdDelete(e.target.value)

}

   async function handleDeleteProduct(e){
      e.preventDefault()
     
      console.log("holaaaa")
      
          //   if(window.confirm("¿Estas seguro de eliminar " ) === true){
           await   dispatch(deleteProduct(e.target.value))
           await  dispatch(getProducts())
              // alert("Eliminaste a...");
      //   }
      
}
  return (
    <>
      <hr />
      <div>DeleteProduct</div>

      <TableContainer
        sx={{
          ml: "auto",
          mr: "auto",
          mt: "2%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table sx={{ minWidth: 650, width: "80%" }} aria-label="simple table">
          <TableBody>
            {allProducts?.map((product) => {
              return (
                <TableRow>
                    <TableCell>
                    <b>
                      <h4>{product.id}</h4>
                    </b>
                  </TableCell>
                  <TableCell>
                    <b>
                      <h4>{product.name}</h4>
                    </b>
                  </TableCell>
                  <IconButton>
                  <EditIcon />
                </IconButton >
                

                <button   name="delete"><DeleteIcon value={product.id} onClick={ e => handleDeleteProduct(e)}   /></button>
                {/* <Button onClick={ e => handleDeleteProduct(e)} name="delete" >
             
                  <DeleteIcon   / >{product.id}</DeleteIcon>
                </Button> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
