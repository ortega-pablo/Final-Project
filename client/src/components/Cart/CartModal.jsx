import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CardMedia, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  getCartById,
  getProducts,
} from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ButtonContained, TypographyMenu } from "../../personalizadTheme";

export default function CartModal({
  id,
  description,
  token,
  cartProducts,
  userStatus,
  name,
  stock,
  price,
  image,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // setPrecio();
  }, []);
  const handleSetCantidad = (e) => {
    setCantidad(e.target.value);
  };

  const handleSubmitCart = async (e) => {
    e.preventDefault();
    let busqueda = cartProducts?.find((p) => p.id === id);
    if (cantidad <= 0) {
      setOpen(false);
      Swal.fire({
        background: "#DFDCD3",
        confirmButtonColor: "#B6893E",
        icon: "error",
        title: "Oops...",
        text: "La cantidad no puede ser 0 o menor que 0",
      }).then(() => {
        setOpen(true);
      });
    } else if (cantidad <= stock) {
      if (!busqueda) {
        await dispatch(addItemToCart(id, token, cantidad));
        dispatch(getCartById(token));
        Swal.fire({
          background: "#DFDCD3",
          icon: "success",
          title: "Agregado",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpen(false);
        dispatch(clearCart());
      } else {
        Swal.fire({
          background: "#DFDCD3",
          confirmButtonColor: "#B6893E",
          icon: "error",
          title: "Oops...",
          text: "Ya tenes este producto en tu carrito",
          footer: "<a href='/cart'> Ir al carrito </a>",
          confirmButtonText: "Seguir viendo",
        });
        setOpen(false);
      }
    } else {
      if (stock === 0) {
        Swal.fire({
          background: "#DFDCD3",
          confirmButtonColor: "#B6893E",
          icon: "error",
          title: "Oops...",
          text: "Este producto esta agotado",
        });
        setOpen(false);
      } else {
        setOpen(false);
        Swal.fire({
          background: "#DFDCD3",
          confirmButtonColor: "#B6893E",
          icon: "error",
          title: "Oops...",
          text: "Stock insuficiente para la cantidad seleccionada",
        }).then(() => {
          setOpen(true);
        });
      }
    }
  };
  const handleAlert = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Logeate",
      text: "Por favor, inicia sesión para ver tu carrito",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iniciar sesión",
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
        window.location.reload();
      }
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {stock === 0 ? (
        <>
          <Button variant="contained" color="darkGrey" size="small" disabled>
            <TypographyMenu>Producto sin stock</TypographyMenu>
          </Button>
        </>
      ) : stock > 0 && stock <= 5 ? (
        <>
        <Button variant="contained" color="darkGrey" size="small" onClick={userStatus !== null ? handleOpen : handleAlert}>
            <TypographyMenu>Agregar al Carrito</TypographyMenu>
            <ShoppingCartIcon size="small" />
          </Button>
          <Typography color="darkGrey.main">Ultimas unidades!</Typography>
        </>
      ) : (
        <Button variant="contained" color="darkGrey" size="small" onClick={userStatus !== null ? handleOpen : handleAlert}>
            <TypographyMenu>Agregar al Carrito</TypographyMenu>
            <ShoppingCartIcon size="small" />
          </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="verdeLima.main" >{name}</Typography>
          
            <CardMedia component="img"
            height="140"
            image={image}
            alt={name} />

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Precio: {price}
          </Typography>
          <Typography>Stock: {stock}</Typography>
          <form
            onSubmit={(e) => {
              handleSubmitCart(e);
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextField
                margin="normal"
                type="number"
                required
                id="cantidad"
                label={cantidad}
                value={cantidad}
                name="cantidad"
                sx={{
                  width: 100,
                }}
                onChange={(e) => {
                  handleSetCantidad(e);
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="darkGrey"
                size="small"
              >
                {" "}
                <TypographyMenu>Agregar</TypographyMenu>
                {" "}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="contained"
                color="darkGrey"
                size="small"
              >
                {" "}
                <TypographyMenu>Cancelar</TypographyMenu>
                {" "}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
