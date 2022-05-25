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

export const AdministrateProduct = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [idUpdate, setIdUpdate] = useState("");

  async function handleDeleteProduct(e) {
    e.preventDefault();
    console.log("Producto eliminado");
    await dispatch(deleteProduct(e.target.value));
    await dispatch(getProducts());
  }

  //------------esditando producto
  async function handleEditProduct(e) {
    e.preventDefault();
    setUpdating(true);
    setIdUpdate(e.target.value);
  }

  return (
    <Box>
      {updating && (
        <div>
          <UpdateProduct
            idUpdate={idUpdate}
            handleEditProduct={handleEditProduct}
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
              <Typography variant="h5" color="ambar5">
                  SKU
                </Typography>
              </TableCell>
              <TableCell width="90%">
                <Typography variant="h5" color="ambar5">
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
                    <Typography variant="body1" color="ambar5">
                      {product.sku}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="ambar5">
                      {product.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="ambar4"
                      size="small"
                      value={product.id}
                      onClick={(e) => handleEditProduct(e)}
                      name="delete"
                      startIcon={<EditIcon />}
                    >
                      <Typography variant="h6" color="ambar5" >
                        Editar
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="ambar4"
                      size="small"
                      value={product.id}
                      onClick={(e) => handleDeleteProduct(e)}
                      name="delete"
                      startIcon={<DeleteIcon />}
                    >
                      <Typography variant="h6" color="ambar5">
                        Eliminar
                      </Typography>
                    </Button>
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
