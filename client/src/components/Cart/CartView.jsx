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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartResume } from "./CartResume";

const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(true);

  useEffect(() => {
    dispatch(getCartById(token));
  }, [render]);

  let totalAmount = 0;
  cart.products?.forEach((p) => {
    totalAmount += p.price * p.Quantity.total;
  });

  const handleConfirmAndSetAmount = (e) => {
    e.preventDefault();
    const amountToCents = totalAmount * 100;
    dispatch(setCartAmount(cart.id, amountToCents));
    Swal.fire({
      background: "#DFDCD3",
      icon: "success",
      title: `total amount: ${amountToCents}`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/checkout");
  };

  return (
    <>
      <Box maxHeight={600} sx={{  p:5,  mt: 5,  display:'flex', justifyContent:'space-around' }}>
        <TableContainer   sx={{  alignItems:'center',width:'60%'}} component={Paper} >
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
              <TableCell>
              <DeleteIcon fontSize="small" />
              </TableCell>
            </TableHead>
            <TableBody sx={{ width: "100%" }}>
              {cart?.products?.map((p) => {
                return (
                  <DetailRow
                    token={token}
                    row={p}
                    cartId={cart.id}
                    setRender={setRender}
                    render={render}
                  />
                );
              })}
              <TableRow >
                <TableCell>
                  <Typography variant="h4" >Total</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" >{totalAmount}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={(e) => handleConfirmAndSetAmount(e)}>
            {" "}
            Confirmar carrito
          </Button>
        </TableContainer>
        <Container  sx={{width:'25%'}}>
          <CartResume totalAmount={totalAmount}/>
        </Container>
      </Box>
    </>
  );
};

export default CartView;
