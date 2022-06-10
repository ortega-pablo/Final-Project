import {
  Paper,
  Typography,
  List,
  ImageListItem,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Button,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getDetail,
  getDetailOneProduct,
  getOrderById,
  getProducts,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { NewReview } from "./UserPanel/NewReview";

export const OrderDetailForUserPanel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let dollarUSLocale = Intl.NumberFormat("en-US");
  const currentOrder = useSelector((state) => state.currentOrder);
  const productos = useSelector((state) => state.products);
  const navigate = useNavigate();

  console.log("soy la orden actual", currentOrder);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [haveReview, setHaveReview] = useState();
  console.log(haveReview);
  useEffect(() => {
    dispatch(getOrderById(id));
    dispatch(getProducts());
  }, [dispatch]);

  //ID de los productos de la orden actual
  const prodOrder = currentOrder?.orderProducts?.map((p) => p.productId);
  //[1,3,4]
  console.log("soy los productos de la ord actual", prodOrder);

  //a es un array  con los productos de la orden y su detalle
  let a = [];
  for (let i = 0; i < prodOrder?.length; i++) {
    const productInOrder = productos?.find((p) => p.id === prodOrder[i]);
    console.log(productInOrder);
    a = [...a, productInOrder];
  }
  console.log("detail de los prod  de la order", a);

  let b = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i]?.reviews?.length; j++) {
      if (a[i]?.reviews[j]?.orderId == id) {
        b.push(a[i]);
      }
    }
  }

  const idArrayObjs = b?.map((p) => p.id);

  let difference = prodOrder?.filter((x) => !idArrayObjs?.includes(x));
  console.log("soy el diference de jose", difference);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "84.1vh",
      }}
    >
      <Paper
        component="div"
        sx={{
          width: "700px",
          minHeight: "600px",
          padding: "15px",
          margin: "10px",
        }}
      >
        <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>
          Orden N° {currentOrder.id}
        </Typography>
        <Typography variant="h6">Resumen de compra:</Typography>
        <List disablePadding>
          {currentOrder?.orderProducts?.map((p) => (
            <ListItem
              key={p.productName}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <ImageListItem sx={{ width: "90px", heigth: "90px" }}>
                <img src={p.productImage} />
              </ImageListItem>
              <ListItemText
                sx={{ margin: "5px" }}
                primary={p.productName}
                secondary={"x" + p.quantity}
              />
              <ListItemText
                sx={{ margin: "5px" }}
                primary={`Sub total: $${dollarUSLocale.format(
                  p.price * p.quantity
                )}`}
              />
            </ListItem>
          ))}
          <ListItem>
            <Typography variant="subtitle2">
              {`Total: $${dollarUSLocale.format(currentOrder.total / 100)}`}
            </Typography>
          </ListItem>
        </List>
        <Divider></Divider>
        <Typography variant="h6">Datos del cliente:</Typography>
        <Box>
          <Typography sx={{ margin: "5px" }}>
            Nombre: {`${currentOrder?.FirstName} ${currentOrder?.LastName}.`}
          </Typography>
          <Typography sx={{ margin: "5px" }}>
            Correo electrónico: {`${currentOrder?.EmailAddress}.`}
          </Typography>
          <Typography sx={{ margin: "5px" }}>
            Teléfono: {`${currentOrder?.Mobile}.`}
          </Typography>
          <Typography sx={{ margin: "5px" }}>
            Pais: {`${currentOrder?.Country}.`}
          </Typography>
          <Typography sx={{ margin: "5px" }}>
            Dirección: {`${currentOrder?.Address1}, ${currentOrder.City}.`}
          </Typography>
          <Typography sx={{ margin: "5px" }}>
            CP: {`${currentOrder?.PostCode}.`}
          </Typography>
        </Box>
        <Divider></Divider>
        <Typography variant="h6">Estado de compra:</Typography>
        <Box>
          <Typography sx={{ margin: "5px" }}>
            Estado: {`${currentOrder?.state}.`}
          </Typography>
          {currentOrder?.paymentState === "success" ? (
            <Typography sx={{ margin: "5px" }}>Pago: Exitoso.</Typography>
          ) : (
            <Typography sx={{ margin: "5px" }}>Pago: Rechazado.</Typography>
          )}
        </Box>

        {/* && e?.length === 0 */}

        <Box sx={{ mt: "10px", display: "flex", justifyContent: "center" }}>
          {currentOrder?.paymentState === "success" ? (
            <Button onClick={handleOpen}>Calificar compra</Button>
          ) : (
            <Button>Ya calificaste la compra</Button>
          )}

          <Button
            variant="contained"
            color="ambar3"
            size="small"
            onClick={() => navigate("/myOrders")}
          >
            Volver a mis ordenes
          </Button>
        </Box>

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
              width: 1000,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <NewReview
              currentOrder={currentOrder}
              orderId={id}
              f={difference} //array con los productId q faltan calificar[2,3]
            />
          </Box>
        </Modal>
      </Paper>
    </Box>
  );
};
