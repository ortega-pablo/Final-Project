import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
import Swal from "sweetalert2";


export const Detail = () => {
  const dispatch = useDispatch();
  //deberia ser un state.detail
  let productDetail = useSelector((state) => state.productDetail);

  let { id } = useParams();

  const [reRender, setReRender] = React.useState("");

  const handleReRender = (e) => {
    console.log(e);
    setReRender(`Ultimo ordenamiento ${e}`);
    dispatch(getDetail(id));
  };

  useEffect(() => {
    //tendria que ser un getDitail(id) desde las action
    dispatch(getDetail(id));
    // return (()=>{

      //     dispatch(clearDetail())
      // })
    }, [dispatch]);

    const handleAddToCart = (e) => {
    e.preventDefault();
    
    Swal.fire({
      background: '#DFDCD3',
      icon: 'success',
      title: 'Agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }
    
  return (
    <Box  sx={{ display: "flex", justifyContent:"center", backgroundColor: "ambar1.main"}}>
      <Paper component="div" sx={{maxWidth: "1100px", mt:"2%", mb:"2%"}}>


    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    let promedy = 0
    productDetail[0]?.reviews?.forEach((r)=>{
      return(
        promedy = promedy + r.rating
      )
    })
    promedy = promedy/(productDetail[0]?.reviews?.length)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "ambar1.main",
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

            <Button onClick={(e)=>handleAddToCart(e)} > Agregar al carrito </Button>

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

            {productDetail[0].reviews.length < 5 ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItem>
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    precision={0.5}
                    readOnly
                  />
                </ListItem>
                <ListItemText primary="Este producto no tiene suficientes reseñas para ser mostradas" />
              </List>
            ) : (
              <>
              <Rating
                    name="half-rating-read"
                    defaultValue={promedy}
                    precision={0.5}
                    readOnly
                  />
                <Button onClick={handleOpenModal}>Ver todas las Reviews</Button>
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                <AllReviews reviews={productDetail[0].reviews} />
                    </Typography>
                  </Box>
                </Modal>

              </>
            )}

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
