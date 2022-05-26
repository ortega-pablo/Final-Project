import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct, getDetailOneProduct, getProducts, putProduct } from "../../../redux/actions";
import { ClassNames } from "@emotion/react";
import { UpdateProduct } from "./UpdateProduct";

export const DeleteProduct = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const [updating , setUpdating] = useState(false)
  const [idUpdate, setIdUpdate] = useState("");

  const productToUpdate = dispatch(getDetailOneProduct(idUpdate))

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getDetailOneProduct(idUpdate))
  }, [dispatch]);

console.log("desde admin", productToUpdate)
  
 
  async function handleDeleteProduct(e) {
    e.preventDefault();
console.log("eliminandooo")
    await dispatch(deleteProduct(e.target.value));
    await dispatch(getProducts());
  }


  //------------esditando producto
 async function handleEditProduct(e){
e.preventDefault()

setUpdating(true)
setIdUpdate(e.target.value)
console.log("editando?",updating)
await dispatch(getProducts());

  }


  return (
    <>
      <hr />
      <div>Editando Productos</div>

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
                  { updating === false ? 
                  (<Button
                    value={product.id}
                    onClick={(e) => handleEditProduct(e)}
                    name="delete"
                    // startIcon={<EditIcon />}
                  >
                   Editar
                  </Button>)  : 
                  (<Button
                  disabled
                    value={product.id}
                    // onClick={(e) => handleEditProduct(e)}
                    name="delete"
                    // startIcon={<EditIcon />}
                  >
                   Cancelar actual edicion
                  </Button>)

                  }

                  <Button
                    value={product.id}
                    onClick={(e) => handleDeleteProduct(e)}
                    name="delete"
                    startIcon={<DeleteIcon />}
                  >
                  
                    Eliminar
                  </Button>
                </TableRow>
              );
            })}

            {updating &&
             (
              <div>
                <h1>Editando</h1>
                   <UpdateProduct
                   idUpdate={idUpdate}
                   handleEditProduct={handleEditProduct}
                   setUpdating={setUpdating}
                   productToUpdate={productToUpdate}
                   />

              </div>
             )
            }
          </TableBody>
        </Table>
      </TableContainer >
      
    </>
  );
};
