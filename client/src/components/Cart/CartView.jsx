import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DetailRow from "./Rows/DetailRow";
import { getCartById } from "../../redux/actions";

const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
  

  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  useEffect(()=>{
    dispatch(getCartById(token))
  },[dispatch])
  
  
  
  

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <TableContainer component={Paper} align="center">
        <Table>
          <TableHead>
            <TableCell>
              <Typography variant="h5">Producto</Typography>
            </TableCell>
            <TableCell/>
            <TableCell>
              <Typography variant="h5">Cantidad</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Precio</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Total</Typography>
            </TableCell>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {cart?.products?.map((p) => {
              return <DetailRow token={token} row={p} cartId={cart.id}/>;
            })}
            <TableRow>
                <TableCell>
                    <Typography variant="h4">
                        Total
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="h4">
                        total de la compra
                    </Typography>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartView;
