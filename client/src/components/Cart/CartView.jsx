import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
  Button,
} from "@mui/material";
import DetailRow from "./Rows/DetailRow";
import { getCartById, setCartAmount } from "../../redux/actions";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  useEffect(() => {
    dispatch(getCartById(token));
  }, [dispatch]);

  let totalAmount = 0;
  cart.products?.forEach((p) => {
    totalAmount += p.price * p.Quantity.total;
  });

  const handleConfirmAndSetAmount = (e) =>{
    e.preventDefault()
    const amountToCents = totalAmount * 100
    dispatch(setCartAmount(cart.id, amountToCents))
    Swal.fire({
      background: '#DFDCD3',
      icon: 'success',
      title: `total amount: ${amountToCents}`,
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/checkout')
  }

  return (
    <>
      <Box sx={{ mt: 5, width: "60%" }}>
        <TableContainer component={Paper} align="center">
          <Table>
            <TableHead>
              <TableCell>
                <Typography variant="h5">Producto</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Cantidad</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Precio</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">SubTotal</Typography>
              </TableCell>
            </TableHead>
            <TableBody sx={{ width: "100%" }}>
              {cart?.products?.map((p) => {
                return <DetailRow token={token} row={p} cartId={cart.id} />;
              })}
              <TableRow>
                <TableCell>
                  <Typography variant="h4">Total</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{totalAmount}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={(e) => handleConfirmAndSetAmount(e)} > Confirmar carrito</Button>
        </TableContainer>
        <Container>
          <Typography> Aca va el resumen </Typography>
        </Container>
      </Box>
    </>
  );
};

export default CartView;
