import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCartById, getDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import CarouselDetail from "./CarouselDetail";
import TableDetail from "./TableDetail";
import QuestionsAndAnswers from "./QuestionsAndAnswers";
import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Box, maxWidth } from "@mui/system";
import { Footer } from "../Footer/Footer";
import { BoxGeneral } from "../../personalizadTheme";
import AllReviews from "./AllReviews";
import Swal from "sweetalert2";
import CartModal from "../Cart/CartModal";
import RatingProduct from "./RatingProduct";



export const Detail = () => {
  const dispatch = useDispatch();
  //deberia ser un state.detail
  let productDetail = useSelector((state) => state.productDetail);
  const cart = useSelector((state) => state.cart);
  const userStatus = useSelector((state) => state.userStatus);

  let { id } = useParams();

  const [reRender, setReRender] = React.useState("");

  const handleReRender = (e) => {
    setReRender(`Ultimo ordenamiento ${e}`);
    dispatch(getDetail(id));
  };

  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getCartById(token));
  }, [dispatch]);

  

  let promedy = 0;
  productDetail[0]?.reviews?.forEach((r) => {
    return (promedy = promedy + r.rating);
  });
  promedy = promedy / productDetail[0]?.reviews?.length;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        textAlign:"center",
        backgroundColor:"ambar1.main",
      }}
    >
      <Paper component="div" sx={{ maxWidth: "1100px", mt: "2%", mb: "2%" }}>
        {productDetail.length > 0 ? (
          <Container
            maxWidth="vp"
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "3%",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Divider>
              <Chip
                label={productDetail[0].name}
                size="string"
                sx={{ fontSize: "24px", color: "ambar5.main" }}
              />
            </Divider>

            <CarouselDetail
              productDetail={productDetail}
              sx={{
                display: "flex",
                width: "100%",
              }}
            />
<Typography variant="h6" sx={{m:1}}>Precio: ${productDetail[0]?.price}</Typography>
            <CartModal
              token={token}
              id={productDetail[0].id}
              description={productDetail[0].description}
              cartProducts={cart.products}
              userStatus={userStatus}
              name={productDetail[0].name}
              stock={productDetail[0].productInventory.quantity}
              price={productDetail[0].price}

            />

            <Divider textAlign="left">
              <Chip
                label="Descripción"
                size="string"
                sx={{ fontSize: "18px", color: "ambar5.main" }}
              />
            </Divider>
            <Box
              component="div"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{ minWidth: "650px", width: "80%", mt: "7px", mb: "7px" }}
              >
                <Typography>{productDetail[0].description}</Typography>
              </Box>
            </Box>

            <Divider textAlign="left">
              <Chip
                label="Especificaciones"
                size="string"
                sx={{ fontSize: "18px", color: "ambar5.main" }}
              />
            </Divider>
            <TableDetail productDetail={productDetail} />

            <Divider textAlign="left" sx={{ mt: "2%", mb: "2%" }}>
              <Chip
                label="Calificación del producto"
                size="string"
                sx={{ fontSize: "18px", color: "ambar5.main" }}
              />
            </Divider>
              <Box 
              sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
            <RatingProduct productDetail={productDetail[0]} />
              </Box>

            <Divider textAlign="left" sx={{ mt: "2%", mb: "2%" }}>
              <Chip
                label="Consultas"
                size="string"
                sx={{ fontSize: "18px", color: "ambar5.main" }}
              />
            </Divider>
            <QuestionsAndAnswers
              handleReRender={handleReRender}
              asks={productDetail[0].asks}
            />
          </Container>
        ) : (
          <CircularProgress
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        )}
      </Paper>
    </Box>
  );
};
