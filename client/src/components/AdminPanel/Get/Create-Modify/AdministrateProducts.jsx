import {
  Box,
  Button,
  Paper,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct, getProducts } from "../../../../redux/actions/index";
import { UpdateProduct } from "../../../Forms/AdminProduct/UpdateProduct";
import { TypographyMenu } from "../../../../personalizadTheme";

export const AdministrateProduct = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const [updating, setUpdating] = useState(false);



  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [idUpdate, setIdUpdate] = useState("");
  const productToUpdate = allProducts.find( p => p.id === Number(idUpdate) )
  async function handleDeleteProduct(e) {
    e.preventDefault();
    console.log("Producto eliminado");
    await dispatch(deleteProduct(e.target.value));
    await dispatch(getProducts());
  }

  //------------esditando producto
  async function handleEditProduct(e) {
    e.preventDefault();
    window.scrollTo(0, 0)
    await setIdUpdate(e.target.value);
    await setUpdating(true);
  }

  return (
    <Box>
      {updating && (
        <div>
          <UpdateProduct
            idUpdate={idUpdate}
            productToUpdate={productToUpdate}
            setUpdating={setUpdating}
          />
        </div>
      )}
      <TableContainer
        component={Paper}
        sx={{
          width:"100%",
          ml: "auto",
          mr: "auto",
          mt: "2%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
              <Typography variant="h5" color="darkGrey.main">
                  SKU
                </Typography>
              </TableCell>
              <TableCell width="90%">
                <Typography variant="h5" color="darkGrey.main">
                  Producto
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts?.map((product) => {
              return (
                <TableRow>
                  <TableCell>
                    {/* <Typography variant="body1" color="ambar5"> */}
                      {product.sku}
                    {/* </Typography> */}
                  </TableCell>
                  <TableCell>
                    {/* <Typography variant="body1" color="ambar5"> */}
                      {product.name}
                    {/* </Typography> */}
                  </TableCell>
                  <TableCell>

                  { !updating ? 
                  (
                    <Button
                     variant="contained"
                     color="darkGrey"
                      size="small"
                      value={product.id}
                      onClick={(e) => handleEditProduct(e)}
                      name="edit"
                      // startIcon={<EditIcon />}
                    >
                    <TypographyMenu>Editar</TypographyMenu>
                        
                      
                    </Button>
                  ) :

                  <Button
                  variant="contained"
                  color="darkGrey"
                  disabled
                  size="small"
                  value={product.id}
                  onClick={(e) => handleEditProduct(e)}
                  name="edit"
          
                >
                   <TypographyMenu>Editar</TypographyMenu> 
                </Button>


                  }


                  </TableCell>
                  <TableCell>


                        { !updating ? 
                        (
                    <Button
                    variant="contained"
                    color="darkGrey"
                      size="small"
                      value={product.id}
                      onClick={(e) => handleDeleteProduct(e)}
                      name="delete"
                      // startIcon={<DeleteIcon />}
                    >

<TypographyMenu>Eliminar</TypographyMenu> 

                    </Button>
                        ) :

                        (
                          <Button
                          disabled
                          variant="contained"
                     color="darkGrey"
                          size="small"
                          value={product.id}
                          onClick={(e) => handleDeleteProduct(e)}
                          name="delete"
                        >
                         <TypographyMenu>Eliminar</TypographyMenu>   
                        </Button>
                        )

                        
                        
                        }


                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
