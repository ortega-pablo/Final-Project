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
import { clearCart, getCartById, setCartAmount } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import DeleteIcon from "@mui/icons-material/Delete";
import { CartResume } from "./CartResume";
import { TypographyMenu } from "../../personalizadTheme";

const CartView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(true);

  useEffect(() => {
    dispatch(getCartById(token));
    return (()=> dispatch(clearCart()))
  }, [dispatch, render]);

  let totalAmount = 0;
  cart.products?.forEach((p) => {
    totalAmount += p.price * p.Quantity.total;
  });


  const handleConfirmAndSetAmount = (e) => {
    e.preventDefault();
    const amountToCents = totalAmount * 100;
    dispatch(setCartAmount(cart.userId, amountToCents));
    Swal.fire({
      background: "#2f2e2b",
      icon: "success",
      title: `Monto total: ${totalAmount}`,
      showConfirmButton: false,
      timer: 2000,
    });

    navigate("/checkout");
  };



  return (
    <>
      <Box
        sx={{ p: 5, mt: 5, display: "flex", justifyContent: "space-around" }}
      >
        <Box sx={{ alignItems: "center", width: "60%" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>
                  <Typography variant="h5" color="darkGrey.main" >Producto</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" color="darkGrey.main" >Cantidad</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" color="darkGrey.main" >Precio</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" color="darkGrey.main" >SubTotal</Typography>
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
                      userId={cart.userId}
                    />
                  );
                })}
                <TableRow>
                  <TableCell>
                    <Typography variant="h4">Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{totalAmount}</Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}/>
                  <TableCell sx={{ border: "none" }} align='ri'>
                    {totalAmount === 0 ?
                    <Button
                    variant="contained"
                    color="darkGrey"
                    disabled
                  >
                    <TypographyMenu>Confirmar</TypographyMenu> 
                  </Button>
                  :
                    <Button
                      onClick={(e) => handleConfirmAndSetAmount(e)}
                      variant="contained"
                      color="darkGrey"
                      
                    >
                      <TypographyMenu>Confirmar</TypographyMenu>
                    </Button>
                    }
                  </TableCell>
                  
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Container sx={{ width: "35%" }}>
          <CartResume totalAmount={totalAmount} />
          
            <Button
              variant="contained"
              color="darkGrey"
              sx={{ display:"flex", alignItems: "right", mt:3 }}
              href='/'
            >
              <TypographyMenu>Volver</TypographyMenu>
            </Button>
          
        </Container>
      </Box>
    </>
  );
};

export default CartView;
