import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventary, getProducts } from "../../../redux/actions";

export const AdmininAllStock = () => {
  const dispatch = useDispatch();
  const allStock = useSelector((state) => state.inventory);
  const allProducts = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getInventary());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div>En este panel vemos todos los productos y su stock</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre del producto: </b></TableCell>
              <TableCell><b>Stock: </b></TableCell>
              <TableCell><b>Precio por unidad: </b></TableCell>
              <TableCell><b>Valor en stock: </b></TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {allProducts.map((p) => {
              return (
                <TableRow>
                 

                  <TableCell>{p?.name}</TableCell>
                  <TableCell>{p?.productInventory?.quantity}</TableCell>
                  <TableCell> ${p?.price}</TableCell>
                  <TableCell>
                       ${p?.price * p?.productInventory?.quantity}
                  </TableCell>

                  <Button
                    value={p.id}
                    // onClick={(e) => handleDeleteSpeci(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                  >
                    Editar 
                  </Button>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
